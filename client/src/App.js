import React ,{useContext,useState,useEffect} from 'react'

import { SocketContext } from './SocketContext'

import VideoChat from './VideoChat'
import LandingPage from './LandingPage'

const App = () => {

  const {callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream,allUsers} = useContext(SocketContext)


  return (
    <div className="app-container">
      {
      (!callAccepted)?<LandingPage/>:<VideoChat/>
    }
      
    </div>
  )
}

export default App