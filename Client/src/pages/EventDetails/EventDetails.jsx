import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from '../../Components/Header/Header'
import Details from '../../Components/Details/Details'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EventDetails = () => {
  const navigate= useNavigate()
  // fetching user from store to check if it is logged in or not
  const user= useSelector((state)=>state.user);

  // handle the joining of event 
  const handleJoin=async(id,eventId)=>{
    if(user.role == ""){
      alert("please login to join event")
     navigate("/user/login")
     return
    }
    try {
      const response = await axios.post("http://localhost:3000/api/v1/chat/create",{id,eventId},{withCredentials:true})
      console.log(response)
      navigate("/dashboard/chat");
    } catch (error) {
      alert("something went wrong")
      console.log(error)
    }
 }
  return (
    <Box width="100%" height="100vh">
        <Header/>
        <Details 
          handleJoin={handleJoin}
        />
    </Box>
  )
}

export default EventDetails