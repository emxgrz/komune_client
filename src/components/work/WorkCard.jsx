import React from "react";
import { Link, useNavigate } from "react-router-dom";

function WorkCard({ id, title, description, professional }) {
  const navigate = useNavigate()
  //se renderiza en worklist
    // con nivigate usamos el id de este para que nos redirija a su perfil del usuario y poder contactar con él
  return (
    <div style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <Link to={`/work/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
  <p>{professional || "Profesional no disponible"}</p>
  <p>{title || "Título no disponible"}</p> 
  <p>{description || "Descripción no disponible"}</p>
</Link>
      
    </div>
  );
}

export default WorkCard;

