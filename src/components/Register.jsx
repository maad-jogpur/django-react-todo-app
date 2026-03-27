import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[errors,setErrors] = useState('')
    const[success,setSuccess] = useState(false)
    const[loading,setLoading] = useState(false)

    
    const handleRegistration = async (e) => {
      const userData = {username,email,password}
        setLoading(true)
        e.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
            setErrors('')
            setSuccess(true)
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (error) {
            setErrors(error.response.data)
            setSuccess(false)
        } finally {
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
        <h2 className="fw-bold" style={{ color: '#002765' }}>Create an Account</h2>
        {success && <div className='alert alert-success'>User Registered!</div>}
      </div>

      {/* Form Section - No input-group here! */}
      <form onSubmit={handleRegistration}>
        <div className="mb-3">
          <label className="form-label fw-bold">Username</label>
          <input type="text" className="form-control rounded-pill px-4 py-2" placeholder="Enter username" style={{ boxShadow: 'none' }} value={username} onChange={e => setUsername(e.target.value)} required/>
          <small> {errors.username && <div className='text-danger'>{errors.username}</div> } </small>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email Address</label>
          <input type="email" className="form-control rounded-pill px-4 py-2" placeholder="name@example.com" style={{ boxShadow: 'none' }} value={email} onChange={e => setEmail(e.target.value)} required/>
          <small> {errors.email && <div className='text-danger'>{errors.email}</div> } </small>

        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Password</label>
          <input type="password" className="form-control rounded-pill px-4 py-2" placeholder="min. 8 characters" style={{ boxShadow: 'none' }} value={password} onChange={e => setPassword(e.target.value)} required/>
          <small> {errors.password && <div className='text-danger'>{errors.password}</div> } </small>
        </div>

        {loading? (
            <button type='submit' className="btn btn-lg w-100 rounded-pill text-white fw-bold shadow-sm" 
                style={{ backgroundColor: '#ff5945', border: 'none' }} disabled>
          Please wait....
        </button>
        ): (
            <button type='submit' className="btn btn-lg w-100 rounded-pill text-white fw-bold shadow-sm" 
                style={{ backgroundColor: '#ff5945', border: 'none' }}>
          Register
        </button>
        )}
      </form>

    </div>
  </div>
</div>
    </>
  )
}

export default Register