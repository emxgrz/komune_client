import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config";
import { AuthContext } from "../../context/auth.context";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";

function CreateTransactionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const { userId } = useParams();
  const { workId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim()) {
      setError("El título es obligatorio.");
      setLoading(false);
      return;
    }

    if (!description.trim()) {
      setError("La descripción es obligatoria.");
      setLoading(false);
      return;
    }

    try {
      const response = await service.post("/transaction", {
        work: workId,
        professional: userId,
        client: loggedUserId,
        title,
        description,
        status,
      });

      navigate("/my-transactions");
    } catch (error) {
        setError(error.response?.data?.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5" className="text-center">
          Haz tu petición 📩
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger">
              Lo sentimos, algo no está funcionando como debería...
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Título ✒️</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="¿Qué ofreces?"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Descripción 📒</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explica con más detalles por qué crees que tu intercambio merece la pena"
                rows={3}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <SyncLoader color="#343a40" loading={loading} size={20} />
                ) : (
                  "Enviar ▶️"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateTransactionForm;
