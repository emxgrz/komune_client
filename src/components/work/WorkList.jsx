import React, { useEffect, useState, useParams } from "react";
import service from "../../services/config"; 
import WorkCard from "./WorkCard"; 
import { Card } from 'react-bootstrap';
import "../../styles/workListStyle.css"

function WorkList({userId}) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchWorks = async () => {
      try {
        let response;
        if (userId) {
          // Si userId existe, hacemos la petición filtrada
          response = await service.get(`/work/user/${userId}`);
        } else {
          // Si no, obtenemos todos los trabajos
          response = await service.get("/work");
        }
        console.log(response.data);
        setWorks(response.data);
      } catch (error) {
        setError("Error al cargar los trabajos");
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [userId])

  if (loading) {
    return <p>Cargando trabajos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="work-list mt-5">
      {/* <h2 className="text-center mb-4">Lista de Trabajos</h2> */}
      {works.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <Card.Text>No hay trabajos disponibles.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="row">
          {works.map((work) => (
            <div className="col-md-4 mb-4" key={work._id}>
              <WorkCard
                id={work._id}
                title={work.title}
                description={work.description || "Descripción no disponible."}
                professional={work.professional.username} 
                image={work.professional.image}
                professionalId={work.professional._id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkList;
