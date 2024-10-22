import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../../services/config'; // Asegúrate de que esta ruta sea correcta
import { AuthContext } from '../../context/auth.context'; // Asegúrate de que AuthContext esté disponible

function CreateWorkForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]); // Cambiado a array
  const { loggedUserId } = useContext(AuthContext); // Obtener el ID del usuario logueado
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const professional = loggedUserId; // Asumiendo que el usuario logueado es el profesional

    try {
      const response = await service.post('/work', {
        title,
        description,
        professional,
        skills, 
      });
      
      console.log('Nuevo trabajo creado:', response.data);
      navigate('/works'); // Redirigir a la lista de trabajos después de crear
    } catch (error) {
      console.error('Error al crear el trabajo:', error);
      // Aquí puedes manejar errores y mostrar mensajes al usuario si es necesario
    }
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    const skillsArray = value.split(',').map(skill => skill.trim()); 
    setSkills(skillsArray);
  };

  return (
    <div>
      <h2>Crear Nuevo Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Habilidades (importante, separadas por comas):</label>
          <input
            type="text"
            onChange={handleSkillsChange} 
          />
        </div>
        <button type="submit">Crear Servicio</button>
      </form>
    </div>
  );
}

export default CreateWorkForm;
