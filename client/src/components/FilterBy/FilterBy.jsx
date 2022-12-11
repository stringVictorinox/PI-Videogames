import { useDispatch, useSelector } from 'react-redux';
import { GetAllGames, FilterByGenres, OrderByRating, GetAllGenres, OrderByAlphabet, FilterByInfo, FilterByDate } from '../../actions/actions';
import { useEffect, useState } from 'react';
import './FilterBy.css';

export default function FilterBy(){

    const dispatch = useDispatch();
    const All_Genres = useSelector( (state) => state.genres );
    const Get_Games = useSelector( (state) => state.Games );

    const handleSelect = (e) => {
        e.preventDefault();
        dispatch(FilterByGenres(e.target.value));
    }

    const handleSelect2 = (e) => {
        e.preventDefault();
        dispatch(OrderByAlphabet(e.target.value));
    }

    const handleSelect3 = (e) => {
        e.preventDefault();
        dispatch(OrderByRating(e.target.value));
    }

    const handleSelect4 = (e) => {
        e.preventDefault();
        dispatch(FilterByInfo(e.target.value));
    }

    
    return(
        <div className='container-filter'>

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
    )
}
