import service from "../../services/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

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
      console.log(error)
      if (error.response === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        console.log("esto debería ser una pg de error")
      }
    }
  };

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>

        <label>Correo Electronico:</label>
        <input
       
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Username:</label>
        <input
        
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
       
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Registrar</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Signup;