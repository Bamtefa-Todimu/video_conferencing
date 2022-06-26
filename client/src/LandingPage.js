import React , {useState,useContext} from 'react'

import Header from './landing_components/Header'
import Hero from './landing_components/Hero'

import { SocketContext } from './SocketContext'

import './landing.css'

const LandingPage = () => {

  const {callUser,answerCall} = useContext(SocketContext)

  const [recpId,setRecpId] = useState("")

  return (
    <div className="landing-page_container">
        <div className="landing-page_wrapper">
            <Header/>
            <Hero/>

            <div className="call-section">
                <h1>Start a Session</h1>
                <div className="call-container">
                    <input type="text" name="" id="call-input" placeholder='Enter Caller Id' onChange={(e) => setRecpId(e.target.value)} value={recpId}/>
                    <div className="call-btn" onClick={() => callUser(recpId)}>Start Call</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage