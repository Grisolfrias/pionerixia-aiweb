import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      alert('Registro exitoso');
    } catch (error) {
      alert('Hubo un error al registrarse');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input 
        type="text" 
        placeholder="Nombre de usuario" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Register;
