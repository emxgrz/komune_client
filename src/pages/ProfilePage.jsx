import React, { useContext } from 'react'
import UserDetails from './UserDetails'
import WorkList from '../components/work/WorkList'
import ReviewList from '../components/review/ReviewList'
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Container, Button } from 'react-bootstrap';





export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate(); 
  const { loggedUserId } = useContext(AuthContext); 


  const handleEditClick = () => {
    navigate(`/edit-page/${userId}`);
  };
  return (
    <Container className="mt-5">
      <UserDetails />
      {loggedUserId === userId && (
        <Button
          variant="primary"
          onClick={handleEditClick}
          style={{ marginTop: '20px' }}
        >
          Editar Perfil
        </Button>
      )}
      <WorkList userId={userId} />
      <ReviewList />
    </Container>
  )
}
