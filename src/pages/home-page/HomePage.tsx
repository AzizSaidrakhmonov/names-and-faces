import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../components/navbar-component/Navbar'

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default HomePage
