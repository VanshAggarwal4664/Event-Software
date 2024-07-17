import React, { useState } from 'react'
import "../Signin/Signin.css"
import { Box, Button,Heading, Image, Input, Text } from '@chakra-ui/react'
import pic from '../../../public/login.svg'
const Signin = ({handleSignin,heading}) => {
// handkling the login data of the user
const [data, setData]=useState({
  email:"",
  password:""
})
// handling the  change in data and update the data
const handleChange=(e)=>{
   setData({...data, [e.target.name]: e.target.value})
}

  return (
   <>
    <Box  display="flex"  width="100%" height="100vh" justifyContent="center" alignItems="center">
       <Box className='signup-component' display="flex" width="60%" height="60%">
       <Box width="50%">
         <Image width="90%" height="100%" src={pic}></Image>
       </Box>
       <Box width="50%">
       <Box display="flex" flexDirection="column" gap="15px" width="90%" justifyContent="center" padding="20px 70px" >
                <Heading>{heading}</Heading>
                <label style={{margin:"5px 0px"}} >Email
                <Input onChange={handleChange} backgroundColor="white" type="email" name="email" value={data.email} placeholder='Enter your email' />
                </label>
                <label style={{margin:"5px 0px"}} >Password
                <Input onChange={handleChange}  backgroundColor="white" type="password" name="password" value={data.password} placeholder='Enter your password'/>
                </label>
                <Text>Dont have an account? <a href='/user/signup' style={{cursor:'pointer'}}>Signup Now</a></Text>            
                <Button onClick={()=>{
                   handleSignin(data)
                }}  type="submit">Signin</Button>
    
                {/* <Button onClick={handleSignup} style={{ backgroundColor:"#455a64", color:"white"}}>Signup with google</Button> */}
    
            </Box> 
        </Box>
        </Box>
    </Box>
   </>
  )
}

export default Signin  
