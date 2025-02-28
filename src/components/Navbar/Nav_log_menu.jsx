import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav_log_menu = () => {
  return (
    <>
    <NavLink 
    to='/' 
    className={({ isActive }) => `${isActive ? "text-blue-500 text-sm font-semibold px-2" : "text-black text-sm font-semibold px-2"}`}>
            Home
    </NavLink>
    <NavLink 
    to='/dashboard/display' 
    className={({ isActive }) => `${isActive ? "text-blue-500 text-sm font-semibold px-2" : "text-black text-sm font-semibold px-2"}`}>
            Projects
    </NavLink>
    </>
  )
}

export default Nav_log_menu;