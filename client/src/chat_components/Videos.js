import React,{useContext,useEffect,useRef} from 'react'
import { SocketContext } from '../SocketContext'

import '../componentStyles/video.css'

const Videos = () => {


  
  const {callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream,allUsers,username,recipientName} = useContext(SocketContext)

  return (
    <div className='video-section-container'>
        <div className="video-section-wrapper">
            {<div className="video-container">
                <video playsInline muted autoPlay ref={myVideo} className="my-video"></video>
                <div className="username-display">
                    {username}
                </div>
            </div>}

            {
              callAccepted && !callEnded  && (
                  <div className="video-container">
                       <video playsInline muted autoPlay ref={userVideo} className="user-video"></video>
                       <div className="username-display">
                    {recipientName}
                </div>
                  </div>)
       }
            
        </div>
    </div>
  )
}



export default Videos