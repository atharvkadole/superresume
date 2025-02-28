import React from 'react'
import { NavLink } from 'react-router-dom'


const Login_btn = () => {
  return (
    <NavLink 
                to='/login' 
                className={({ isActive }) => `${isActive ? "text-black hover:bg-gray-500/50 bg-transparent border border-black px-5 py-1 rounded font-semiboldt" : "text-black hover:bg-gray-500/50 bg-blue-500 px-5 py-1 rounded font-semibold"}`}>
                Login
    </NavLink>
  )
}

export default Login_btn