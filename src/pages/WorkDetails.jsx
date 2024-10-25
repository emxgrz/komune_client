import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/config.js";
import { AuthContext } from "../context/auth.context.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import "../styles/workDetailsStyle.css";
import SyncLoader from "react-spinners/SyncLoader";

function WorkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoggedIn, loggedUserId, authenticateUser } =
    useContext(AuthContext);
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
  });

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await service.get(`/work/${id}`);
        setWork(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          skills: response.data.skills || [],
        });
      } catch (error) {
        setError("Error al cargar los detalles del trabajo");
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (loggedUserId === work.professional._id) {
      try {
        const response = await service.put(`/work/${id}`, formData);
        setWork(response.data);
        setIsEditing(false);
        alert("Trabajo actualizado con éxito");
        navigate(`/my-page/${loggedUserId}`);
      } catch (error) {
        console.error("Error al editar el trabajo:", error);
        alert("Hubo un error al actualizar el trabajo.");
      }
    } else {
      alert("No tienes permiso para editar este trabajo.");
    }
  };

  const handleDelete = async () => {
    if (loggedUserId === work.professional._id) {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que deseas eliminar este trabajo?"
      );
      if (confirmDelete) {
        try {
          await service.delete(`/work/${id}`);
          alert("Trabajo eliminado con éxito");
          navigate(`/my-page/${loggedUserId}`);
        } catch (error) {
          console.error("Error al eliminar el trabajo:", error);
          alert("Hubo un error al eliminar el trabajo.");
        }
      }
    } else {
      alert("No tienes permiso para eliminar este trabajo.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <SyncLoader color="#343a40" loading={loading} size={15} />
      </Container>
    );
  }

  if (error) {
      navigate("/error"); 
  }

  return (
    <Container className="mt-5">
      {work ? (
        <Card className="p-4 shadow-sm">
          {isEditing ? (
            <Form onSubmit={handleEdit}>
              <Form.Group controlId="title">
                <Form.Label>Título:</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border border-primary"
                />
              </Form.Group>

              <Form.Group controlId="description" className="mt-3">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border border-primary"
                />
              </Form.Group>

              <Form.Group controlId="skills" className="mt-3">
                <Form.Label>Habilidades (separadas por comas):</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.skills.join(", ")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      skills: e.target.value
                        .split(",")
                        .map((skill) => skill.trim()),
                    }))
                  }
                  className="border border-primary"
                />
              </Form.Group>

              <div className="mt-4">
                <Button variant="primary" type="submit" className="me-2">
                  Guardar Cambios
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
              </div>
            </Form>
          ) : (
            <div>
              <h3 className="text-primary">{work.title}</h3>
              <p>{work.description}</p>
              <p>
                <strong>Habilidades:</strong>{" "}
                {work.skills.length > 0 ? work.skills.join(", ") : "Ninguna"}
              </p>
              <p>
                <strong>Profesional: </strong>
                <Link
                  to={`/profiles/${work.professional._id}`}
                  style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold",
                  }}
                >
                  {work.professional.username}
                </Link>
              </p>
              {loggedUserId !== work.professional._id && (
                <Link
                  to={`/transaction-form/${work.professional._id}/${work._id}`}
                >
                  <Button variant="primary" className="mt-2">
                    ¡Interesado? Haz clic aquí!
                  </Button>
                </Link>
              )}

              {loggedUserId === work.professional._id && (
                <div className="mt-3">
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Eliminar
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      ) : (
        <Alert variant="warning" className="text-center">
          No se encontraron detalles del trabajo.
        </Alert>
      )}
    </Container>
  );
}

export default WorkDetails;
