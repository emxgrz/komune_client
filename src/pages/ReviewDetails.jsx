import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../services/config.js';
import { AuthContext } from "../context/auth.context.jsx"; 

function ReviewDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { isLoggedIn, loggedUserId } = useContext(AuthContext); 

  const [review, setReview] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  }); 
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await service.get(`/review/${id}`);
        setReview(response.data);
        setFormData({
          rating: response.data.rating,
          comment: response.data.comment,
        });
      } catch (error) {
        setError('Error al cargar los detalles de la reseña');
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (loggedUserId === review.reviewer._id) {
      try {
        const response = await service.put(`/reviews/${id}`, formData); 
        setReview(response.data); 
        setIsEditing(false);
        alert('Reseña actualizada con éxito');
      } catch (error) {
        console.error('Error al editar la reseña:', error);
        alert('Hubo un error al actualizar la reseña.');
      }
    } else {
      alert('No tienes permiso para editar esta reseña.');
    }
  };

  const handleDelete = async () => {
    if (loggedUserId === review.reviewer._id) {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta reseña?');
      if (confirmDelete) {
        try {
          await service.delete(`/reviews/${id}`); 
          alert('Reseña eliminada con éxito');
          navigate('/reviews'); 
        } catch (error) {
          console.error('Error al eliminar la reseña:', error);
          alert('Hubo un error al eliminar la reseña.');
        }
      }
    } else {
      alert('No tienes permiso para eliminar esta reseña.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Cargando detalles de la reseña...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Detalles de la Reseña</h2>
      {review ? (
        <div>
          {isEditing ? (
            <form onSubmit={handleEdit}>
              <div>
                <label htmlFor="rating">Calificación:</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="comment">Comentario:</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit">Guardar Cambios</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </form>
          ) : (
            <div>
              <h3>Calificación: {review.rating}</h3>
              <p>Comentario: {review.comment}</p>
              <p>Transacción: {review.transaction.description}</p>
              <p>Reseñado por: {review.reviewer.username}</p>

              {loggedUserId === review.reviewer._id && (
                <div>
                  <button onClick={() => setIsEditing(true)}>Editar</button>
                  <button onClick={handleDelete}>Eliminar</button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No se encontraron detalles de la reseña.</p>
      )}
    </div>
  );
}

export default ReviewDetails;
