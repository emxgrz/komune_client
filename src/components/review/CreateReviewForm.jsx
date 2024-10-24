import { useState, useContext } from "react";
import service from "../../services/config"; 
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 
import { Container, Form, Button } from 'react-bootstrap';
import "../../styles/reviewFormStyle.css"


function CreateReviewForm() {
  const { loggedUserId } = useContext(AuthContext); 
  const [transaction, setTransaction] = useState("");
  const [reviewed, setReviewed] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {transactionId} = useParams()
  const {userId} = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!transactionId || !loggedUserId || !rating) {
      setError("Los campos transacción, revisor (automáticamente) y calificación son requeridos.");
      return;
    }
  
    console.log("Datos a enviar:", {
      transaction: transactionId,
      reviewer: loggedUserId,
      reviewed: userId,
      rating,
      comment,
    });
    
    try {
      const response = await service.post("/review", {
        transaction: transactionId,
        reviewer: loggedUserId, 
        reviewed: userId,
        rating,
        comment,
      });
  
      console.log("Respuesta del servidor:", response.data); // Log para verificar la respuesta
  
      setRating("");
      setComment("");
      navigate(`/my-page/${loggedUserId}`); 
  
    } catch (error) {
      setError("Error al crear la reseña. Intenta de nuevo.");
      console.error(error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🌟 Crear Reseña 🌟</h2>
      <Form onSubmit={handleSubmit} className="create-review-form">
        <Form.Group controlId="formRating">
          <Form.Label>Calificación ⭐</Form.Label>
          <Form.Control
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Ingresa la calificación (1-5)"
            required
            min={1}
            max={5}
            className="custom-input" // Clase personalizada para el input
          />
        </Form.Group>

        <Form.Group controlId="formComment">
          <Form.Label>Comentario (opcional) 💬</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deja un comentario"
            className="custom-textarea" // Clase personalizada para el textarea
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="mt-3">
            ✍️ Crear Reseña
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default CreateReviewForm;
