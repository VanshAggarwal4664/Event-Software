import { Box, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ChatPanel from '../../Components/ChatPanel/ChatPanel'
import axios from 'axios'
import ChatBox from '../../Components/ChatBox/ChatBox'

const Chat = () => {
  const [originalData,setOriginalData]= useState([]);
  const [filterData,setFilterData]=useState([]);
  const [fetchChatagain,setFetchChatAgain]=useState(false)
 

  useEffect(() => {
   const fetchChat= async()=>{
       try {
         const response= await axios.get("http://localhost:3000/api/v1/chat/allchats",{
          withCredentials:true
          })
        //  console.log(response.data.data)
        setOriginalData(response?.data?.data)
        setFilterData(response?.data?.data)
       } catch (error) {
         console.log(error)
       }
   }
   fetchChat();
  }, [fetchChatagain]);
   


  return (
    <Box display="flex" width="100%" height="100%"  padding="20px">
      <Box flex="2">
       <ChatPanel
        originalData={originalData}
        setFilterData={setFilterData}
        filterData={filterData}
       />
      </Box>
      <Box flex="0.1">
         <Divider orientation="vertical" color="#f7f7f7"/>
      </Box>
      <Box flex="4" maxHeight="100%" overflowY="hidden" padding="20px" >
        <ChatBox
          setFetchChatAgain={setFetchChatAgain}
        />
      </Box>

    </Box>
  )
}

export default Chat