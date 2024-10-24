import React, { useEffect, useState, useParams } from "react";
import service from "../../services/config"; 
import WorkCard from "./WorkCard"; 
import { Card, Container } from 'react-bootstrap';
import "../../styles/workListStyle.css"
import SyncLoader from "react-spinners/SyncLoader";


function WorkList({userId}) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchWorks = async () => {
      try {
        let response;
        if (userId) {
          response = await service.get(`/work/user/${userId}`);
        } else {
          response = await service.get("/work");
        }
        console.log(response.data);
        setWorks(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [userId])

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <SyncLoader color="#343a40" loading={loading} size={15} />
      </Container>
    );
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
