import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to='/' style={{textDecoration: 'none', color: '#fff'}}>
            {'<'}
        </Link>
        {/* <Link to='/answers' style={{textDecoration: 'none', color: '#fff'}}>
            Answers
        </Link>
        <Link to='/results' style={{textDecoration: 'none', color: '#fff'}}>
            Results
        </Link> */}
        <h4>Names & Faces</h4>
    </div>
  )
}

export default Navbar