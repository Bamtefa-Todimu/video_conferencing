import React , {useState,useContext} from 'react'

import Header from './landing_components/Header'
import Hero from './landing_components/Hero'

import { SocketContext } from './SocketContext'

import './landing.css'

const LandingPage = () => {

  const {callUser,answerCall,callerId,setCall,recipientName,calls,stream} = useContext(SocketContext)

  const [recpId,setRecpId] = useState("")

  return (
    <div className="landing-page_container">
        <div className="landing-page_wrapper">

          {
            (calls.isRecievedCall)?

            (<div className="call-notification-popup">
              <div className="cn-name">
                {recipientName}
              </div>

              <div className="cn-action">
                <div className="cn-answer" onClick={() => {if(stream)answerCall(callerId)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={19} fill="white"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></svg>
                </div>
                <div className="cn-reject" onClick={() => setCall({isRecievedCall:false,from:callerId})}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={22} height={22} fill="white"><path d="M271.1 367.5L227.9 313.7c-8.688-10.78-23.69-14.51-36.47-8.974l-108.5 46.51c-13.91 6-21.49 21.19-18.11 35.79l23.25 100.8C91.32 502 103.8 512 118.5 512c107.4 0 206.1-37.46 284.2-99.65l-88.75-69.56C300.6 351.9 286.6 360.3 271.1 367.5zM630.8 469.1l-159.6-125.1c65.03-78.97 104.7-179.5 104.7-289.5c0-14.66-9.969-27.2-24.22-30.45L451 .8125c-14.69-3.406-29.73 4.213-35.82 18.12l-46.52 108.5c-5.438 12.78-1.771 27.67 8.979 36.45l53.82 44.08C419.2 232.1 403.9 256.2 386.2 277.4L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.84 3.158 5.121 9.189c-8.188 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z"/></svg>
                </div>
              </div>
            </div>) : null
          }

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