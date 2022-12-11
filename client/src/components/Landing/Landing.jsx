import React from 'react'
import './Landing.css';
import { Link } from 'react-router-dom';

export default function Landing() {
  
    return (
    <div className='contenedor-landing'>

        <div className='tittle'>
            <h1>Videogames</h1>
        </div>

        <div className='btn-1'>
            <img className='Image' src="" alt="" />
                <Link to='/home'>
                    <button>INICIO</button>
                </Link>
        </div> 
    </div>
  )
}
