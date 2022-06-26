import React,{useContext,useState} from 'react'

import '../landing_styles/hero.css'

import img_sample from '../assets/images/yarns_sample1.jpg'

import { SocketContext } from '../SocketContext'


const Hero = () => {

    const {setUsername,socketId} = useContext(SocketContext)


    const [user,setUser] = useState("")
    const [isRegistered,setIsRegistered] = useState(false)

  return (
    <div className="landing-hero_container">
        <div className="landing-hero_wrapper">
            <div className="lh-left">
                <h1 className="lh-text">
                    Host Premium <br /> <span>yarns</span> with <br /> yarns.io
                </h1>

                <p>Something to say? call up one of your guys and start a premium yarn session . All at the comfort of your device. <span>Register username below to recieve a caller id</span></p>

                <div className="gt-section">
                    <input type="text" name="" id="username" placeholder='username' onChange={(e) => {setUser(e.target.value)}} value={user}/>
                    <div className="reg-btn" onClick={() => {setUsername(user);setIsRegistered(true)}}>Register</div>
                </div>



                {isRegistered && <div className="caller-id" style={{marginTop:"1rem"}}>
                    <p>Caller id : {socketId}</p>
                </div>}
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