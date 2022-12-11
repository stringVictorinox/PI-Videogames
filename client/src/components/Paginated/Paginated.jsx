import React from 'react'
import './Paginated.css';

export default function Paginated({ VideogamesPerPage, Get_Games, paginado }){

  const pageNumbers = [];

  for(let i=0; i<Math.ceil(Get_Games/VideogamesPerPage); i++){
    pageNumbers.push(i+1);
  }

  return (

    <div className='pagination'>
          { pageNumbers.map( (number) => {

            return(
              <button key = {number} onClick={() => paginado(number)} className = 'page'>
                  {number}
              </button>
            )
          })
        }

    </div>
        
  )
}
