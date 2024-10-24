import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Importamos los componentes necesarios de Bootstrap
import image1 from "../assets/images/image1.jpg";

export default function EnterPage() {
  return (
    <Container fluid  style={{ backgroundColor: '#f8f9fa', padding: '20px',background: 'linear-gradient(to right, #007bff, #6f42c1)', // Fondo degradado
      padding: '20px'  }}>
      <div className="card-container"> {/* Clase añadida para estilos de la card */}
        <Row className="w-100">
          <Col md={6} className="text-start"> {/* Columna izquierda para texto */}
            <h1 className="mb-4">Bienvenido</h1>
            <p className="lead mb-4">
              Únete a nuestra comunidad de profesionales y transforma tus habilidades en oportunidades. Crea tu página en nuestra plataforma y ofrece tus servicios a otros, mientras descubres nuevas colaboraciones que enriquecerán tu carrera. Sin tarifas, solo intercambio.
            </p>
          </Col>
          <Col md={6} className="text-center"> {/* Columna derecha para imagen */}
            <img 
              src={image1} 
              alt="Descripción de la imagen" 
              className="img-fluid rounded" 
              style={{ maxHeight: '400px', width: '80%', objectFit: 'cover' }} // Tamaño de la imagen ajustado
            />
          </Col>
        </Row>
        <Row className="w-100 mt-4"> {/* Nueva fila para el botón */}
          <Col className="text-center"> {/* Columna centrada para el botón */}
            <Button variant="primary" size="lg" href="/signup">¡Comienza Ahora!</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
