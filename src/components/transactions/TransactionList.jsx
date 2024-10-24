import React, { useEffect, useState } from "react";
import service from "../../services/config"; 
import TransactionCard from "./TransactionCard"; 
import { Container, Row, Col } from 'react-bootstrap';
import "../../styles/transactionListStyle.css"
import SyncLoader from "react-spinners/SyncLoader";



function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await service.get("/transaction"); 
        setTransactions(response.data);
        console.log(response.data)

      } catch (error) {
        setError("Error al cargar las transacciones");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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

  return (
    <Container className="mt-5">
      {/* <h2 className="text-center mb-4">Lista de Transacciones</h2> */}
      {transactions.length === 0 ? (
        <p className="no-reviews-message">
        📭 Todavía no tienes ningún intercambio de servicios.
      </p>
      ) : (
        <Row>
          {transactions.map((transaction) => (
            <Col md={6} key={transaction._id} className="mb-4">
              <TransactionCard
                id={transaction._id}
                title={transaction.title || "Título no disponible"}
                description={transaction.description || "Descripción no disponible"}
                client={transaction.client ? transaction.client.username : "Cliente no disponible"}
                status={transaction.status}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default TransactionList;
