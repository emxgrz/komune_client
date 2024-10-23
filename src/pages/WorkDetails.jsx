import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/config.js";
import { AuthContext } from "../context/auth.context.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";

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
          navigate("/works");
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
    return <p>Cargando detalles del trabajo...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Detalles del Trabajo</h2>
      {work ? (
        <div>
          {isEditing ? (
            <form onSubmit={handleEdit}>
              <div>
                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="skills">
                  Habilidades (separadas por comas):
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills.join(", ")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      skills: e.target.value
                        .split(",")
                        .map((skill) => skill.trim()),
                    }))
                  }
                />
              </div>

              <button type="submit">Guardar Cambios</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </form>
          ) : (
            <div>
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              <p>
                Habilidades:{" "}
                {work.skills.length > 0 ? work.skills.join(", ") : "Ninguna"}
              </p>
              <p>Profesional: {work.professional.username}</p>
              <Link to="/transaction-form">
                <button>Interested? Click here!</button>
                {/* para crear una nueva transacción si están interesados en el anuncio del servicio */}
              </Link>

              {loggedUserId === work.professional._id && (
                <div>
                  <button onClick={() => setIsEditing(true)}>Editar</button>
                  <button onClick={handleDelete}>Eliminar</button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No se encontraron detalles del trabajo.</p>
      )}
    </div>
  );
}

export default WorkDetails;
