import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {
    const authStatus=useSelector((state)=>state.status)
    const [loader,setLoader] =useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
      if(authentication && authentication !== authStatus){
        navigate('/login')
      }
      else if(!authentication && authentication !== authStatus){
        navigate('/')
      }
      setLoader(false)
    },[authStatus,authentication,navigate])

    return (
    <div>
      { loader ? <h1>Loading...</h1> : <>{children}</>}
    </div>
  )
}
