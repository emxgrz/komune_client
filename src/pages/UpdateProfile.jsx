import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../services/config'; 
import { AuthContext } from '../context/auth.context';
import { Form, Button, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import "../styles/updateProfileStyle.css"


function UpdateProfile() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext); 
  const { userId } = useParams(); 

  const [imageUrl, setImageUrl] = useState(null); 
const [isUploading, setIsUploading] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    location: {
      city: '',
      country: ''
    },
    description: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  //primero cargamos los datos del user para ver los existentes, luego los editamos
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await service.get(`/user/${userId}`); 
        setUserData(response.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del usuario.');
      }
    };

    fetchUserData();
  }, [userId]); 

  if (!isLoggedIn || loggedUserId !== userId) {
    return <p>No tienes permiso para editar este perfil.</p>; 
  }

  const handleFileUpload = async (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);
  
    if (!event.target.files[0]) {
      return;
    }
  
    setIsUploading(true);
  
    const uploadData = new FormData(); 
    uploadData.append("image", event.target.files[0]);
    
  
    try {
      const response = await service.post("/upload/media", uploadData)
     
      console.log(response.data)
  
      setImageUrl(response.data.imageUrl);
  
  
      setIsUploading(false); 
    } catch (error) {
      navigate("/error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location')) {
      const locName = name.split('.')[1]; 
      setUserData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locName]: value
        }
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = { 
        ...userData,
        image: imageUrl  || userData.image
       }; 
      await service.put(`/user/${userId}`, updatedUserData); 
      navigate(`/my-page/${userId}`); 
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el perfil.');
    }
  };

  

  return (

    <Container className="mt-5">
    <Card>
      <Card.Header as="h5" className="text-center">Actualizar Perfil</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              {/* Username */}
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={userData.username || ''}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre de usuario"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              {/* Email */}
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email || ''}
                  onChange={handleChange}
                  placeholder="Ingrese su correo electrónico"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              {/* First Name */}
              <Form.Group controlId="formFirstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={userData.firstName || ''}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              {/* Last Name */}
              <Form.Group controlId="formLastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={userData.lastName || ''}
                  onChange={handleChange}
                  placeholder="Ingrese su apellido"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              {/* Date of Birth */}
              <Form.Group controlId="formDateOfBirth">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth ? userData.dateOfBirth.substring(0, 10) : ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              {/* City */}
              <Form.Group controlId="formCity">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="location.city"
                  value={userData.location?.city || ''}
                  onChange={handleChange}
                  placeholder="Ingrese su ciudad"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              {/* Country */}
              <Form.Group controlId="formCountry">
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  name="location.country"
                  value={userData.location?.country || ''}
                  onChange={handleChange}
                  placeholder="Ingrese su país"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              {/* Description */}
              <Form.Group controlId="formDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={userData.description || ''}
                  onChange={handleChange}
                  placeholder="Escriba una breve descripción"
                  rows={3}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              {/* Image Upload */}
              <Form.Group controlId="formImage">
                <Form.Label>Imagen de Perfil</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Uploading Status */}
          {isUploading && <Alert variant="info">... Subiendo imagen</Alert>}
          {imageUrl && (
            <div className="mb-3 text-center">
              <img src={imageUrl} alt="Imagen de perfil" width={150} />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <Button variant="primary" type="submit">
              Actualizar Perfil
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  </Container>
  );
}

export default UpdateProfile;
