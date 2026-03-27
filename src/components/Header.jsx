import React, { useContext } from 'react'
import Button from './Button'
import { AuthContext } from '../AuthProvider'
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
  }

  const handleMyTasks = () => {
    navigate('/tasks')
  }

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-transparent container pt-3 pb-3">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    
    {/* Left Side: Brand */}
    <Button class="btn btn-outline-light px-4" style={{ backgroundColor: '#879b30', border: 'none' }}  url="/" text="ToDo App" />
 
    {isLoggedIn? (
      <div className="d-flex gap-3">
        <button onClick={handleMyTasks} className="btn btn-outline-light rounded-pill px-4" style={{ backgroundColor: '#ff5945', border: 'none' }}> My Tasks</button>
        <button onClick={handleLogout} className="btn btn-outline-light rounded-pill px-4" style={{ backgroundColor: '#ff5945', border: 'none' }}> Logout</button>
      </div>
    ):(
      <div className="d-flex gap-3">
      <Button 
        class="btn btn-outline-light rounded-pill px-4"
        style={{ backgroundColor: '#ff5945', border: 'none' }}  
        url="/login" 
        text="Login" 
      />
      <Button 
        class="btn rounded-pill px-4 text-white shadow-sm" 
        style={{ backgroundColor: '#ff5945', border: 'none' }} 
        url="/register" 
        text="Get Started" 
      />
    </div>
    )}
    

  </div>
</nav>
    </>
  )
}

export default Header