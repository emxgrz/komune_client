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
      <Container>
        <Navbar.Brand as={Link} to="/">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedIn && <Nav.Link as={Link} to="/our-mission">Our mission</Nav.Link>}
            {!isLoggedIn && <Nav.Link as={Link} to="/signup">Registro</Nav.Link>}
            {!isLoggedIn && <Nav.Link as={Link} to="/login">Acceso</Nav.Link>}
            
            {isLoggedIn && <Nav.Link as={Link} to={`/home`}>Home</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={`/search`}>Search</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={`/my-transactions`}>Transactions</Nav.Link>}
            {isLoggedIn && <Nav.Link as={Link} to={`/my-page/${loggedUserId}`}>Mi perfil</Nav.Link>}
            {isLoggedIn && <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNew;