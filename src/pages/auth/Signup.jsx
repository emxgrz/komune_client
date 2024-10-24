import service from "../../services/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "../../styles/signupLogin.css"
import SyncLoader from "react-spinners/SyncLoader"; 


function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false); 


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const newUser = {
        email,
        password,
        username
      }
      
      await service.post("/auth/signup", newUser)

      navigate("/login")

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log("esto debería ser una pg de error");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="mb-4 text-center">Súmate al cambio 🔁</h1>

        <Form onSubmit={handleSignup}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={handleEmailChange}
              required
              size="lg"             />
          </Form.Group>

          <Form.Group controlId="formUsername" className="mt-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={handleUsernameChange}
              required
              size="lg"             />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
              size="lg"             />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="mt-4 w-100" 
            style={{ transition: 'background-color 0.3s' }}
            disabled={loading}           >
            {loading ? <SyncLoader color="#343a40" loading={loading} size={10} /> : "¡Comencemos!"}
          </Button>

          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Form>
      </Card>
    </Container>
  );
}

export default Signup;