import React, { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext'


const Options = () => {

    const [userId,setUserId] = useState("")

    const {callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream} = useContext(SocketContext)
  return (
    <div className="options-container">
        <div className="options-wrapper">
            <input type="text"onChange={(e) => setUserId(e.target.value)}/>
            <p>{socketId}</p>
            <button onClick={() => {callUser(userId);console.log(userId)}}>call</button>
        </div>
    </div>
  )
}

export default Options