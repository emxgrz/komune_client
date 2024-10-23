import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../services/config'; 
import { AuthContext } from '../context/auth.context';

function UpdateProfile() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext); 
  const { userId } = useParams(); 

  const [imageUrl, setImageUrl] = useState(null); 
const [isUploading, setIsUploading] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    location: {
      city: '',
      country: ''
    },
    description: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  //primero cargamos los datos del user para ver los existentes, luego los editamos
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await service.get(`/user/${userId}`); 
        setUserData(response.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del usuario.');
      }
    };

    fetchUserData();
  }, [userId]); 

  if (!isLoggedIn || loggedUserId !== userId) {
    return <p>No tienes permiso para editar este perfil.</p>; 
  }

  const handleFileUpload = async (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);
  
    if (!event.target.files[0]) {
      return;
    }
  
    setIsUploading(true);
  
    const uploadData = new FormData(); 
    uploadData.append("image", event.target.files[0]);
    
  
    try {
      const response = await service.post("/upload/media", uploadData)
     
      console.log(response.data)
  
      setImageUrl(response.data.imageUrl);
  
  
      setIsUploading(false); 
    } catch (error) {
      navigate("/error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location')) {
      const locName = name.split('.')[1]; 
      setUserData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locName]: value
        }
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = { 
        ...userData,
        image: imageUrl  || userData.image
       }; 
      await service.put(`/user/${userId}`, updatedUserData); 
      navigate(`/my-page/${userId}`); 
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el perfil.');
    }
  };

  

  return (
    <div>
  <h2>Actualizar Perfil</h2>
  {error && <p className="error">{error}</p>}
  <form onSubmit={handleSubmit}>
    <div>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={userData.username || ''} 
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={userData.email || ''} 
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Nombre:</label>
      <input
        type="text"
        name="firstName"
        value={userData.firstName || ''} 
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Apellido:</label>
      <input
        type="text"
        name="lastName"
        value={userData.lastName || ''} 
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Fecha de Nacimiento:</label>
      <input
        type="date"
        name="dateOfBirth"
        value={userData.dateOfBirth ? userData.dateOfBirth.substring(0, 10) : ''} // formato de la fecha
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Ciudad:</label>
      <input
        type="text"
        name="location.city"
        value={userData.location?.city || ''} 
        onChange={handleChange}
      />
    </div>
    <div>
      <label>País:</label>
      <input
        type="text"
        name="location.country"
        value={userData.location?.country || ''} 
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Descripción:</label>
      <textarea
        name="description"
        value={userData.description || ''} 
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Imagen:</label>
      <input
            type="file" // Cambiar a tipo file para cargar imágenes
            name="image" // Aceptar solo archivos de imagen
            onChange={handleFileUpload} // Manejar la carga del archivo
            disabled={isUploading} // Deshabilitar durante la carga
          />
    </div>
    {isUploading ? <h3>... uploading image</h3> : null}
    {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}

    <button type="submit">Actualizar Perfil</button>
  </form>
</div>
  );
}

export default UpdateProfile;
