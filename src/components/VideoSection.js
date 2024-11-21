// src/components/VideoSection.js
import React from 'react';
import './VideoSection.css';

function VideoSection() {
  return (
    <div className="video-section">
      <iframe
        src="https://www.youtube.com/embed/pt0-xcWteis?autoplay=1&mute=1&controls=0&loop=1&playlist=pt0-xcWteis"
        title="Strategic Background Video"
        frameBorder="0"
        allow="autoplay; encrypted-media; loop"
        allowFullScreen
      ></iframe>
      <div className="video-overlay">
        <h2>Explora el poder de la IA con PionerixIA</h2>
        <p>Descubre cómo nuestra tecnología puede transformar tu negocio.</p>
      </div>
    </div>
  );
}

export default VideoSection;
