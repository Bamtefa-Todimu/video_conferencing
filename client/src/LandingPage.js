import React from 'react'

import Header from './landing_components/Header'
import Hero from './landing_components/Hero'

import './landing.css'

const LandingPage = () => {
  return (
    <div className="landing-page_container">
        <div className="landing-page_wrapper">
            <Header/>
            <Hero/>

            <div className="call-section">
                <h1>Start a Session</h1>
                <div className="call-container">
                    <input type="text" name="" id="call-input" placeholder='Enter Caller Id'/>
                    <div className="call-btn">Start Call</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage