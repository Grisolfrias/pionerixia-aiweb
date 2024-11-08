import React from 'react';
import logo from '../images/PionerixIA-logo.webp'; // Asegúrate de que la ruta sea correcta

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="PionerixIA Logo" />
            </div>
            <nav>
                <ul className="nav-links">
                    <li><a href="#hero">Inicio</a></li>
                    <li><a href="#story">Historia</a></li>
                    <li><a href="#courses">Cursos</a></li>
                    <li><a href="#instagram-bot">Instagram Bot</a></li>
                    <li><a href="#contact">Contacto</a></li>
                </ul>
            </nav>
            <div className="header-right">
                <button className="language-btn">ES | EN</button>
                <button className="sign-in-btn">Iniciar Sesión</button>
            </div>
        </header>
    );
}

export default Header;
