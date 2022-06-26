import React from 'react'


import '../landing_styles/header.css'

const Header = () => {
  return (
    <div className="landing-header_container">
        <div className="landing-header_wrapper">
            <div className="landing-logo">
                yarns.io
            </div>

            <div className="landing-btn">
                Get Started
            </div>
        </div>
    </div>
  )
}

export default Header