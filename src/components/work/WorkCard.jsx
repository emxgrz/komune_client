import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap"; // Importamos Card de react-bootstrap
import "../../styles/workCardStyle.css"

function WorkCard({ id, title, description, professional, professionalId, image }) {
  return (
    <Card className="work-card" style={{ cursor: 'pointer' }}>
      <Link to={`/work/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img variant="top" src={image} alt="Descripción" />
        <Card.Body>
          <Card.Title>{title || "Título no disponible"}</Card.Title>
          <Card.Text>
            <strong>Profesional:</strong> {professional || "Profesional no disponible"}<br />
            <strong>Descripción:</strong> {description || "Descripción no disponible"}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default WorkCard;
