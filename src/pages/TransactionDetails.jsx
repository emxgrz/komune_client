import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../services/config.js";
import { Container, Card, Button } from 'react-bootstrap';
import "../styles/transactionDetailsStyle.css";
import SyncLoader from "react-spinners/SyncLoader";
import { AuthContext } from '../context/auth.context';

function TransactionDetails() {
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { loggedUserId } = useContext(AuthContext); 

  // Nueva función para manejar el cambio de estado
  const handleChangeStatus = async (newStatus) => {
    try {
      const response = await service.put(`/transaction/${id}`, { status: newStatus });
      setTransaction(prevTransaction => ({
        ...prevTransaction,
        status: response.data.status
      }));
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      setError("Error al cambiar el estado de la transacción.");
    }
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await service.get(`/transaction/${id}`);
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
    return (
      <Container className="text-center mt-5">
        <SyncLoader color="#343a40" loading={loading} size={15} />
      </Container>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log("ID USER", loggedUserId);
  console.log("ID prof", transaction.professional._id);
  console.log("transaction", transaction.status);

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
                {transaction.status && (
                  <div className="transaction-details">
                    <span className="transaction-label"><strong>Estado:</strong></span>
                    <span className="transaction-value">{transaction.status}</span>
                  </div>
                )}
              </Card.Body>
              {transaction.professional._id === loggedUserId && (
                <>
                  {transaction.status === "" && (
                    <>
                    <div className="d-flex justify-content-center">
                      <Button 
                        variant="primary" 
                        style={{ maxWidth: "300px", marginRight: "20px", marginBottom: "5px"}} 
                        onClick={() => handleChangeStatus("en progreso")}
                      >
                        Aceptar oferta ⏯️
                      </Button>
                      <Button 
                        variant="danger" 
                        style={{ maxWidth: "300px", marginBottom: "5px"}} 
                        onClick={() => handleChangeStatus("rechazada")}
                      >
                        Rechazar oferta ❌
                      </Button>
                      </div>
                    </>
                  )}
                  {transaction.status === "en progreso" && (
                    <Button variant="primary" onClick={() => handleChangeStatus("completado")}>
                      Trabajo completado ✅
                    </Button>
                  )}
                </>
              )}

            </Card>

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
