import React from "react";
import { Link } from "react-router-dom"; 

function TransactionCard({ id, work, professional, client, status }) {
  return (
    <div className="transaction-card" key={id}
      style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px' }} 
    >
      <Link to={`/transaction/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>Trabajo: {work}</h3>
        <p>Profesional: {professional}</p>
        <p>Cliente: {client}</p>
        <p>Estado: {status}</p>
      </Link>
    </div>
  );
}

export default TransactionCard;
