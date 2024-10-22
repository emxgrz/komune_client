import React from "react";

function TransactionCard({ id, work, professional, client, status }) {
  return (
    <div className="transaction-card" key={id}>
      <h3>Trabajo: {work.title}</h3>
      <p>Profesional: {professional}</p>
      <p>Cliente: {client}</p>
      <p>Estado: {status}</p>
    </div>
  );
}

export default TransactionCard;
