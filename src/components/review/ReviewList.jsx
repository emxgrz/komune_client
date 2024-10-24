import { useState, useEffect } from "react";
import service from "../../services/config"; 
import ReviewCard from "./ReviewCard"; 
import "../../styles/reviewListStyle.css"
import { useParams } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { Container } from 'react-bootstrap';



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
      fetchReviews();     }
  }, [userId]);   if (loading) {
    return (
      <Container className="text-center mt-5">
        <SyncLoader color="#343a40" loading={loading} size={15} />
      </Container>
    );
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
