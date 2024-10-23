import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Importamos los componentes necesarios de Bootstrap
import image1 from "../assets/images/image1.jpg";

export default function EnterPage() {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 text-center" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <Row className="w-100"> {/* Aseguramos que el Row ocupe todo el ancho */}
        <Col md={10} lg={8} className="mx-auto"> {/* Columna centrada con más ancho */}
          <h1 className="mb-4">Bienvenido</h1>
          <p className="lead mb-4">
            Únete a nuestra comunidad de profesionales y transforma tus habilidades en oportunidades. Crea tu página en nuestra plataforma y ofrece tus servicios a otros, mientras descubres nuevas colaboraciones que enriquecerán tu carrera. Sin tarifas, solo intercambio.
          </p>
          <img 
            src={image1} 
            alt="Descripción de la imagen" 
            className="img-fluid rounded mb-4" 
            style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }} 
          />
          <Button variant="primary" size="lg" href="/signup">¡Comienza Ahora!</Button> 
        </Col>
      </Row>
    </Container>
  );
}
