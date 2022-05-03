import React, { useContext, useEffect } from 'react'
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
import AddLandForm from './pages/AddLandForm'
import TransferLandForm from './pages/TransferLandForm'
import { getHomePageData, getPostsData } from './contexts/actions'
import Waiting from './pages/Waiting'
import UpdateLand from './pages/UpdateLand'
import SplitLand from './pages/SplitLand'
import SplitRequest from './pages/SplitRequest'
import AdminHome from './pages/admin/AdminHome'
import Account from './pages/Account'

function App() {
  const { user, setLands, setNotifyList, setPosts } = useContext(AuthContext)
  console.log(user)

  useEffect(() => {
    const getData = async () => {
      await getHomePageData(user?.role, setLands, setNotifyList)
      await getPostsData(setPosts)
    }
    getData()

  }, [user, setLands, setNotifyList, setPosts])

  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/detail/:id' element={<LandDetail />} />
        <Route path='/addLand' element={<AddLand />} />
        <Route path='/addLand/:type' element={<AddLandForm />} />
        <Route path='/transferLand' element={<TransferLandForm />} />
        <Route path='/transfering' element={<Transfering />} />
        <Route path='/received' element={<Received />} />
        <Route path='/market' element={<Market />} />
        <Route path='/waiting' element={<Waiting />} />
        <Route path='/updateLand/:id' element={<UpdateLand />} />
        <Route path='/splitLand' element={<SplitLand />} />
        <Route path='/splitRequest' element={<SplitRequest />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/account' element={<Account />} />

      </Routes>
    </Router>
  );
}
// <Navigate to='/login' />
export default App;
