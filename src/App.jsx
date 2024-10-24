import "./App.css";
import { Routes, Route } from "react-router";
import Private from "./components/auth/Private";
import { useState, useEffect } from "react";

import NavbarNew from "./components/Navbar"


import EnterPage from "./pages/EnterPage";
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import OurMission from "./pages/OurMission";

import ProfilePage from "./pages/ProfilePage";
import UpdateProfile from "./pages/UpdateProfile";

import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage"

import WorkDetails from "./pages/WorkDetails";
import CreateWorkForm from "./components/work/CreateWorkForm";

import ReviewDetails from "./pages/ReviewDetails";
import CreateReviewForm from "./components/review/CreateReviewForm";

import TransactionPage from "./pages/TransactionPage";
import CreateTransactionForm from "./components/transactions/CreateTransactionForm";
import TransactionDetails from "./pages/TransactionDetails";

import WorkList from "./components/work/WorkList";
import Footer from "./components/Footer";

function App() {

  return (
    <div id="root"> {/* Asegúrate de que este div tenga el id="root" */}
      <NavbarNew />

      <div className="main-content"> {/* Agregamos la clase para el contenido principal */}
        <Routes>
          <Route path="/" element={<EnterPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/our-mission" element={<OurMission />} />

          {/* Once inside de web, private */}
          <Route path="/my-page/:userId" element={<Private><ProfilePage /></Private>} />
          <Route path="/edit-page/:userId" element={<Private><UpdateProfile /></Private>} />
          <Route path="/profiles/:userId" element={<ProfilePage />} />

          <Route path="/search" element={<Private><SearchPage /></Private>} />
          <Route path="/home" element={<Private><HomePage /></Private>} />

          <Route path="/work/:id" element={<Private><WorkDetails /></Private>} />
          <Route path="/work-form" element={<Private><CreateWorkForm /></Private>} />

          <Route path="/review/:id" element={<Private><ReviewDetails /></Private>} />
          <Route path="/review-form/:transactionId/:userId" element={<Private><CreateReviewForm /></Private>} />

          <Route path="/my-transactions" element={<Private><TransactionPage /></Private>} />
          <Route path="/transaction/:id" element={<Private><TransactionDetails /></Private>} />
          <Route path="/transaction-form/:userId/:workId" element={<Private><CreateTransactionForm /></Private>} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App