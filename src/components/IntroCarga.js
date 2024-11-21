// src/components/IntroCarga.js
import React, { useEffect } from 'react';
import './IntroCarga.css';

function IntroCarga({ onComplete }) {
  useEffect(() => {
    // Temporizador para ocultar el mensaje después de 3 segundos
    const timer = setTimeout(() => {
      onComplete(); // Llama a la función onComplete cuando se termine el tiempo
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonta
  }, [onComplete]);

  return (
    <div className="intro-carga">
      <div className="bot-mensaje">
        <span role="img" aria-label="robot">🤖</span> Bienvenido a PionerixIA
      </div>
    </div>
  );
}

export default IntroCarga;
