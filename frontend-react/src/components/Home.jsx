import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'


const Home = () => {
    
  return (
    <>
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" 
     style={{ background: 'linear-gradient(135deg, #153677, #4e085f)' }}>
  
  <div className="container" style={{ maxWidth: '800px' }}>
    <div className="row justify-content-center">
      
      {/* Main Hero Card */}
      <div className="col-12 bg-white p-5 rounded-4 shadow-lg text-center mb-4">
        <h1 className="display-5 fw-bold mb-3" style={{ color: '#002765' }}>
          TaskMaster Pro
        </h1>
        
        <p className="lead text-secondary mb-4">
          Simplify your workflow and boost your productivity. 
          Our minimalist interface helps you focus on what matters most.
        </p>

        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button 
            onClick={() => window.location.href = '/register'} 
            className="btn btn-lg px-5 py-3 rounded-pill fw-bold text-white border-0"
            style={{ backgroundColor: '#ff5945' }}
          >
            Get Started Free
          </button>
        </div>
      </div>

      {/* Info Cards Row */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-3 text-center">
            <div className="card-body">
              <h5 className="card-title fw-bold" style={{ color: '#153677' }}>Organize</h5>
              <p className="card-text text-muted small m-0">
                Categorize and prioritize tasks effortlessly with our intuitive interface.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-3 text-center">
            <div className="card-body">
              <h5 className="card-title fw-bold" style={{ color: '#153677' }}>Track</h5>
              <p className="card-text text-muted small m-0">
                Mark tasks as complete with a single click and watch your progress grow.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
    </>
  )
}

export default Home

