import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";
import searchIcon from "../assets/images/icons8-search-64.png"

function NavbarNew() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedUserId, authenticateUser } =
    useContext(AuthContext);

  const handleLogout = async () => {
    const confirmation = window.confirm("¿Estás segura?");
    if (confirmation) {
      console.log("Sesión cerrada");
    } else {
      console.log("Cancelado");
    }

    try {
      localStorage.removeItem("authToken");

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        {!isLoggedIn && (
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            komune
          </Navbar.Brand>
        )}

        {isLoggedIn && (
          <Navbar.Brand as={Link} to="/home" className="fw-bold">
            komune
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {" "}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/our-mission" className="nav-button">
                SOBRE NOSOTROS
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/signup" className="nav-button">
                REGISTRO
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login" className="nav-button">
                ACCESO
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to={`/search`} className="nav-button">
                <img src={searchIcon} style={{width:"22px"}} alt="search icon" />
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to={`/my-transactions`}
                className="nav-button"
              >
                OPERACIONES
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to={`/my-page/${loggedUserId}`}
                className="nav-button"
              >
                PERFIL
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout} className="nav-button">
                CERRAR SESIÓN
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNew;
