// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">PionerixIA</div>

      {/* Menú de Escritorio */}
      <ul className="navbar-links desktop-only">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>

      {/* Icono de menú hamburguesa para móvil */}
      <div className="navbar-hamburger mobile-only" onClick={toggleMobileMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      {/* Panel lateral en móvil */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button className="close-btn" onClick={toggleMobileMenu}>✕</button>
          <ul className="mobile-menu-links">
            <li><a href="#inicio" onClick={toggleMobileMenu}>Inicio</a></li>
            <li><a href="#servicios" onClick={toggleMobileMenu}>Servicios</a></li>
            <li><a href="#nosotros" onClick={toggleMobileMenu}>Nosotros</a></li>
            <li><a href="#contacto" onClick={toggleMobileMenu}>Contacto</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
