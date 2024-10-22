import "./App.css";
import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ProfilePage from "./pages/ProfilePage";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar"
import Private from "./components/auth/Private";
import WorkDetails from "./pages/WorkDetails";

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

        <Route path="/my-page/:userId" element={ <Private> <ProfilePage/> </Private> } />
        <Route path="/profiles/:userId" element={<ProfilePage />} />
        <Route path="/work/:id" element={<WorkDetails />} />



      </Routes>
    </div>
  )
}

export default App