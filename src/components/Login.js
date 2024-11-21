// src/components/Login.js
import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Aquí iría la lógica de autenticación
        alert('Iniciando sesión...');
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
}

export default Login;
