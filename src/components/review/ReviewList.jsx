import { useState, useEffect } from "react";
import service from "../../services/config"; 
import ReviewCard from "./ReviewCard"; 
import "../../styles/reviewListStyle.css"
import { useParams } from "react-router-dom";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userId } = useParams(); 

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await service.get("/review"); 
        console.log(response)
        // Filtrar reseñas para que solo muestre las donde el usuario del perfil es el "reviewed"
        const filteredReviews = response.data.filter(review => 
          review.reviewed && review.reviewed._id === userId
        );
        setReviews(filteredReviews);
      } catch (err) {
        setError("Error al cargar las reseñas");
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    if (userId) {
      fetchReviews(); // Solo hace la llamada cuando se obtiene el userId
    }
  }, [userId]); // El efecto se vuelve a ejecutar si el userId cambia (por si navegas a otro perfil)

  if (loading) {
    return <p>Cargando reseñas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="review-list">
      {/* <h2>Lista de Reseñas</h2> */}
      {reviews.length === 0 ? (
        <p className="no-reviews-message">
  📭 No hay reseñas disponibles.
</p>
      ) : (
        <div className="review-card-container">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              id={review._id}
              reviewer={review.reviewer ? review.reviewer.username : "Revisor no disponible"}
              reviewed={review.reviewed ? review.reviewed.username : "Revisado no disponible"}
              transaction={review.transaction ? review.transaction.description : "Transacción no disponible"}
              rating={review.rating}
              comment={review.comment || "Comentario no disponible"}
              date={review.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewList;
