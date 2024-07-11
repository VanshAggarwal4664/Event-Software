import React, { useState } from 'react'
import Signin from '../../Components/Signin/Signin'
import axios from 'axios'
import { setUser } from '../../ReduxFeatures/User/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserSignin = () => {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const [userData,setUserData]= useState()
    const handleSignin=async(data)=>{
     try {
       const response = await axios.post("http://localhost:3000/api/v1/user/login",data,{
         headers:{
           "Content-Type":"multipart/form-data" 
         },
        withCredentials:true
        })
        alert(response?.data?.message)
        setUserData(response?.data?.data?.user)
        dispatch(setUser(response?.data?.data?.user))
       if(response?.data?.success) navigate('/')
     } catch (error) {
      console.log(error)
     }
    }
  return (
    <>
       <Signin
        heading="Login For User Dashboard"
        handleSignin={handleSignin}
       />
    </>
  )
}

export default UserSignin