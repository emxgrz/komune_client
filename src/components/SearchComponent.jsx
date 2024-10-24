import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WorkCard from "./work/WorkCard";
import service from "../services/config";
import { Container, Form, Button, Alert } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";

import "../styles/searchBarStyle.css";

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
            console.log(response);
            const filteredWorks = response.data.filter((work) =>
              work.title.toLowerCase().includes(searchedWork.toLowerCase())
            );
            setWorks(filteredWorks);
            console.log(works);
          } catch (error) {
            console.error("Error fetching works:", error);
            navigate(`*`);
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
    <Container className="mt-5 text-center">
      <h1 className="mb-4">Buscar Servicios</h1>
      <Form>
        <Form.Group controlId="search" className="mb-3">
          <Form.Control
            className="search-bar"
            type="text"
            placeholder="Buscar servicios..."
            value={searchedWork}
            onChange={(e) => setSearchedWork(e.target.value)}
            style={{
              padding: "10px",
              margin: "0 auto",
              width: "50%",
              border: "2px solid #007bff",
              borderRadius: "5px",
            }}
          />
        </Form.Group>
      </Form>
      <div
        style={{
          padding: "15px",
          margin: "0 auto",
          width: "50%",
          border: "2px solid #007bff",
          borderRadius: "5px",
          backgroundColor: "#f8f9fa",
          marginBottom: "30px",
        }}
      >
        <Alert variant="warning">
          Escribe el nombre del servicio que estás buscando (mínimo 3 letras).
        </Alert>
      </div>

      {loading ? (
        <div>
          <Container className="text-center mt-5">
            <SyncLoader color="#343a40" loading={loading} size={15} />
          </Container>
        </div>
      ) : (
        <div className="row">
          {works.length > 0
            ? works.map((work) => (
                <div className="col-md-4 mb-4" key={work._id}>
                  <WorkCard
                    key={work._id}
                    id={work._id}
                    title={work.title}
                    description={
                      work.description || "Descripción no disponible."
                    }
                    professional={work.professional.username}
                    image={work.professional.image}
                  />
                </div>
              ))
            : searchOn && (
                <div>
                  <Alert variant="warning">
                    ¡Vaya! No se encontraron resultados.
                  </Alert>
                  <p>¿Seguro que estás buscando un servicio correcto?</p>
                  <Button
                    id="create-button"
                    onClick={() => navigate("/miPgDeCrearWorks")}
                    variant="primary"
                  >
                    Crear Servicio
                  </Button>
                </div>
              )}
        </div>
      )}
    </Container>
  );
}

export default WorkSearch;
