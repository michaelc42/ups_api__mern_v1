import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Router} from 'react-router-dom'

import Login from './components/Login'
import Layout from './components/Layout'
import Unauthorized from './components/Unauthorized'
import RequireAuth from './components/RequireAuth'
import Admin from './components/Admin'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import NavbarComp from './components/NavbarComp'
import Logout from './components/Logout'
import Cart from './components/Cart'
import { ROLES } from './constants/ROLES'
import CartContext from './context/CartContext'



function App() {
  function initializeCart() {
    return localStorage.cart ? JSON.parse(localStorage.getItem('cart')) : []
  }
  const [errorMsg, setErrorMsg] = useState()
  const [cart, setCart] = useState(initializeCart())

  return (
    <> 
      <CartContext.Provider value={{ cart, setCart }}>
        <NavbarComp allowedRoles/>
        <Routes>
              <Route path='/*' element={<Layout />}>
                <Route path='home' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<Home />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
            
                <Route path="logout" element={<Logout />} />
              </Route>
            
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                {/* <Route path="admin" element={<Admin />} />
                <Route path="logout" element={<Logout />} /> */}
              </Route>
          </Routes>
        </CartContext.Provider>
      </>
      
  );
}

export default App;
