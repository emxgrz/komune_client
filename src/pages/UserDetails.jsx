import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../services/config.js';
import { AuthContext } from "../context/auth.context.jsx"
import { Container, Card, ListGroup, Spinner } from 'react-bootstrap';


function UserDetails() {
  const [user, setUser] = useState(null); 
  const [email, setEmail] = useState(null); 
  const [username, setUsername] = useState(null); 
  const [work, setWork] = useState(null)
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const { isLoggedIn, loggedUserId , authenticateUser } = useContext(AuthContext)

  const {userId} = useParams()

  const isOwner = loggedUserId === userId


// hacer un handle edit para poder actualizar la info. Luego usar la ruta PUT que ya tengo. El modelo ya está actualizado.

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await service.get(`/user/${userId}`);
        console.log(response.data)
        setUser(response.data._id)
        setEmail(response.data.email)
        setUsername(response.data.username)
        // setWork(response.data.work[0].title)
      } catch (error) {
        setError('Usuario no encontrado o error en la carga');
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
            <ListGroup.Item><strong>Email:</strong> {email}</ListGroup.Item>
            <ListGroup.Item><strong>Username:</strong> {username}</ListGroup.Item>
            {/* Puedes descomentar la siguiente línea si decides usar "work" */}
            {/* <ListGroup.Item><strong>Services:</strong> {work}</ListGroup.Item> */}
          </ListGroup>
        </Card>
      )}
    </Container>
  );
}

export default UserDetails