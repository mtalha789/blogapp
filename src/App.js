import './App.css';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login,logout } from './state/authslice'
import authService from './appwrite/auth'
import { Header,Footer } from './components/index'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>setLoading(false))
  },[])

  return !loading &&  (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
}

export default App;
