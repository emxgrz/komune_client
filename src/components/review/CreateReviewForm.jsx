import { useState, useContext } from "react";
import service from "../../services/config";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Container, Form, Button, Alert } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";
import "../../styles/reviewFormStyle.css";

function CreateReviewForm() {
  const { loggedUserId } = useContext(AuthContext);
  const [transaction, setTransaction] = useState("");
  const [reviewed, setReviewed] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { transactionId } = useParams();
  const { userId } = useParams();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId || !loggedUserId || !rating) {
      setError(
        "Los campos transacción, revisor (automáticamente) y calificación son requeridos."
      );
      return;
    }

    try {
      setLoading(true);
      console.log("Datos a enviar:", {
        transaction: transactionId,
        reviewer: loggedUserId,
        reviewed: userId,
        rating,
        comment,
      });

      const response = await service.post("/review", {
        transaction: transactionId,
        reviewer: loggedUserId,
        reviewed: userId,
        rating,
        comment,
      });

      console.log("Respuesta del servidor:", response.data);
      setRating("");
      setComment("");
      navigate(`/my-page/${loggedUserId}`);
    } catch (error) {
        setError(error.response?.data?.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🌟 Crear reseña 🌟</h2>
      {error && (
        <Alert variant="danger">
          Lo sentimos, algo no está funcionando como debería...
        </Alert>
      )}

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
            className="custom-input"
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
            className="custom-textarea"
          />
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={loading}
          >
            {loading ? (
              <SyncLoader color="#343a40" loading={loading} size={20} />
            ) : (
              "✍️ Crear Reseña"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default CreateReviewForm;
