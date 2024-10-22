import { useState, useEffect } from "react";
import service from "../../services/config"; 
import ReviewCard from "./ReviewCard"; 

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await service.get("/reviews"); 
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
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            key={review._id} 
            id={review._id}
            reviewer={review.reviewer.username}
            reviewed={review.reviewed.username}
            transaction={review.transaction.description} 
            rating={review.rating}
            comment={review.comment}
          />
        ))
      ) : (
        <p>No hay reseñas disponibles</p>
      )}
    </div>
  );
}

export default ReviewList;
