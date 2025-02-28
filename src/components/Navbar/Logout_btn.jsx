import React from 'react'
import authstore from '../../store/authstore'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Logout_btn = () => {
    const { user, logout} = authstore(); // Get state from Zustand store
  return (
    <>
    <span className='text-black font-semibold px-2 text-black'>Hi,{user.name}</span>
    <button  onClick={logout}
                className="text-black hover:bg-gray-500/50 bg-blue-500 px-5 py-1 rounded font-semibold">
                Logout
    </button>
    </>
  )
}

export default Logout_btn