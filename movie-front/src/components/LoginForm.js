import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const token = response.data.access_token;
      localStorage.setItem('jwt', token);

      const userResponse = await axios.get('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const user = userResponse.data;
      setUser(user);

      navigate('/');
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <label style={{ marginBottom: '10px' }}>
          Correo electrónico:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Contraseña:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </label>
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>Iniciar sesión</button>
        <Link to="/register" style={{ marginTop: '10px', textAlign: 'center', textDecoration: 'none', color: '#007bff' }}>Registrarse</Link>
      </form>
    </div>
  );
};

export default LoginForm;
