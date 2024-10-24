import React from "react";
import { Container, Card, ListGroup, Button, Carousel } from "react-bootstrap";
import "../styles/missionStyle.css";
const OurMission = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center mission-title">OUR MISSION</h1>

      {/* Carousel para textos en movimiento */}
      <Carousel className="mb-4">
        <Carousel.Item>
          <Card className="shadow-sm mission-card">
            <Card.Body>
              <Card.Text>
                En un mundo cada vez más conectado, creemos que el verdadero
                valor de nuestras habilidades y talentos no debería estar
                limitado por el valor monetario.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="shadow-sm mission-card">
            <Card.Body>
              <Card.Text>
                Nuestra misión es crear un espacio donde los profesionales
                puedan ofrecer y recibir servicios de manera equitativa,
                fomentando una comunidad de colaboración y apoyo mutuo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>

      <h2 className="mt-4">¿Por qué creamos esta plataforma?</h2>
      <Card className="mb-4 shadow-sm mission-card">
        <Card.Body>
          <Card.Text>
            La idea de esta plataforma nació de la necesidad de conectar a
            profesionales de diversas disciplinas sin las barreras económicas
            que a menudo impiden el acceso a servicios de calidad. Queremos que
            cada individuo, independientemente de su situación financiera, tenga
            la oportunidad de:
          </Card.Text>
          <ListGroup>
            <ListGroup.Item>
              <strong>Intercambiar servicios:</strong> Aquí, tu experiencia es
              tu moneda. Ofrece tus habilidades y recibe a cambio lo que
              necesites, creando un ciclo de colaboración que beneficia a todos.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Conectar con otros profesionales:</strong> A través de
              nuestra comunidad, puedes conocer a personas que comparten tus
              intereses, crear redes de apoyo y establecer relaciones laborales
              fructíferas.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Aprender y crecer:</strong> Cada intercambio es una
              oportunidad para aprender. Al colaborar con otros, no solo amplías
              tus habilidades, sino que también te enriqueces con la experiencia
              y la perspectiva de tus colegas.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <h2 className="mt-4">Nuestros valores</h2>
      <Card className="mb-4 shadow-sm mission-card">
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <strong>Colaboración:</strong> Fomentamos un ambiente donde todos
              pueden aportar y beneficiarse, ayudando a construir un sentido de
              comunidad entre profesionales.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Accesibilidad:</strong> Creemos que el acceso a servicios
              y recursos debe ser universal. Aquí no hay tarifas ni costos
              ocultos; solo el valor de lo que puedes ofrecer.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Respeto:</strong> Valoramos la diversidad de habilidades y
              experiencias. Cada miembro de nuestra comunidad es un profesional
              con algo valioso que ofrecer.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <h2 className="mt-4">Únete a nosotros</h2>
      <Card className="mb-4 shadow-sm mission-card">
        <Card.Body>
          <Card.Text>
            Te invitamos a ser parte de esta misión. Ya seas un diseñador
            gráfico, un desarrollador web, un coach personal o un experto en
            marketing, aquí tienes la oportunidad de hacer crecer tu red,
            aprender de otros y, sobre todo, intercambiar tus servicios de
            manera justa y equitativa.
          </Card.Text>
          <Card.Text>
            ¡Juntos podemos construir una comunidad donde la colaboración sea la
            norma!
          </Card.Text>
          <Button variant="primary" href="/signup">
            ¡Únete Ahora!
          </Button>{" "}
          {/* Botón de llamada a la acción */}
        </Card.Body>
      </Card>
    </Container>
  );
};
export default OurMission;
