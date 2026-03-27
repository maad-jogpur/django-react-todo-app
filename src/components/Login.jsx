import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[errors,setErrors] = useState('')
    const[loading,setLoading] = useState(false)
    const{isLoggedIn,setIsLoggedIn} = useContext(AuthContext)
    const userData = {username,password}
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()

 
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/',userData)
            console.log(response.data)
            localStorage.setItem('accessToken',response.data.access)
            localStorage.setItem('refreshToken',response.data.refresh)
            setErrors('')
            setIsLoggedIn(true)
            navigate('/tasks')
        } catch (error) {
            setErrors(error.response.data)
            console.log(error.response.data)
    
        } finally{
            setLoading(false)
        }
    }
  return (
    <>
         <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #153677, #4e085f)' }}>
  
    <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '540px' }}>
    <div className="card-body p-4 p-md-5">
      
      {/* Title Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: '#002765' }}>Login</h2>
        {errors && <div className='alert alert-danger'>Invalid Credentials!</div>}
      </div>

      {/* Form Section - No input-group here! */}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input type="text" className="form-control rounded-pill px-4 py-2" placeholder="Enter username" style={{ boxShadow: 'none' }} value={username} onChange={e => setUsername(e.target.value)} required/>
        </div>

        <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control rounded-pill px-4 py-2" placeholder="min. 8 characters" style={{ boxShadow: 'none' }} value={password} onChange={e => setPassword(e.target.value)} required/>
        </div>

        {loading? (
            <button type='submit' className="btn btn-lg w-100 rounded-pill text-white fw-bold shadow-sm" 
                style={{ backgroundColor: '#ff5945', border: 'none' }} disabled>
          Login
        </button>
        ): (
            <button type='submit' className="btn btn-lg w-100 rounded-pill text-white fw-bold shadow-sm" 
                style={{ backgroundColor: '#ff5945', border: 'none' }}>
          Login
        </button>
        )}
      </form>

    </div>
  </div>
</div>
    </>
  )
}

export default Login