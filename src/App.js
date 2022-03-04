import React, { useContext } from 'react'
import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import { AuthContext } from "./contexts/AuthContext"
import LandDetail from './pages/LandDetail'
import AddLand from './pages/AddLand'
import Transfering from './pages/Transfering'
import Received from './pages/Received'
import Market from './pages/Market'
import TransferLand from './pages/TransferLand'
import AddLandForm from './pages/AddLandForm'

function App() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<LandDetail />} />
        <Route path='/addLand' element={<AddLand />} />
        <Route path='/addLand/:type' element={<AddLandForm />} />
        <Route path='/transferLand' element={<TransferLand />} />
        <Route path='/transfering' element={<Transfering />} />
        <Route path='/received' element={<Received />} />
        <Route path='/market' element={<Market />} />
      </Routes>
    </Router>
  );
}
// <Navigate to='/login' />
export default App;
