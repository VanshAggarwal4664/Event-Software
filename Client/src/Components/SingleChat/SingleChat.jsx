import { Avatar, Box, Card, CardHeader, Center, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChat } from '../../ReduxFeatures/Chat/ChatSlice'


const SingleChat = ({data}) => {
  const selectedChat= useSelector((state)=>{return state.chat})
  const [singleChatName,setSingleChatName]=useState("")
  const userData= useSelector((state)=>{return state.user})
  const dispatch= useDispatch()


   useEffect(() => {
     if(!data.isGroupChat){
      console.log("run hua")
      calculateName();
     }
   }, [])

   const calculateName = () => {
    data?.users?.map((user) => {
      if (user._id != userData._id) {
        setSingleChatName( user.username);
      }
    })
  }
  return (
    <Card cursor="pointer" onClick={()=>{ 
      dispatch(setChat(data))
      }} 
    bg={selectedChat._id==data._id?"#f7f7f7":""}>
        <CardHeader display="flex" gap="1" >
              <Box alignItems="center">
                <Avatar></Avatar> 
              </Box>
              <Box>
                 <Text fontSize="14px" fontWeight="bold">{data?.isGroupChat?
                  data.chatName
                  :(
                    singleChatName
                  )
                  }</Text>
                 <Text fontSize="14px">{data?.latestMessage?data?.latestMessage?.content:""}</Text>
              </Box>
        </CardHeader>
    </Card>
  )
}

export default SingleChat