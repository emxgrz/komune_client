import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import service from '../../services/config.js'; 
import { AuthContext } from "../../context/auth.context.jsx"

function UserCard() {
  const [user, setUser] = useState(null); 
  const [email, setEmail] = useState(null); 
  const [username, setUsername] = useState(null); 
  const [service, setService] = useState(null)
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const { isLoggedIn, loggedUserId , authenticateUser } = useContext(AuthContext)

// hacer un handle edit para poder actualizar la info. Luego usar la ruta PUT que ya tengo. El modelo ya está actualizado.

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await service.get(`/user/${loggedUserId}`);
        console.log(response.data)
        setUser(response.data._id)
        setEmail(response.data.email)
        setUsername(response.data.username)
        setService(response.data.service)
      } catch (error) {
        setError('Usuario no encontrado o error en la carga');
        console.error(error); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUser(); 
  }, [loggedUserId]); 

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>; 
  }


  return (
    <div>
      {user && (
        <div>
          <p>Email: {email}</p> 
          <p>Username: {username}</p> 
          <p>Services: {service}</p> 

        </div>
    )} 
    </div>
  )
}

export default UserCard