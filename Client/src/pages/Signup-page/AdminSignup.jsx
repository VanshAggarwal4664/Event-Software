import React from 'react'
import Signup from '../../Components/Signup/Signup'

const handleSignup= (data)=>{
  console.log(data)
}

const AdminSignup = () => {
  return (
    <>
    <Signup 
        heading="Login Page For Admin"
        handleSignup= {handleSignup}
    />
    </>
  )
}

export default AdminSignup