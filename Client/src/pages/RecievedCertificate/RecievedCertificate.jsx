import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CertificateCard from '../../Components/CertificateCard/CertificateCard'
import axios from 'axios'
const RecievedCertificate = () => {
    const url="http://localhost:3000/api/v1/event/recieved-certificate"
    const [data,setData]= useState([]);
  
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
            certificate={[]}
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

export default RecievedCertificate