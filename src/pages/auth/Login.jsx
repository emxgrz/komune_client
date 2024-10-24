import service from "../../services/config.js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";
import "../../styles/signupLogin.css";

function Login() {
  const navigate = useNavigate();
  const { authenticateUser, loggedUserId } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredentials = {
        email,
        password,
      };

      const response = await service.post("/auth/login", userCredentials);
      console.log(response);

      localStorage.setItem("authToken", response.data.authToken);

      await authenticateUser();
      navigate(`/home`);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 500) {
        navigate("/error");
      } else {
        setError(error.response?.data?.message || "Ocurrió un error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="mb-4 text-center">
          Accede a un mundo de posibilidades ▶️
        </h1>

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={handleEmailChange}
              required
              size="lg"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
              size="lg"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-4 w-100"
            style={{ transition: "background-color 0.3s" }}
            disabled={loading}
          >
            {loading ? (
              <SyncLoader color="#343a40" loading={loading} size={10} />
            ) : (
              "Accede al mundo komune 💡"
            )}
          </Button>

          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              No se ha podido iniciar sesión
            </Alert>
          )}
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
