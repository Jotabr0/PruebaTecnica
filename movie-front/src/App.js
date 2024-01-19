import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MoviesTable from './components/MoviesTable';
import MoviesCreate from './components/MoviesCreate';
import MoviesEdit from './components/MoviesEdit';

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {
 

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MoviesTable/>} />
          <Route path='/create' element={ <MoviesCreate/>} />
          <Route path='/create/:id?' element={<MoviesCreate />} />
          <Route path='/edit/:id' element={ <MoviesEdit/>} />
        </Routes>
       </BrowserRouter>
    </div>
  );
};

export default App;
