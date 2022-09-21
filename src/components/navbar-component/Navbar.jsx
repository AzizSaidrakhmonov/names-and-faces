import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to='/' style={{textDecoration: 'none', color: '#fff'}}>
            Game
        </Link>
        <Link to='/answers' style={{textDecoration: 'none', color: '#fff'}}>
            Answers
        </Link>
        <Link to='/results' style={{textDecoration: 'none', color: '#fff'}}>
            Results
        </Link>
    </div>
  )
}

export default Navbar