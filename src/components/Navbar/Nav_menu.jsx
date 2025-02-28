import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav_menu = () => {
  return (
    <>
    <NavLink 
    to='/' 
    className={({ isActive }) => `${isActive ? "text-blue-500 text-sm font-semibold px-2" : "text-black text-sm font-semibold px-2"}`}>
            Home
    </NavLink>
    <NavLink 
    to='/contact' 
    className={({ isActive }) => `${isActive ? "text-blue-500 text-sm font-semibold px-2" : "text-black text-sm font-semibold px-2"}`}>
            Contact
    </NavLink>
    <NavLink 
    to='/Pricing' 
    className={({ isActive }) => `${isActive ? "text-blue-500 text-sm font-semibold px-2" : "text-black text-sm font-semibold px-2"}`}>
            Pricing
    </NavLink>
    </>
  )
}

export default Nav_menu