import axios from 'axios';
import GameDetails from '../components/GameDetails/GameDetails.jsx';

// IMPORTAMOS LAS CONSTANTES QUE USAREMOS.

import {
    GET_ALL_GAMES,
    GET_GENRES,
    GET_VIDEOGAME_DETAIL,
    ORDER_BY_ALPHABET, 
    ORDER_BY_RATING,
    FILTER_BY_GENRES,
    FILTER_BY_INFO,
    FILTER_BY_DATE,
    CLEAR_DETAILS
} from './const.js';

// FUNCIONES DEL ACTIONS QUE SE MANDARÁN AL REDUCER.

export function GetAllGames(){

    return function(dispatch){
        return axios.get('http://localhost:3001/videogames').then((res) => {
            dispatch({ type: GET_ALL_GAMES, payload: res.data });
        })
        .catch((error) => {
            return error;
        });
    };
}

export function GetVideogameDetail(id){
    return function (dispatch){
      axios.get(`http://localhost:3001/videogame/${id}`).then((res) => {
          dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
        })
        .catch((error) => {
          return error;
        });
    };
}

export function GetAllGenres(){

    return function(dispatch){
        axios.get('http://localhost:3001/genres').then((res) => {
            dispatch({ type: GET_GENRES, payload: res.data });
        })
        .catch((error) => {
            return error;
        });
    };
}

export function OrderByAlphabet(order){

    return function(dispatch){
        dispatch({ type: ORDER_BY_ALPHABET, payload: order});
    };
}

export function OrderByRating(order){

    return function(dispatch){
        dispatch( {type: ORDER_BY_RATING, payload: order});
    }
}

export function FilterByGenres(order){

    return function(dispatch){
        dispatch({ type: FILTER_BY_GENRES, payload: order});
    }
}

export function FilterByInfo(order){

    return function(dispatch){
        dispatch({ type: FILTER_BY_INFO, payload: order});
    }
}

export function SearchByName(name){

        return function(dispatch){
            return axios.get(`http://localhost:3001/videogames?name=${name}`).then((res) => {
                return dispatch({
                  type: GET_ALL_GAMES,
                  payload: res.data,
                })
            }).catch((error) => {
                alert(`There is no videogame with the name ${name} in DB`);
            })
        };
}

export function ClearDetails(){

    return function(dispatch){
        dispatch({ type: CLEAR_DETAILS, payload: ""});
    }
}

export function FilterByDate(order){

    return function(dispatch){
        dispatch({ type: FILTER_BY_DATE, payload: order});
    }.catch((error) => {
        alert(error);
    })
}

