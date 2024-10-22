import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../services/config.js';
import { AuthContext } from "../context/auth.context.jsx";

function ServiceDetails() {
  const [works, setWorks] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams(); 

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await service.get(`/service/user/${userId}`); 
        console.log(response.data);
        setWorks(response.data); 
      } catch (error) {
        setError('No se encontraron servicios para este profesional.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [userId]); // Dependencia del ID del usuario

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Servicios del Profesional</h2>
      {works.length > 0 ? (
        <ul>
          {works.map((work) => (
            <li key={work._id}>
              <h3>{work.title}</h3> 
              <p>Descripción: {work.description}</p> 
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay servicios disponibles para este profesional.</p>
      )}
    </div>
  );
}

export default ServiceDetails;
