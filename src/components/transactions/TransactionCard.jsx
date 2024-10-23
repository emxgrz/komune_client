import React from "react";
import { Link } from "react-router-dom"; 

function TransactionCard({ id, title, description, client, status }) {
  return (
    <div className="transaction-card" key={id}
      style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px' }} 
    >
      <Link to={`/transaction/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>Trabajo: {title}</h3>
        <p>Descripción: {description}</p>
        {/* <p>Cliente: {client}</p>
        <p>Estado: {status}</p> */}
      </Link>
    </div>
  );
}

export default TransactionCard;
