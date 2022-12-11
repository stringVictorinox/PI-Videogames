import React from 'react'
import { Link } from 'react-router-dom';
import './Card.css';
import images from '../../icons/images';

export default function Card({name, genres, img, id, rating}){
  return (

    <div className='card'>
        <h2 className='card-tittle'>{name}</h2>

        {
          console.log(name)
        }

        {
        img ? (
            <img src={img} alt={name} className="card-img"></img>
          ) : (
            <img src={images.photo} alt={name} className="card-img"></img>
          )}
        <h2 className='card-genres'>{genres && genres.join("  ")}</h2>

        <div class="card-footer"></div>

        <div className="div-button">

            <Link className="button-tittle" to={`/videogame/${id}`}>
              <button className="Link">Details</button>
            </Link>

            <div className='card-rating'>
              <div className='rating-icon'>⭐</div>
              <p className='rating-value'>{rating}</p>
            </div>
            

        </div>
    </div>
  )
}
