import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { GetAllGames, FilterByGenres, OrderByRating, GetAllGenres, OrderByAlphabet, FilterByInfo, SearchByName } from '../../actions/actions';

import Card from "../Card/Card.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import SearchBar from '../SearchBar/SearchBar.jsx';
import Spinner from "../Spinner/Spinner.jsx";
import './Home.css';

export default function Home(){
  
  const dispatch = useDispatch();
  
  const All_Genres = useSelector( (state) => state.genres );
  const Get_Games = useSelector( (state) => state.Games );
  
  const [CurrentPage, setCurrentPage] = useState(1);
  const [VideogamesPerPage, SetVideogamePerPage] = useState(15);
  
  const IndexLastVideogame = CurrentPage * VideogamesPerPage;
  const IndexFirstVideogame = IndexLastVideogame - VideogamesPerPage;
  const CurrentVideogames = Get_Games.slice(IndexFirstVideogame, IndexLastVideogame);
  
  const [orden, setOrden] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    dispatch(GetAllGenres());
    dispatch(GetAllGames());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleSelect = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(FilterByGenres(e.target.value));
  }

  const handleSelect2 = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(OrderByAlphabet(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  const handleSelect3 = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(OrderByRating(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  const handleSelect4 = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(FilterByInfo(e.target.value));
  }


  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    setOrden(`Ordenado ${e.target.value}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SearchByName(value));
    setValue('');
    setOrden(`Ordenado ${e.target.value}`);
  }

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(GetAllGames());
  }

  return(

    // - HOME - 

    <div className="container-home">

      {/* - NAVBAR - */}

      <div className="container-navbar">

        <div className='nav-top'>
          <Link to="/home" className='site-title'>Videogames</Link>

          <div className="container-search">
            <input className="search" onChange={handleChange} type="text" placeholder="Search by name..."/>
            <button className="button-search" onClick={handleSubmit} type="submit"> Search </button>
          </div>
        
          <div className="buttons-navbar">
            <Link> <button className='btn-reset' onClick={handleReset}>RESET</button> </Link>
            <Link to="/CreateGame"> <button className='btn-create'>CREATE</button> </Link>
          </div>
        </div>
  
        <div className='nav-down'>

          <select className='filter-genre' onChange={handleSelect}>
            <option className='value' value='all'>GENRES</option>
                {All_Genres && All_Genres.map( (e) => {
                    return(
                        <option className='value' key={e.name} value={e.name}>{e.name}</option>
                    )
                })}

          </select>

          <select className='filter-order' onChange={handleSelect2}>
            <option className='value' value='all'>ORDER</option>
            <option className='value' value='A-Z'>[A-Z]</option>
            <option className='value' value='Z-A'>[Z-A]</option>
          </select>

          <select className='filter-rating' onChange={handleSelect3}>
              <option value='all'>RATING</option>
              <option value='asc'>+Rating</option>
              <option value='desc'>-Rating</option>
          </select>

          <select className='filter-info' onChange={handleSelect4}>
            <option className='value' value='all'>ALL</option>
            <option className='value' value='API'>API</option>
            <option className='value' value='DATABASE'>DATABASE</option>
          </select>

        </div>
      </div>

      <Paginated VideogamesPerPage = {VideogamesPerPage} Get_Games = {Get_Games.length} paginado = {paginado} />

      {/* - CARDS - */}

      {
        Get_Games.length < 1 ? 
          <Spinner />
        :
            <div className="List_Cards"> {
              CurrentVideogames?.map( (e) => {
               return ( 
                <Card key = {e.id} name = {e.name} genres = {e.genres} img = {e.img} id = {e.id} rating = {e.rating} /> );
              })
            }
            </div>  
      }
    </div>
)}

