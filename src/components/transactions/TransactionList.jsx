import React, { useEffect, useState } from "react";
import service from "../../services/config"; 
import TransactionCard from "./TransactionCard"; 

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
    return <p>Cargando transacciones...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="transaction-list">
      <h2>Lista de Transacciones</h2>
      {transactions.length === 0 ? (
        <p>No hay transacciones disponibles.</p>
      ) : (
        transactions.map((transaction) => (
          <TransactionCard
          key={transaction._id}
          id={transaction._id}
          title={transaction ? transaction.title : "Título no disponible"} 
          description={transaction ? transaction.description : "Profesional no disponible"} 
          client={transaction.client ? transaction.client.username : "Cliente no disponible"} 
          status={transaction.status}
        />
        ))
      )}
    </div>
  );
}

export default TransactionList;
