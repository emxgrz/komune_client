import React from 'react'
import { Link } from 'react-router-dom';
import "../../styles/reviewCardStyle.css"
import Card from 'react-bootstrap/Card';

export default function ReviewCard({ id, reviewer, reviewed, transaction, rating, comment }) {
  return (
    <Card className="review-card" style={{ cursor: 'pointer', margin: '10px' }}>
    <Link to={`/review/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card.Body>
        <h3>Revisor: {reviewer}</h3>
        <p>Revisado: {reviewed}</p>
        <p>Transacción: {transaction}</p>
        <p>Calificación: {rating}</p>
        <p>Comentario: {comment}</p>
      </Card.Body>
    </Link>
  </Card>
  )
}
