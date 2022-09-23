import React from 'react'
import { Link } from 'react-router-dom'
import './Start.css'

const Start = () => {
  return (
    <div className='start-button'>
      <Link to="/game">
        <button>Start</button>
      </Link>
    </div>
  )
}

export default Start
