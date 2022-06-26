import React from 'react'

import Header from './chat_components/Header'
import Videos from './chat_components/Videos'
import Options from './chat_components/Options'

import './chat.css'

const VideoChat = () => {
  return (
    <div className='video-chat_container'>
      <div className="video-chat_wrapper">
        <Header/>
        <Videos/>
        <Options/>
      </div>
    </div>
  )
}

export default VideoChat