import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../services/config.js';

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
        setError('Transacción no encontrada.');
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
    <div>
      <h2>Detalles de la Transacción</h2>
      {transaction ? (
        <div>
          <h3>Trabajo: {transaction.work.title}</h3> 
          <p>Cliente: {transaction.client.username}</p> 
          <p>Profesional: {transaction.professional.username}</p>
          <p>Estado: {transaction.status}</p>
          <p>Descripción: {transaction.work.description}</p>
        </div>
      ) : (
        <p>No se encontraron detalles para esta transacción.</p>
      )}
    </div>
  );
}

export default TransactionDetails;
