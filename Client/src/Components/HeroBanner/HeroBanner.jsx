import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import event from '../../../public/virtualEvent.jpg'
import { useNavigate } from 'react-router-dom'

const HeroBanner = () => {
  const navigate= useNavigate()
  return (
    <>
    <Box display="flex" justifyContent="center">
        <Box alignItems="center" width="90%" display="flex" justifyContent="space-around" padding="20px 40px"  backgroundColor="#bee1e6">
            <Box width="50%" padding="40px"  backgroundColor="#bee1e6">
                <Heading>Video Calls and Meetings for everyone</Heading>
                <Text>Events</Text>
                <Box display="flex" gap="20px" marginTop="20px">
                <Button _hover={{ backgroundColor:"white", color:"black"}} backgroundColor="black" variant="solid" color='white'
                onClick={()=>{
                  navigate("/all-events")
                }}
                >
                Join Event
                </Button>
                <Button onClick={()=>{
                  navigate("/create-event")
                }} variant="outline" borderColor="#1792ea">Create Event</Button>
                </Box>
            </Box>
            <Box display="flex" position="relative"  padding="40px 0px"  backgroundColor="#bee1e6">
               <Box position="absolute" top="20px" right="50px" border="2px solid #1792ea" borderRadius="22px" width="300px" height="360px" zIndex="1"></Box>
              <Image objectFit="cover" src={event} width="300px" height="380px" border="2px solid" borderRadius="12px" zIndex="2"/>
            </Box> 
        </Box>
        </Box>
     
    </>
  )
}

export default HeroBanner