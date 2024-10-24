import React from 'react'
import { Link } from 'react-router-dom';
import "../../styles/reviewCardStyle.css"
import Card from 'react-bootstrap/Card';

export default function ReviewCard({ id, reviewer, reviewed, transaction, rating, comment, date }) {

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString); 
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; 
    return new Intl.DateTimeFormat('es-ES', options).format(date); 
  };


  return (
    <Card className="review-card" style={{ cursor: 'pointer', margin: '10px' }}>
  <Link to={`/review/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Card.Body>
      
      <Card.Subtitle className="mb-2 text-muted">{reviewer}</Card.Subtitle>
      
      <Card.Text>
        <strong>Calificación:</strong> {rating} ⭐
      </Card.Text>
      <Card.Text>
        <strong>Comentario:</strong> {comment}
      </Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">
      {/* Agregar más información si es necesario, como la fecha de la revisión */}
      Fecha de revisión: {formatDate(date)}
    </Card.Footer>
  </Link>
</Card>
  )
}
