import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../services/config.js';
import { AuthContext } from "../context/auth.context.jsx";

function ServiceDetails() {
  const [works, setWorks] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await service.get(`/work/${id}`); 
        console.log(response.data);
        setWorks(response.data);
        console.log(works) 
      } catch (error) {
        setError('No se encontraron servicios.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [id]); 

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
    <h2>Servicios</h2>
    {works ? ( 
      <ul>
        <li key={works._id}>
          <h3>{works.title}</h3>
          <p>Descripción: {works.description}</p>
        </li>
      </ul>
    ) : (
      <p>No hay servicios disponibles para este profesional.</p>
    )}
  </div>
  );
}

export default ServiceDetails;
