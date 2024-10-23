import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/config.js";
import { AuthContext } from "../context/auth.context.jsx";
import { Container, Card, ListGroup, Spinner } from "react-bootstrap";

function UserDetails() {
  const [user, setUser] = useState(null);
 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, loggedUserId, authenticateUser } =
    useContext(AuthContext);

  const { userId } = useParams();

  const isOwner = loggedUserId === userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await service.get(`/user/${userId}`);
        console.log(response.data);
        setUser(response.data);
              } catch (error) {
        setError("Usuario no encontrado o error en la carga");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="mt-5">
      {user && (
        <Card>
          <Card.Header as="h5">Detalles del Usuario</Card.Header>
          <ListGroup variant="flush">
          {user.image && (
              <ListGroup.Item>
                <img 
                  src={user.image} 
                  alt={`${user.username}'s avatar`} 
                  style={{ width: '100px', height: '100px', borderRadius: '50%', marginLeft: '10px' }} 
                />
              </ListGroup.Item>
            )}
            {user.email && (
              <ListGroup.Item>
                <strong>Email:</strong> {user.email}
              </ListGroup.Item>
            )}
            {user.username && (
              <ListGroup.Item>
                <strong>Username:</strong> {user.username}
              </ListGroup.Item>
            )}
            {user.firstName && (
              <ListGroup.Item>
                <strong>Nombre:</strong> {user.firstName}
              </ListGroup.Item>
            )}
            {user.lastName && (
              <ListGroup.Item>
                <strong>Apellido:</strong> {user.lastName}
              </ListGroup.Item>
            )}
            {user.dateOfBirth && (
              <ListGroup.Item>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </ListGroup.Item>
            )}
            {user.location && user.location.city && (
              <ListGroup.Item>
                <strong>Ciudad:</strong> {user.location.city}
              </ListGroup.Item>
            )}
            {user.location && user.location.country && (
              <ListGroup.Item>
                <strong>País:</strong> {user.location.country}
              </ListGroup.Item>
            )}
            {user.description && (
              <ListGroup.Item>
                <strong>Descripción:</strong> {user.description}
              </ListGroup.Item>
            )}
            
          </ListGroup>
        </Card>
      )}
    </Container>
  );
}

export default UserDetails;
