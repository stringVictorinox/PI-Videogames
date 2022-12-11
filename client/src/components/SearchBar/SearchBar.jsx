import React from 'react'
import { useDispatch } from "react-redux";
import { SearchByName } from '../../actions/actions';
import './SearchBar.css';
import { useState } from 'react';

export default function SearchBar(){
  
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

    const handleChange = (e) => {
      e.preventDefault();
      setValue(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setValue('');
      dispatch(SearchByName(value));
      setValue('');
    }

    return (
      <div className="container-search">
      <input className="search" onChange={handleChange} type="text" placeholder="Search by name..."/>
      <button className="button-search" onClick={handleSubmit} type="submit"> Search </button>
    </div>
    );
}
