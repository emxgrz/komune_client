import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import "../../styles/transactionCard.css";

function TransactionCard({ id, title, description, client, status }) {
  return (
    <Card className="transaction-card h-100 shadow-sm">
      <Card.Body>
        <Link
          to={`/transaction/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Title as="h3">Trabajo: {title}</Card.Title>
          <Card.Text>
            <strong>Descripción:</strong> {description}
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default TransactionCard;
