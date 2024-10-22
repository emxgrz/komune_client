import React from "react";

function WorkCard({ id, title, description, professional }) {
  //se renderiza en worklist
    // con nivigate usamos el id de este para que nos redirija a su perfil del usuario y poder contactar con él
  return (
    <div>
      <p>{professional}</p>
      <p>{title}</p>
      <p>{description}</p>

    </div>
  );
}

export default WorkCard;

