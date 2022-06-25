import React from 'react'
import Header from './components/Header'
import Videos from './components/Videos'
import Options from './components/Options'

const App = () => {
  return (
    <div className="app-container">
      <Header/>
      <Videos/>
      <Options/>
    </div>
  )
}

export default App