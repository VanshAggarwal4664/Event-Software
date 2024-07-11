import { Box, Center, Heading, Image, resolveStyleConfig, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import eventlogo from '../../public/event-logo.png'
import {useParams } from 'react-router-dom'
import axios from 'axios'
const TempCertificate = () => {
  const event= useParams()
  const [data,setData]=useState(null)
  const [userdata,setUserdata]=useState(null)
useEffect(() => {
  const fetchCertificate= async()=>{
    try {
      const response= await axios.get(`http://localhost:3000/api/v1/certificate/get-certificate/${event.id}`,{
        withCredentials:true
      })
      console.log(response)
      setData(response?.data?.data?.certificate);
      setUserdata(response?.data?.data?.user);

    } catch (error) {
      console.log(error);
    }
  }
  fetchCertificate();
  
}, [])


  return (

    <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
   
    { data ?
      <Box width="60%" height="80%" border="10px solid black" display="flex" flexDirection="column"  >
             <Box height="40%" display="flex" justifyContent="space-around">
                 <Image src={eventlogo} width="400px" height="100%" objectFit="contain"  alt="weblogo"/>
                 <Image src={data?.companyLogo} width="200px" height="100%" objectFit="contain" alt="Companylogo"/>
             </Box>
             <Center display="flex" flexDirection="column" gap="10px">
                <Heading>{data?.companyName}</Heading>
                <Heading fontWeight="600">Certificate of Participation</Heading>
                <Text fontSize="28px">This is to certify that</Text>
                <Heading fontSize="35px" fontWeight="600">{userdata? userdata?.username:"Username"}</Heading>
                <Text fontSize="28px">has successfully participated in the event</Text>
                <Heading fontSize="35px" fontWeight="600">{data?.event?.eventName}</Heading>
                <Text fontSize="28px">start on {data?.event?.startDate?.split('T')[0]}</Text>
             </Center>
        </Box>:"NO Certificate Found"
    }
        
    </Box>
  )
}

export default TempCertificate