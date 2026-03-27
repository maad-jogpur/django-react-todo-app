import React from "react"
import Home from "./components/Home"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Register from "./components/Register"
import Login from "./components/Login"
import AuthProvider, { AuthContext } from "./AuthProvider"
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import Tasks from "./components/Tasks"
 

function App() {


  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>} />
          <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>} />
          <Route path='/tasks' element={<PrivateRoute> <Tasks/> </PrivateRoute>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </AuthProvider>
      
      
    </>
  )
}

export default App
