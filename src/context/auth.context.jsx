import { createContext, useEffect, useState } from "react";
import service from "../services/config";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Container } from "react-bootstrap";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await service.get("/auth/verify");

      console.log(response);
      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setIsValidatingToken(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsValidatingToken(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
  };

  if (isValidatingToken) {
    return (
      <Container className="text-center mt-5">
        <PacmanLoader color="#343a40" loading={isValidatingToken} size={15} />
      </Container>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
