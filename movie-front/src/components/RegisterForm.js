import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', { name, email, password });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error en el registro', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <label style={{ marginBottom: '10px' }}>
          Nombre:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Correo electrónico:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Contraseña:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>Enviar</button>
        <Link to="/" style={{ marginTop: '10px', textAlign: 'center', textDecoration: 'none', color: '#007bff' }}>Iniciar sesión</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
