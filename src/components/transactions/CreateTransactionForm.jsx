import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../services/config"; 
import { AuthContext } from "../../context/auth.context"; 

function CreateTransactionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loggedUserId } = useContext(AuthContext); 
  const navigate = useNavigate();

  const {userId} = useParams()
  const {workId} = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault(); //Para prevenir el comportamiento por defecto del formulario!!

    setLoading(true);
    setError(null);

    try {
      const response = await service.post("/transaction", {
        work: workId,
        professional: userId,
        client: loggedUserId, 
        title,
        description,
        status
      });

      navigate("/my-transactions");
    } catch (error) {
      setError(error.response?.data?.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-transaction-form">
      <h2>Crear Transacción</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label id="description">Descripción:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label id="status">Estado:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Seleccione un estado</option>
            <option value="en progreso...">Pendiente</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <button type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default CreateTransactionForm;
