import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";

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
                our mission
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/signup" className="nav-button">
                registro
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login" className="nav-button">
                acceso
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to={`/search`} className="nav-button">
                search
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to={`/my-transactions`}
                className="nav-button"
              >
                transactions
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to={`/my-page/${loggedUserId}`}
                className="nav-button"
              >
                perfil
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link onClick={handleLogout} className="nav-button">
                cerrar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNew;
