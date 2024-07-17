import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CertificateCard from '../../Components/CertificateCard/CertificateCard'
import axios from 'axios'
const Certificate = () => {
  const url="http://localhost:3000/api/v1/event/created-events"
  const [data,setData]= useState([]);


   // fetching that events which is created by loggeed in user and setData with events value and map through the data and render certificate card
  useEffect(() => {
    const fetchEvents= async()=>{
      try {
        const response=  await axios.get(url,{
            withCredentials:true
        })
        setData(response?.data?.data?.events)
      } catch (error) {
       console.log(error)

      }
    }
    fetchEvents()
  
  }, [])
  
  return (
   <>
    <Box width="100%" height="100%" display="flex" flexDirection="column" padding="40px"  alignContent="center">
    {data.length>0?(
      data?.map((single)=>{
        return (
          <Box key={single?._id}>
          <CertificateCard
            event={single}
            download={false}
          />
          </Box>
          
        )
      })
      )
    
    :
    <p>No data found</p>
    } 
    </Box>
   </>
  )
}

export default Certificate