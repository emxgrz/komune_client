import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function ErrorPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className="text-center mt-5">
      <FaExclamationTriangle size={64} color="#dc3545" className="mb-4" />
      <h1 className="mb-3">¡Ups! Algo salió mal</h1>
      <p
        className="mb-4 mx-auto"
        style={{
          maxWidth: "470px",
          textAlign: "center",
          border: "1px solid black",
        }}
      >
        Lo sentimos, ha ocurrido un error inesperado. Nuestros técnicos están
        trabajando duro para resolverlo. Mientras tanto, puedes volver a la
        página anterior o ir a la página principal 👩‍🚀
      </p>

      <Button variant="primary" onClick={goBack} className="me-2">
        Vuelve atrás
      </Button>
      <Button variant="secondary" onClick={() => navigate("/")}>
        Página principal
      </Button>
    </Container>
  );
}

export default ErrorPage;
