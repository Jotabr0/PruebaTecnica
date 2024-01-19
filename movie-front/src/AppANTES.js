
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import MoviesTable from './components/MoviesTable';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterName, setFilterName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Obtiene el token almacenado en el localStorage
    const token = localStorage.getItem('token');

    // Si hay un token, descodifícalo para obtener la información del usuario
    if (token) {
      const decoded = jwtDecode(token);
      console.log('Usuario autenticado:', decoded);
      // Establece el estado para indicar que se ha iniciado sesión
      setIsLoggedIn(true);
      // Realiza solicitudes a la API utilizando el token
      fetchMovies(token);
      fetchCategories(token);
    }
  }, []);

  const fetchMovies = async (token) => {
    try {
      // Incluye el token en la cabecera de la solicitud
      const response = await axios.get('http://127.0.0.1:8000/api/peliculas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de películas:', error);
    }
  };

  const fetchCategories = async (token) => {
    // Realiza una solicitud a tu API para obtener la lista de categorías
    // Puedes implementar un endpoint adicional en tu API para obtener solo las categorías
    const categories = ['Terror', 'Suspense', 'Romántico', 'Acción', 'Fantasía', 'Comedia', 'Aventura', 'Drama'];
    setCategories(categories);
  };

  const applyFilters = async () => {
    try {
      // Realiza una solicitud a tu API para obtener la lista filtrada
      const response = await axios.get(`http://127.0.0.1:8000/api/peliculas?categoria=${filterCategory}&nombre=${filterName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error al aplicar los filtros:', error);
    }
  };

  return (
    <div>
      <h1>Frontend de Películas</h1>
      {/* {isLoggedIn ? ( */}
        {/* // Mostrar contenido después de iniciar sesión */}
        <>
          <div>
            <label>Categoría:</label>
            <select onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label>Nombre:</label>
            <input type="text" onChange={(e) => setFilterName(e.target.value)} />
            <button onClick={applyFilters}>Aplicar Filtros</button>
          </div>
          <MoviesTable movies={movies} onLogout={() => setIsLoggedIn(false)} />
        </>
      {/* ) : isRegistering ? ( */}
        {/* // Mostrar formulario de registro si isRegistering es true */}
        {/* <RegisterForm onRegister={() => setIsLoggedIn(true)} /> */}
      {/* ) : (
        // Mostrar formulario de inicio de sesión si isRegistering es false
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      )}
      {!isLoggedIn && ( */}
        {/* // Mostrar botón para cambiar entre registro e inicio de sesión si no se ha iniciado sesión
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Iniciar sesión' : 'Registrarse'}
        </button> */}
      {/* )} */}
    </div>
  );
};

export default App;
