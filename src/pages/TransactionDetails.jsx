import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../services/config.js";

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
    <div>
      <h2>Detalles de la Transacción</h2>
      {transaction ? (
        <div>
          <div>
            <p>
              Profesional:{" "}
              <Link
                to={`/profiles/${transaction.professional._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {transaction.professional.username}
              </Link>
            </p>

            <h3>Trabajo: {transaction.work.title}</h3>
            <p>Descripción: {transaction.work.description}</p>
          </div>

          <div>
            <p>
              Cliente:{" "}
              <Link
                to={`/profiles/${transaction.client._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {transaction.client.username}
              </Link>
            </p>
            <p>Título: {transaction.title}</p>
            <p>Descripción: {transaction.description}</p>
            <p>Estado: {transaction.status}</p>

            {/* Mostrar el botón solo si el estado es "completado" */}
            {transaction.status === "completado" && (
               <Link to={`/review-form/${transaction._id}/${transaction.professional._id}`}>
                <button>Dejar una Reseña</button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <p>No se encontraron detalles para esta transacción.</p>
      )}
    </div>
  );
}

export default TransactionDetails;
