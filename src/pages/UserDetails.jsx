import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/config.js";
import { Container, Card, Badge, Col, Row } from "react-bootstrap";
import "../styles/userDetails.css";
import SyncLoader from "react-spinners/SyncLoader";

function UserDetails() {
  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const { userId } = useParams();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await service.get(`/user/${userId}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        if (error.response?.status === 500) {
          navigate("/error");
        } else {
          setError(error.response?.data?.message || "Ocurrió un error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <SyncLoader color="#343a40" loading={loading} size={15} />
      </Container>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="mt-5">
  {user && (
    <Card className="p-4 shadow-sm">
      <Card.Header as="h5" className="text-center">
        Detalles del Usuario
      </Card.Header>
      <Card.Body>
        <Row>
          {/* Columna izquierda: imagen y nombre */}
          <Col md={4} className="text-center">
            {user.image && (
              <img
                src={user.image}
                alt={`${user.username}'s avatar`}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
            )}
            {user.username && (
              <h4 className="mt-2">
                {user.firstName} {user.lastName}
              </h4>
            )}
          </Col>

          <Col md={8} className="d-flex flex-column justify-content-center" style={{ paddingLeft: "60px" }}>
            <div className="user-info">
              {user.email && (
                <div className="mb-3 d-flex">
                  <div style={{ width: "120px" }}>
                    <Badge bg="primary" className="badge-fixed">Email</Badge>
                  </div>
                  <div style={{border:"1.5px solid grey", padding:"2px",  borderRadius:"5px" }}>{user.email}</div>
                </div>
              )}
              {user.dateOfBirth && (
                <div className="mb-3 d-flex">
                  <div style={{ width: "120px" }}>
                    <Badge bg="primary" className="badge-fixed">Nacimiento</Badge>
                  </div>
                  <div style={{border:"1.5px solid grey", padding:"2px", borderRadius:"5px"}}>{new Date(user.dateOfBirth).toLocaleDateString()}</div>
                </div>
              )}
              {user.location && user.location.city && (
                <div className="mb-3 d-flex">
                  <div style={{ width: "120px" }}>
                    <Badge bg="primary" className="badge-fixed">Ciudad</Badge>
                  </div>
                  <div style={{border:"1.5px solid grey", padding:"2px", borderRadius:"5px"}}>{user.location.city}</div>
                </div>
              )}
              {user.location && user.location.country && (
                <div className="mb-3 d-flex">
                  <div style={{ width: "120px" }}>
                    <Badge bg="primary" className="badge-fixed">País</Badge>
                  </div>
                  <div style={{border:"1.5px solid grey", padding:"2px", borderRadius:"5px"}}>{user.location.country}</div>
                </div>
              )}
              {user.description && (
                <div className="mb-3 d-flex">
                  <div style={{ width: "150px" }}>
                    <Badge bg="primary" className="badge-fixed">Descripción</Badge>
                  </div>
                  <div style={{border:"1.5px solid grey", padding:"2px", borderRadius:"5px"}}>{user.description}</div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )}
</Container>

  );
}

export default UserDetails;
