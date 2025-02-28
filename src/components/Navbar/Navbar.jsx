import React from 'react'
import Login_btn from './Login_btn'
import Nav_menu from './Nav_menu'
import authstore from '../../store/authstore'
import Logout_btn from './Logout_btn'
import Nav_log_menu from './Nav_log_menu'

const Navbar = () => {
    const { isAuth, user, logout, loading } = authstore(); // Get state from Zustand store
  return (
    <div className='bg-white p-4 flex justify-around items-center  top-0 w-full z-10 h-12 shadow-md'>
        <div className='flex justify-start items-center w-1/2'>
        <img src="https://img.icons8.com/ios/50/000000/instagram-new.png" alt="logo" className='w-8 h-8' />
        </div>
        <div className='flex justify-center items-center w-1/2'>
            
            {isAuth?(<Nav_log_menu/>):(<Nav_menu/>)}
        </div>
        <div className='flex justify-end items-center w-1/2'>
        {isAuth?(<Logout_btn/>):(<Login_btn/>)}
        </div>
    </div>
  )
}

export default Navbar
