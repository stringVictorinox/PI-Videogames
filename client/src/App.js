import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CreateGame from './components/CreateGame/CreateGame';
import GameDetails from './components/GameDetails/GameDetails';

function App(){
  return (
    <div className="App">

      <BrowserRouter>
        <Route exact path = '/'> 
          <Landing /> 
        </Route>

        <Route exact path = '/home'> 
          <Home /> 
        </Route>

        <Route exact path='/videogame/:id'>
          <GameDetails />
        </Route>

        <Route exact path = '/CreateGame'>
          <CreateGame />
        </Route>


      </BrowserRouter>
      
    </div>
  );
}

export default App;
