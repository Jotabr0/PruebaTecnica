import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', { name, email, password });
      const token = response.data.token;

      // Almacena el token en el localStorage
      localStorage.setItem('token', token);

      // Llama a la función proporcionada por las props para indicar que se ha registrado
      onRegister();
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <label>Nombre:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <label>Email:</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <label>Contraseña:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default RegisterForm;
