import React, { useEffect, useState } from "react";
import service from "../../services/config"; 
import WorkCard from "./WorkCard"; 
function WorkList() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await service.get("/work"); 
        setWorks(response.data);
      } catch (error) {
        setError("Error al cargar los trabajos");
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  if (loading) {
    return <p>Cargando trabajos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="work-list">
      <h2>Lista de Trabajos</h2>
      {works.length === 0 ? (
        <p>No hay trabajos disponibles.</p>
      ) : (
        works.map((work) => (
          <WorkCard
            key={work._id}
            id={work._id}
            title={work.title}
            description={work.description || "Descripción no disponible."}
            // professional={work.professional.username} poner bien cuando tenga users
          />
        ))
      )}
    </div>
  );
}

export default WorkList;
