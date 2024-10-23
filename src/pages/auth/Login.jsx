import service from "../../services/config.js";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import { Container, Form, Button, Alert } from "react-bootstrap";


function Login() {

  const navigate = useNavigate()
  const { authenticateUser, loggedUserId  } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contactar al backend para validar credenciales de usuario aqui
    try {

      const userCredentials = {
        email,
        password
      }
      
      const response = await service.post("/auth/login", userCredentials)

      console.log(response)

      localStorage.setItem("authToken", response.data.authToken)

      await authenticateUser()

      navigate(`/home`)

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        console.log("aquí debería redireccionar a pag de error") 
     }
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Formulario de Acceso</h1>

      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={handleEmailChange}
            required
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
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Acceder
        </Button>

        {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
      </Form>
    </Container>
  );
}

export default Login;