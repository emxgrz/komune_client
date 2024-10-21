import "./App.css";
import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ProfilePage from "./pages/ProfilePage";

import Navbar from "./components/Navbar"
import Private from "./components/auth/Private";

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/my-page" element={ <Private> <ProfilePage/> </Private> } />


      </Routes>
    </div>
  )
}

export default App