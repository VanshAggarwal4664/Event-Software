import React from 'react'
import Signup from '../../Components/Signup/Signup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SuperAdminSignup = () => {
  const navigate= useNavigate()
  const handleSignup=async(data)=>{
    const DataToSend={...data}
 try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",DataToSend,{
       headers:{
         "Content-Type":"multipart/form-data" 
       },
      withCredentials:true
      })
    alert(response.data.message)
    navigate("/user/login")
 } catch (error) {
    console.log(error)
 }
}
  return (
    <>
        <Signup
            heading="Signup Page For Super Admin"
            handleSignup={handleSignup}
        />
    </>
  )
}

export default SuperAdminSignup