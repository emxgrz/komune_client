import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { spread } from "axios";
import OurMission from "../pages/OurMission";

function Navbar() {

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
    <nav>
      <Link to="/">LOGO</Link>
      { !isLoggedIn && <Link to="/our-mission">Our mission</Link> }

      { !isLoggedIn && <Link to="/signup">Registro</Link> }
      { !isLoggedIn && <Link to="/login">Acceso</Link> }
      

      { isLoggedIn &&<Link to={`/my-page/${loggedUserId}`}>Top Secret Info</Link> }
      {/* { !isLoggedIn &&<Link to={`/profiles/${userId}`}>Other id</Link>} */}
      { userId && <Link to={`/profiles/${userId}`}>Other id</Link> }
      { isLoggedIn &&<Link onClick={handleLogout}>Cerrar sesión</Link> }
      { isLoggedIn &&<Link to="/search">Search work</Link> }


    </nav>
  );
}

export default Navbar;