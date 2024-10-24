import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../../services/config'; 
import { AuthContext } from '../../context/auth.context'; 
import { Container, Card, Form, Button } from 'react-bootstrap'; 


function CreateWorkForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]); 
  const { loggedUserId } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const professional = loggedUserId;
    try {
      const response = await service.post('/work', {
        title,
        description,
        professional,
        skills, 
      });
      
      console.log('Nuevo trabajo creado:', response.data);
      navigate('/home'); 
    } catch (error) {
      console.error('Error al crear el trabajo:', error);
    }
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    const skillsArray = value.split(',').map(skill => skill.trim()); 
    setSkills(skillsArray);
  };

  return (
    <Container className="mt-5">
    <Card>
      <Card.Header as="h5" className="text-center">Oferta aquí tu trabajo 👇</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Título ✒️</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué servicio ofreces?"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Descripción 📒</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu servicio en detalle"
              rows={4}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSkills" className="mb-3">
            <Form.Label>Habilidades (separadas por comas) 📎</Form.Label>
            <Form.Control
              type="text"
              onChange={handleSkillsChange}
              placeholder="Ejemplo: Diseño, Programación, Marketing"
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Crear Servicio
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  </Container>
  );
}

export default CreateWorkForm;
