import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../components/navbar-component/Navbar'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default HomePage