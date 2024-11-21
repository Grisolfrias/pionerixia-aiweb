// src/components/Hero.js
import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      {/* Video de fondo */}
      <iframe
        src="https://www.youtube.com/embed/pt0-xcVWeis?autoplay=1&mute=1&controls=0&loop=1&playlist=pt0-xcVWeis"
        title="Video de Fondo"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="background-video"
      ></iframe>

      {/* Overlay para el contraste */}
      <div className="overlay"></div>

      {/* Contenido principal */}
      <div className="content">
        <h1>Despierta el poder oculto de tu negocio</h1>
        <p>Sin dependencias, sin trucos, y con herramientas de otra galaxia.</p>
        <a href="#services" className="cta-button">Inicia tu misión ahora</a>
      </div>
    </div>
  );
}

export default Hero;
  