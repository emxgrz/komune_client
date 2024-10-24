import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config"; 
import { AuthContext } from "../../context/auth.context"; 
import { Container, Form, Button, Card } from 'react-bootstrap';


function CreateTransactionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loggedUserId } = useContext(AuthContext); 
  const navigate = useNavigate();

  const {userId} = useParams()
  const {workId} = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault(); //Para prevenir el comportamiento por defecto del formulario!!

    setLoading(true);
    setError(null);

    try {
      const response = await service.post("/transaction", {
        work: workId,
        professional: userId,
        client: loggedUserId, 
        title,
        description,
        status
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
        <Card.Header as="h5" className="text-center">Crear intercambio</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="¿Qué ofreces?"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explica con más detalles por qué crees que tu intercambio merece la pena"
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="en progreso...">Pendiente</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Crear Transacción
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateTransactionForm;
