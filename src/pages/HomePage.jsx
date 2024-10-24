import React from "react";
import WorkList from "../components/work/WorkList";
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import "../styles/homePageStyle.css";
import colab from "../assets/images/colab.jpeg"

function HomePage() {
  return (
    <Container className="mt-5">
  <Row className="d-flex align-items-center">
    {/* Columna izquierda: Imagen */}
    <Col md={6} className="text-center">
      <img
        src={colab}
        alt="people collaborating"
        style={{
          maxWidth: "500px",
          borderRadius: "10px",
          marginTop: "15px",
          marginRight:"-15%"
        }}
      />
    </Col>

    {/* Columna derecha: Frase */}
    <Col md={6} className="text-center">
      <div className="impact-text">
        <h1>Colabora,</h1>
        <h1>Coopera,</h1>
        <h1>Komune</h1>
      </div>
      
    </Col>
    <Row>
      <Link to="/work-form" className="mt-4">
        <Button
          variant="outline-primary"
          type="submit"
          className="custom-button"
          style={{marginLeft:"30%", fontWeight:"bold"}}
        >
          Añade un nuevo trabajo
        </Button>
      </Link></Row>
  </Row>

  <WorkList />
</Container>

  );
}

export default HomePage;
