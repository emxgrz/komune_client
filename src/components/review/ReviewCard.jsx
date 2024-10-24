import React from 'react'
import { Link } from 'react-router-dom';


export default function ReviewCard({ id, reviewer, reviewed, transaction, rating, comment }) {
  return (
    <div style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <Link to={`/review/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>Reseña de: {reviewer.username}</h3> 
        <p>Reseña para: {reviewed.username}</p> 
        <p>Transacción: {transaction.description}</p> 
        <p>Calificación: {rating}</p>
        <p>Comentario: {comment}</p>
      </Link>
    </div>
  )
}
