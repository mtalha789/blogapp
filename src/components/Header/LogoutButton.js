import React from 'react';
import {logout} from '../../state/authslice';
import { useDispatch } from 'react-redux';
import  authService from '../../appwrite/auth'

function LogoutButton() {

    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout().then(()=>dispatch(logout()))
    }

  return (
    <button className='inline-block text-gray-400 duration-200 hover:bg-blue-100 px-6 py-2 rounded-full' 
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutButton
