import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../services/config.js';

function ReviewDetails() {
  const [review, setReview] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await service.get(`/reviews/${id}`); 
        console.log(response.data);
        setReview(response.data); 
      } catch (error) {
        setError('Reseña no encontrada.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]); 

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Detalles de la Reseña</h2>
      {review ? (
        <div>
          <h3>Calificación: {review.rating}</h3> 
          <p>Comentario: {review.comment}</p> 
          <p>Transacción: {review.transaction.description}</p> 
          <p>Reseñado por: {review.reviewer.username}</p> 
        </div>
      ) : (
        <p>No se encontraron detalles para esta reseña.</p>
      )}
    </div>
  );
}

export default ReviewDetails;
