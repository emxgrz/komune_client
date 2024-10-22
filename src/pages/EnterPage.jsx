import React from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

export default function EnterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirige a la página de login
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Redirige a la página de signup
  };

  return (
    <div className="enter-page">
      <h1>Bienvenido</h1>
      <p>Bla bla bla accede a esta web</p>
    </div>
  );
}
