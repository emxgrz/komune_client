
import { createContext, useEffect, useState } from "react";
import service from "../services/config";

// contexto
const AuthContext = createContext()

//  envoltorio
function AuthWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)


  useEffect(() => {
    authenticateUser()
  }, [])

  const authenticateUser = async () => {
    
    try {

     
      const response = await service.get("/auth/verify")

      console.log(response)
      //si el token es válido
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsValidatingToken(false)

     

    } catch (error) {
      // si el token no es valido
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsValidatingToken(false)

    }

  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser
    
  }

  if (isValidatingToken) {
    return <h3>... validando usuario</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}