import React from "react";
import { Link, useNavigate } from "react-router-dom";

function WorkCard({ id, title, description, professional }) {
  const navigate = useNavigate()
  //se renderiza en worklist
    // con nivigate usamos el id de este para que nos redirija a su perfil del usuario y poder contactar con él
  return (
    <div>
      <p>{professional}</p>
      <p>{title}</p>
      <p>{description}</p>
      <Link to="/transaction-form">
      <button>Interested? Click here!</button> {/* para crear una nueva transactón si están interesados en el anuncio del servicio */}
      </Link>
    </div>
  );
}

export default WorkCard;

