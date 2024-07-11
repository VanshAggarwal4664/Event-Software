import { Avatar, Box, Button, Card, CardFooter, CardHeader, Divider, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleMessage from '../SingleMessage/SingleMessage'
import { io } from 'socket.io-client'
import ChatDrawer from '../ChatDrawer/ChatDrawer'
import File from '../FileComponent/File'


const ChatBox = ({ setFetchChatAgain }) => {
  const socket = useRef();
  const selectedChatCompare = useRef();
  const selectedChat = useSelector((state) => { return state.chat })
  const userData = useSelector((state) => { return state.user })
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [singleChatName, setSingleChatName] = useState("")

  useEffect(() => {
    // Establish socket connection when component mounts
    socket.current = io("http://localhost:3000");
    socket.current.emit("setup", userData)
    socket.current.on("connected", () => {
      setSocketConnected(true)
    })

    // Cleanup function to close socket connection when component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchAllMessages();
    calculateName();
    selectedChatCompare.current = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket.current.on("message-recieved", (newMessage) => {
      if (!(selectedChatCompare.current) || selectedChatCompare.current._id != newMessage?.chat?._id) {
        console.log("yaha aa raha hu ma notification dena h")
      } else {
        console.log("yaha aa raha hu ma2")
        setMessages([...messages, newMessage])
      }
    })
  })


  const fetchAllMessages = async () => {
    if ((selectedChat._id == null)) {
      return
    }
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/message/${selectedChat._id}`, { withCredentials: true })
      setMessages(response?.data?.data)
      socket.current.emit("join room", selectedChat?._id)
    } catch (error) {
      console.log(error)
    }
  }



  const handleSend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/message/send", {
        content: inputMessage,
        chatid: selectedChat._id
      }, {
        withCredentials: true
      })
      socket.current.emit("new-message", response?.data?.data)
      setMessages([...messages, response?.data?.data])
      setInputMessage("")

    } catch (error) {
      console.log(error)
    }


  }
 
  const handleSendFile=async(data)=>{
    console.log(data)
    data.append("chatid",selectedChat._id)
    console.log(data)
    try {
      const response = await axios.post("http://localhost:3000/api/v1/message/sendfile",data, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials: true
      })
      socket.current.emit("new-message", response?.data?.data)
      setMessages([...messages, response?.data?.data])

    } catch (error) {
      console.log(error)
    }
  }
  const handleAdminChat = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/chat/singleChat/${id}`, { withCredentials: true })

      console.log(response)
      setFetchChatAgain((prev) => {
        return !prev
      })
    } catch (error) {
      console.log(error)
    }
  }

  const calculateName = () => {
    selectedChat.users.map((user) => {
    console.log(user._id)
      console.log(user._id, userData._id)
      if (user._id != userData._id) {
        setSingleChatName( user.username);
      }
    })
  }


  return (
    <Box height="90vh" display="flex" flexDirection="column">
      {
        !(selectedChat?._id == null) ? (
          <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between" >
            {selectedChat?.isGroupChat
              ? <ChatDrawer
                open={openDrawer}
                setOpenDrawer={setOpenDrawer}
                selectedChat={selectedChat}
                handleAdminChat={handleAdminChat}
              /> : ""}
            <Box flex="1" padding="10px">
              <Card
                cursor="pointer"
                onClick={() => { setOpenDrawer(!openDrawer) }}
                display="flex" flexDirection="row"
                justifyContent="space-between" borderRadius="0">
                <CardHeader display="flex" gap="1" >
                  <Box alignItems="center">
                    <Avatar></Avatar>
                  </Box>
                  <Box>
                    <Text fontSize="14px" fontWeight="bold">{selectedChat?.isGroupChat ?
                      selectedChat?.chatName : (
                        singleChatName
                      )
                    }</Text>
                    <Text fontSize="14px">Active</Text>
                  </Box>
                </CardHeader>
                <CardFooter>
                  call
                </CardFooter>
              </Card>
            </Box>
            <Box flex="8" overflowY="auto" padding="5px" 
              style={{ scrollbarWidth: "none"}}
            >
              <SingleMessage messages={messages} />
            </Box>
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" gap="10px" >
              <File handleSendFile={handleSendFile}/>
              <Input type='text' width="70%" placeholder='write your message'
                onChange={(e) => setInputMessage(e.target.value)} value={inputMessage}></Input>
              <Button width="20%" onClick={handleSend}>send</Button>
            </Box>
          </Box>
        ) : (
          <p>kisi ko nahi kiya</p>
        )
      }
    </Box>
  )
}

export default ChatBox