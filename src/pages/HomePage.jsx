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
    <Col md={6} className="text-center">
      <img
        src={colab}
        alt="people collaborating"
        style={{
          maxWidth: "70%",
          borderRadius: "10px",
          marginTop: "15px",
          marginRight: "-15%",
        }}
      />
    </Col>

    <Col md={6} className="text-center">
      <div className="impact-text">
        <h1>Colabora,</h1>
        <h1>Coopera,</h1>
        <h1>Komune</h1>
      </div>
    </Col>
  </Row>

  {/* Nueva fila para centrar el botón */}
  <Row className="justify-content-center mt-4">
    <Col xs="auto">
      <Link to="/work-form">
        <Button variant="outline-primary" type="submit" className="custom-button" style={{ fontWeight: "bold" }}>
          Añade un nuevo trabajo
        </Button>
      </Link>
    </Col>
  </Row>

  <WorkList />
</Container>

  );
}

export default HomePage;
