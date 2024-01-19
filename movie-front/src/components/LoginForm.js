import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      const token = response.data.token;

      // Almacena el token en el localStorage
      localStorage.setItem('token', token);

      // Descodifica el token para obtener la información del usuario (opcional)
      const decoded = jwtDecode(token);
      console.log('Usuario autenticado:', decoded);

      // Llama a la función proporcionada por las props para indicar que se ha iniciado sesión
      onLogin();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <label>Email:</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <label>Contraseña:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default LoginForm;