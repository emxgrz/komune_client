import { useState, useContext } from "react";
import service from "../../services/config"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 

function CreateReviewForm() {
  const { loggedUserId } = useContext(AuthContext); 
  const [transaction, setTransaction] = useState("");
  const [reviewed, setReviewed] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!transaction || !loggedUserId || !rating) {
      setError("Los campos transacción, revisor (automáticamente) y calificación son requeridos.");
      return;
    }

    try {
      const response = await service.post("/reviews", {
        transaction,
        reviewer: loggedUserId, 
        reviewed,
        rating,
        comment,
      });

      setTransaction("");
      setReviewed("");
      setRating("");
      setComment("");

      navigate("/my-page/:userId");

    } catch (error) {
      setError("Error al crear la reseña. Intenta de nuevo.");
      console.error(error);
    }
  };

  return (
    <div className="create-review-form">
      <h2>Crear Reseña</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Transacción (ID)</label>
          <input
            type="text"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
            placeholder="Ingresa el ID de la transacción"
            required
          />
        </div>

        <div>
          <label>Cliente</label>
          <input
            type="text"
            value={loggedUserId} 
            readOnly 
          />
        </div>

        <div>
          <label>Profesional</label>
          <input
            type="text"
            value={reviewed}
            onChange={(e) => setReviewed(e.target.value)}
            placeholder="Ingresa el ID de la persona a la que vas a ponerle una review"
          />
        </div>

        <div>
          <label>Calificación</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Ingresa la calificación (1-5)"
            required
          />
        </div>

        <div>
          <label>Comentario (opcional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deja un comentario"
          />
        </div>

        <button type="submit">Crear Reseña</button>
      </form>
    </div>
  );
}

export default CreateReviewForm;
