import React from 'react'
import UserDetails from './UserDetails'
import WorkList from '../components/work/WorkList'
import ReviewList from '../components/review/ReviewList'
import { useParams, useNavigate } from 'react-router-dom';



export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate(); 

  const handleEditClick = () => {
    navigate(`/edit-page/${userId}`);
  };
  return (
    <div>
      <UserDetails/>
      <button onClick={handleEditClick} style={{ marginTop: '20px' }}>
        Editar Perfil
      </button>
      <WorkList />
      <ReviewList />

      
    </div>
  )
}
