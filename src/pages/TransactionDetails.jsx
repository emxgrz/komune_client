import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../services/config.js";
import { Container, Card, Button } from 'react-bootstrap';
import "../styles/transactionDetailsStyle.css"

function TransactionDetails() {
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();


  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await service.get(`/transaction/${id}`);
        console.log(response.data);
        setTransaction(response.data);
      } catch (error) {
        setError("Transacción no encontrada.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Detalles de la Transacción</h2>
      {transaction ? (
        <Card>
          <Card.Body>
            <Card.Title>
              <h3>Trabajo: {transaction.work.title}</h3>
            </Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              Profesional:{" "}
              <Link
                to={`/profiles/${transaction.professional._id}`}
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                {transaction.professional.username}
              </Link>
            </Card.Subtitle>

            <Card.Text>
              <strong>Descripción del trabajo:</strong> {transaction.work.description}
            </Card.Text>

            <Card.Subtitle className="mt-3 mb-2 text-muted">
              Cliente:{" "}
              <Link
                to={`/profiles/${transaction.client._id}`}
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                {transaction.client.username}
              </Link>
            </Card.Subtitle>

            <Card.Text>
              <strong>Título:</strong> {transaction.title}
            </Card.Text>
            <Card.Text>
              <strong>Descripción:</strong> {transaction.description}
            </Card.Text>
            <Card.Text>
              <strong>Estado:</strong> {transaction.status}
            </Card.Text>

            {/* Mostrar el botón solo si el estado es "completado" */}
            {transaction.status === "completado" && (
              <Link to={`/review-form/${transaction._id}/${transaction.professional._id}`}>
                <Button variant="primary">Dejar una Reseña</Button>
              </Link>
            )}
          </Card.Body>
        </Card>
      ) : (
        <p>No se encontraron detalles para esta transacción.</p>
      )}
    </Container>
  );
}

export default TransactionDetails;
