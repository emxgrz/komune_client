import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import WorkCard from "../components/work/WorkCard";
import service from "../services/config";

function WorkSearch() {
  const [searchedWork, setSearchedWork] = useState(""); 
  const [works, setWorks] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [searchOn, setSearchOn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const delayCalls = setTimeout(() => {
      if (searchedWork && searchedWork.length >= 3) { 

        setLoading(true);
        setSearchOn(true);
        const fetchWorks = async () => {
          try {
            const response = await service.get("/work");
            console.log(response)
            const filteredWorks = response.data.filter((work) =>
              work.title.toLowerCase().includes(searchedWork.toLowerCase())
            );
            setWorks(filteredWorks); 
            console.log(works)
          } catch (error) {
            console.error("Error fetching works:", error);
            navigate(`*`); // Redirigir a una página de error si algo sale mal
          } finally {
            setLoading(false); 
          }
        };

        fetchWorks();
      } else {
        setSearchOn(false);
        setWorks([]); 
      }
    }, 2000); 

    return () => clearTimeout(delayCalls); 
  }, [searchedWork, navigate]); 
  useEffect(() => {
    return () => {
      setWorks([]); 
    };
  }, []);

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Buscar servicios..."
        value={searchedWork}
        onChange={(e) => setSearchedWork(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "50px",
          width: "50%",
          border: "2px solid black",
          borderRadius: "5px",
        }}
      />

      <p>
        Escribe el nombre del servicio que estás buscando (mínimo 3 letras)
      </p>

      {loading ? (
        <div>
          <p>Estoy cargando...</p>
        </div>
      ) : (
        <div>
          {works.length > 0 ? (
            works.map((work) => (
              <WorkCard
                key={work._id}
                id={work._id}
                title={work.title}
                description={work.description || "Descripción no disponible."}
                professional={work.professional.username} 
              />
            ))
          ) : (
            searchOn && (
              <>
                <p>¡Vaya! No se encontraron resultados.</p>
                <p>¿Seguro que estás buscando un servicio correcto?</p>
                <button
                  id="create-button"
                  onClick={() => navigate("/miPgDeCrearWorks")} //redirigir a la pg de crear usuario
                >
                  Crear Servicio
                </button>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default WorkSearch;
