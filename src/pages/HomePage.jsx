import React from 'react'
import WorkList from '../components/work/WorkList'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import "../styles/homePageStyle.css"


function HomePage() {
  return (
    <div className="d-flex flex-column align-items-center"> {/* Cambiar a align-items-center */}
    <Link to="/work-form" className="mb-3">
      <Button variant="outline-primary" type="submit" className="custom-button"> {/* Usar outline-primary para borde azul */}
        Añade un nuevo trabajo
      </Button>
    </Link>
    <WorkList />
  </div>
  )
}

export default HomePage