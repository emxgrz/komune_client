import React from 'react'

export default function ReviewCard({ reviewer, reviewed, transaction, rating, comment }) {
  return (
    <div>
      <h3>Reseña de: {reviewer}</h3>
      <p>Reseña para: {reviewed}</p>
      <p>Transacción: {transaction}</p>
      <p>Calificación: {rating}</p>
      <p>Comentario: {comment}</p>
    </div>
  )
}
