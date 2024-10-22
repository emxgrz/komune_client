import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config"; 
import { AuthContext } from "../../context/auth.context"; 

function CreateTransactionForm() {
  const [work, setWork] = useState("");
  const [professional, setProfessional] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loggedUserId } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //Para prevenir el comportamiento por defecto del formulario!!

    setLoading(true);
    setError(null);

    try {
      const response = await service.post("/transactions", {
        work,
        professional,
        client: loggedUserId, 
        status,
      });

      navigate("/my-page");
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
          <label id="work">Trabajo:</label>
          <input
            type="text"
            id="work"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label id="professional">Profesional:</label>
          <input
            type="text"
            id="professional"
            value={professional}
            onChange={(e) => setProfessional(e.target.value)}
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
            <option value="pendiente">Pendiente</option>
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
