import { useState, useEffect } from "react";
import service from "../../services/config"; 
import ReviewCard from "./ReviewCard"; 
import "../../styles/reviewListStyle.css"

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await service.get("/review"); 
        console.log(response)
        setReviews(response.data); 
      } catch (err) {
        setError("Error al cargar las reseñas");
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchReviews();
  }, []);

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
        <p>No hay reseñas disponibles.</p>
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
