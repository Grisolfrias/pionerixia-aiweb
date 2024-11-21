// src/components/Hero.js

import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&controls=0&loop=1&playlist=VIDEO_ID"
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="background-video"
        ></iframe>
      </div>
      <div className="overlay"></div>
      <div className="content">
        <h1>Domina tu Negocio Sin Trucos, Sin Gasto Extra y Sin Complejidades</h1>
        <p>Descubre cómo el marketing y la inteligencia artificial pueden estar a tu alcance, sin manipulaciones ni dependencia de agencias.</p>
        <a href="#services" className="cta-button">Empieza Ahora</a>
      </div>
    </div>
  );
}

export default Hero;
