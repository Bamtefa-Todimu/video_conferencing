import React, { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext'


import '../componentStyles/options.css'


const Options = () => {

    const [userId,setUserId] = useState("")

    const {callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream} = useContext(SocketContext)
  return (
    <div className="options-container">
        <div className="options-wrapper">

            <div className="options-left">
              <div className="mic-icon ol-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill='white' width={19} height={19}><path d="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z"/></svg>
              </div>

              <div className="video-icon ol-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='white' width={19} height={19}><path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z"/></svg>
              </div>

              <div className="chat-icon ol-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='white' width={18} height={18}><path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z"/></svg>
              </div>
            </div>
            <input type="text"onChange={(e) => setUserId(e.target.value)}/>
            <p>{socketId}</p>
            <button onClick={() => {callUser(userId);console.log(userId)}}>call</button>
            <button onClick={() => {leaveCall(userId);console.log(userId)}} className="leave-call">End Meeting</button>
        </div>
    </div>
  )
}

export default Options