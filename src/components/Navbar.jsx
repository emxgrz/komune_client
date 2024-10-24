import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";
import OurMission from "../pages/OurMission";
import { Navbar, Nav, Container } from "react-bootstrap";


function NavbarNew() {

  const navigate = useNavigate()
  const { isLoggedIn, loggedUserId, authenticateUser } = useContext(AuthContext)

  const {userId} = useParams()

  const handleLogout = async () => {

    try {
      
      localStorage.removeItem("authToken") 

      await authenticateUser() 

      navigate("/") 

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        {!isLoggedIn && <Navbar.Brand as={Link} to="/" className="fw-bold">
          komune
        </Navbar.Brand>}

        {isLoggedIn && <Navbar.Brand as={Link} to="/home" className="fw-bold">
          komune
        </Navbar.Brand>}
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Alinear elementos a la derecha */}
            {!isLoggedIn && <Nav.Link as={Link} to="/our-mission" className="nav-button">Our Mission</Nav.Link>}
            {!isLoggedIn && <Nav.Link as={Link} to="/signup" className="nav-button">Registro</Nav.Link>}
            {!isLoggedIn && <Nav.Link as={Link} to="/login" className="nav-button">Acceso</Nav.Link>}
            
  
            {isLoggedIn && <Nav.Link as={Link} to={`/search`} className="nav-button">Search</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={`/my-transactions`} className="nav-button">Transactions</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={`/my-page/${loggedUserId}`} className="nav-button">Mi Perfil</Nav.Link>}
            {isLoggedIn && <Nav.Link onClick={handleLogout} className="nav-button">Cerrar Sesión</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNew;