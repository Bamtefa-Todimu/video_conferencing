import React,{useContext,useEffect,useRef} from 'react'
import { SocketContext } from '../SocketContext'

import '../componentStyles/video.css'

const Videos = () => {


  
  const {callAccepted,myVideo,userVideo,callEnded,socketId,callUser,answerCall,leaveCall,stream,allUsers,username,recipientName,muted,remoteMuted,videoHidden,remoteVideoHidden} = useContext(SocketContext)

  return (
    <div className='video-section-container'>
        <div className="video-section-wrapper">
            {<div className="video-container">
                <video playsInline  autoPlay ref={myVideo} className="my-video"></video>
                {(videoHidden)?(<div className="hidden-text">
                  {username}
                </div>):null}

                {
                  (muted)?(<div className="fol-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill='#AD4D39' width={19} height={19}><path d="M383.1 464l-39.1-.0001v-33.77c20.6-2.824 39.98-9.402 57.69-18.72l-43.26-33.91c-14.66 4.65-30.28 7.179-46.68 6.144C245.7 379.6 191.1 317.1 191.1 250.9V247.2L143.1 209.5l.0001 38.61c0 89.65 63.97 169.6 151.1 181.7v34.15l-40 .0001c-17.67 0-31.1 14.33-31.1 31.1C223.1 504.8 231.2 512 239.1 512h159.1c8.838 0 15.1-7.164 15.1-15.1C415.1 478.3 401.7 464 383.1 464zM630.8 469.1l-159.3-124.9c15.37-25.94 24.53-55.91 24.53-88.21V216c0-13.25-10.75-24-23.1-24c-13.25 0-24 10.75-24 24l-.0001 39.1c0 21.12-5.559 40.77-14.77 58.24l-25.72-20.16c5.234-11.68 8.493-24.42 8.493-38.08l-.001-155.1c0-52.57-40.52-98.41-93.07-99.97c-54.37-1.617-98.93 41.95-98.93 95.95l0 54.25L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.839 3.158 5.12 9.189c-8.187 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z"/></svg></div> )
                  :null
                }
                <div className="username-display">
                    {username}
                </div>
            </div>}

            {
              callAccepted && !callEnded  && (
                  <div className="video-container">
                       <video playsInline  autoPlay ref={userVideo} className="user-video"></video>
                        {(remoteVideoHidden)?(<div className="hidden-text">
                  {recipientName}
                </div>):null}

                {
                  (remoteMuted)?(<div className="fol-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill='#AD4D39' width={19} height={19}><path d="M383.1 464l-39.1-.0001v-33.77c20.6-2.824 39.98-9.402 57.69-18.72l-43.26-33.91c-14.66 4.65-30.28 7.179-46.68 6.144C245.7 379.6 191.1 317.1 191.1 250.9V247.2L143.1 209.5l.0001 38.61c0 89.65 63.97 169.6 151.1 181.7v34.15l-40 .0001c-17.67 0-31.1 14.33-31.1 31.1C223.1 504.8 231.2 512 239.1 512h159.1c8.838 0 15.1-7.164 15.1-15.1C415.1 478.3 401.7 464 383.1 464zM630.8 469.1l-159.3-124.9c15.37-25.94 24.53-55.91 24.53-88.21V216c0-13.25-10.75-24-23.1-24c-13.25 0-24 10.75-24 24l-.0001 39.1c0 21.12-5.559 40.77-14.77 58.24l-25.72-20.16c5.234-11.68 8.493-24.42 8.493-38.08l-.001-155.1c0-52.57-40.52-98.41-93.07-99.97c-54.37-1.617-98.93 41.95-98.93 95.95l0 54.25L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.839 3.158 5.12 9.189c-8.187 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z"/></svg></div> )
                  :null
                }
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