import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <footer className="mt-auto py-5 w-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Left Side: Brand and Copyright */}
      <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
        <h5 className="text-white fw-bold mb-1">TaskMaster Pro</h5>
        <p className="text-white-50 small mb-0">
          © 2026 TaskMaster Inc. All rights reserved.
        </p>
      </div>

      {/* Right Side: Links */}
      <div className="col-md-6 text-center text-md-end">
        <div className="d-flex justify-content-center justify-content-md-end gap-4">
          <Link href="/privacy" className="text-white-50 text-decoration-none small hover-white">Privacy Policy</Link>
          <Link href="/terms" className="text-white-50 text-decoration-none small hover-white">Terms of Service</Link>
          <Link href="/contact" className="text-white-50 text-decoration-none small hover-white">Support</Link>
        </div>
      </div>

    </div>
    
    {/* Bottom Accent Line */}
    <div className="row mt-4">
        <div className="col-12 text-center">
            <hr className="border-secondary opacity-25 w-50 mx-auto" />
            <div className="d-flex justify-content-center gap-3 mt-3">
                <i className="fa-brands fa-github text-white-50 fs-5"></i>
                <i className="fa-brands fa-twitter text-white-50 fs-5"></i>
                <i className="fa-brands fa-linkedin text-white-50 fs-5"></i>
            </div>
        </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer