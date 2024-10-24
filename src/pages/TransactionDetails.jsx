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
      {transaction ? (
        <Card className="review-card">
          <Card.Body>
            <Card.Title>
              <h3>Trabajo: {transaction.work.title} 🎨</h3>
            </Card.Title>
            <Card.Text>
              <strong>Descripción del trabajo:</strong> {transaction.work.description}
            </Card.Text>

            <hr className="my-4" />

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4>👨‍💼 Detalles del Profesional</h4>
                <Card.Subtitle className="mb-2 text-muted">
                  Profesional:{" "}
                  <Link
                    to={`/profiles/${transaction.professional._id}`}
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    {transaction.professional.username}
                  </Link>
                </Card.Subtitle>
              </div>
              <div>
                <h4>👤 Detalles del Cliente</h4>
                <Card.Subtitle className="mb-2 text-muted">
                  Cliente:{" "}
                  <Link
                    to={`/profiles/${transaction.client._id}`}
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    {transaction.client.username}
                  </Link>
                </Card.Subtitle>
              </div>
            </div>

            <Card className="mt-4 transaction-card text-center">
              <Card.Body>
                <Card.Title className="mb-3"><strong>Detalles de la Transacción</strong></Card.Title>
                <div className="transaction-details">
                  <span className="transaction-label"><strong>Título:</strong></span>
                  <span className="transaction-value">{transaction.title}</span>
                </div>
                <div className="transaction-details">
                  <span className="transaction-label"><strong>Descripción:</strong></span>
                  <span className="transaction-value">{transaction.description}</span>
                </div>
                <div className="transaction-details">
                  <span className="transaction-label"><strong>Estado:</strong></span>
                  <span className="transaction-value">{transaction.status}</span>
                </div>
              </Card.Body>
            </Card>

            {/* Mostrar el botón solo si el estado es "completado" */}
            {transaction.status === "completado" && (
              <Link to={`/review-form/${transaction._id}/${transaction.professional._id}`}>
                <Button variant="primary" className="mt-3">Dejar una Reseña 📝</Button>
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
