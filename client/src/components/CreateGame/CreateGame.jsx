import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './CreateGame.css'
import { GetAllGenres } from '../../actions/actions.js';
import './CreateGame.css';
import axios from 'axios'

export default function CreateGame(props){

  const dispatch = useDispatch();
  const genres = useSelector((state)=>state.genres);
  const History = useHistory();
  const [errors, setErrors] = useState({ form: 'Must complete the form' });
  const platforms = ['PC', 'iOS', 'Android', 'macOS', 'PlayStation 4', 'PlayStation 5', 'Xbox', 'PS Vita'];

  const [form, setForm] = useState({
    name: '',
    rating: 0,
    releaseDate: '',
    description: '',
    genres: [],
    platforms: [],
  });
  
  useEffect(() => {
    dispatch(GetAllGenres());
  }, [dispatch])

  const handleChange = e => {
    if (e.target.parentNode.parentNode.id === 'genres'){
        if (e.target.checked) {
            setForm(prevState => ({
                ...prevState,
                genres: form.genres.concat(e.target.value.toString())
            }))
        } else {
            setForm(prevState => ({
                ...prevState,
                genres: form.genres.filter(x => e.target.value.toString() !== x)
            }))
        }
    }
    if (e.target.parentNode.parentNode.id === 'platforms') {
        if (e.target.checked) {
            setForm(prevState => ({
                ...prevState,
                platforms: form.platforms.concat(e.target.name)
            }))
        } else {
            setForm(prevState => ({
                ...prevState,
                platforms: form.platforms.filter(x => e.target.name !== x)
            }))
        }
    }
    if (e.target.type !== 'checkbox') {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    setErrors(validate({
        ...form,
        [e.target.name]: e.target.value
    }))
}

const validate = form => {
    let errors = {};
    if (!form.name) {
        errors.name = 'Game Name is required';
    } else if (form.name.length < 4) {
        errors.name = 'Game Name must have at least 4 characters';
    }
    if (!form.description) {
        errors.description = 'Description is required';
    } else if (form.description.length < 8) {
        errors.description = 'Description must have at least 8 characters'
    }
    if (!form.rating) {
        errors.rating = 'Rating is required';
    } else if (!/^[1-5]$/.test(form.rating)) {
        errors.rating = 'Rating must be between 1 and 5';
    }
    return errors;
  }

  const handleSubmit = e => {
    e.preventDefault()
    validate(form);
    let checkboxsErrors = []
    if (form.genres.length < 1) checkboxsErrors.push('Genres is required');
    if (form.platforms.length < 1) checkboxsErrors.push('Platforms is required');
    if (Object.values(errors).length || checkboxsErrors.length) { // Object.values --> retorno un array con los values
        return alert(Object.values(errors).concat(checkboxsErrors).join('\n'));
    }

    {console.log(form)}
     
    axios.post('http://localhost:3001/videogames', form).then(res => console.log(res.data));
    alert(`${form.name} Creado Correctamente`)
    History.push('/home') 
  }

  return (

    <div className='create-container'>

        <form onSubmit={handleSubmit} onChange={handleChange}>

        <div className='create-back'>
          <Link to="/home"> <button className='btn-create'>BACK</button> </Link>
        </div>

        <div className='create-tittle'>
          <h1>CREATE VIDEOGAME</h1>
        </div>

        <div className='create-name'>
          <p>Name</p>
          <input className="name" placeholder='Name' type="text" id='name' name='name' autoComplete="off"/>
        </div>
            
          <div className='create-description'>
            <p>Description</p>
            <textarea className="name" name='description' placeholder='Description...' id="description" cols="30" rows="3" />
          </div>

          <div className='create-releaseDate'>
          <p>Release Date</p>
          <input name='releaseDate' className="dt" type="date" id="date" required />
          </div>
            
          <div className='create-rating'>
            <p>Rating</p>
            <input name='rating' className="dt" placeholder='Rate from 1 to 5' type="tel" id="rating" maxLength='1' autoComplete="off"/>
          </div>

          <div id="genres" className="create-genres"> {

            genres && genres.map((g) => (
                  <div className={g.name}>
                    <input name={g.name} type='checkbox' id={g.id} value={g.name} />
                    <label htmlFor={g.name}>{g.name}</label>
                  </div>    
            ))
          }

          </div>

          <div id="platforms" className="create-platforms"> {

            platforms && platforms.map((g) => (
              <div key={g} name={g} value={g} className={g}>
                <input name={g} type="checkbox" id={g} />
                <label htmlFor={g}>{g}</label>
              </div>
          ))
          }

          </div>

          <div>
            <button className='btn-create' type='submit'>Create</button>
          </div>
          </form>
    </div>
    
  )
}
