import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MoviesTable from './components/MoviesTable';
import MoviesCreate from './components/MoviesCreate';
import MoviesEdit from './components/MoviesEdit';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Header from './components/Header';

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Obtener la información del usuario
      axios.get('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        setUser(response.data);
      }).catch(error => {
        console.error('Error al obtener la información del usuario', error);
      });
    }
  }, []);

  return (
    <div className="App">
     
       <BrowserRouter>
       {user && <Header user={user} setUser={setUser} />}
        <Routes>
          {user ? (
            <>
              <Route path='/' element={ <MoviesTable/>} />
              <Route path='/create/:id?' element={<MoviesCreate />} />
              <Route path='/edit/:id' element={ <MoviesEdit/>} />
            </>
          ) : (
            <>
            <Route path='/' element={ <LoginForm setUser={setUser}/>} />
            <Route path='/register' element={ <RegisterForm />} /> 
          </>
          )}
        </Routes>
       </BrowserRouter>
    </div>
  );
};

export default App;
