import React from 'react'

import '../landing_styles/hero.css'

import img_sample from '../assets/images/yarns_sample1.jpg'



const Hero = () => {
  return (
    <div className="landing-hero_container">
        <div className="landing-hero_wrapper">
            <div className="lh-left">
                <h1 className="lh-text">
                    Host Premium <br /> <span>yarns</span> with <br /> yarns.io
                </h1>

                <p>Something to say? call up one of your guys and start a premium yarn session . All at the comfort of your device. <span>Register username below to recieve a caller id</span></p>

                <div className="gt-section">
                    <input type="text" name="" id="username" placeholder='username'/>
                    <div className="reg-btn">Register</div>
                </div>
            </div>

            <div className="lh-right">

                <div className="lh-img_container">
                    <img src={img_sample} alt="" className="yarns-sample" />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Hero