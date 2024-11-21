import React from 'react';
import './Servicios.css';

const servicios = [
  {
    titulo: "Rompe la Gravedad del Miedo Tecnológico",
    descripcion: "Supera el temor a la tecnología con pasos simples y directos.",
    cta: "Explorar Módulo",
  },
  {
    titulo: "Automatización Cósmica",
    descripcion: "Haz que tu negocio funcione solo, mientras tú exploras nuevas oportunidades.",
    cta: "Activar Automática",
  },
  {
    titulo: "Psicomarketing Galáctico",
    descripcion: "Conecta de forma auténtica con tu audiencia. Nada de scripts vacíos.",
    cta: "Descubre Más",
  },
];

function Servicios() {
  return (
    <div className="servicios">
      {servicios.map((servicio, index) => (
        <div className="servicio-card" key={index}>
          <h3>{servicio.titulo}</h3>
          <p>{servicio.descripcion}</p>
          <button className="cta-servicio">{servicio.cta}</button>
        </div>
      ))}
    </div>
  );
}

export default Servicios;
