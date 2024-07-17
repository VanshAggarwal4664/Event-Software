import React, { useEffect, useState } from 'react'
import {ChatIcon, CloseIcon, ExternalLinkIcon, NotAllowedIcon, ViewIcon} from '@chakra-ui/icons'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Center,
    Avatar,
    Text,
    Card,
    CardHeader,
    Box,
    Button,
    Spacer,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ChatDrawer = ({ open, setOpenDrawer, selectedChat,handleAdminChat }) => {
    const user= useSelector((state)=>state.user);
    const navigate= useNavigate();
    const [block,setBlock]= useState(false)
    const [event,setEvent]= useState();

// this useeffect checking the user who is logged in and the event host or admin 
// so that it can show block button on the remaining user
    useEffect(() => {
      if(selectedChat?.groupAdmin?._id===user._id){
        setBlock(true)
      }
      fetchEventDetails();
    }, [])
// this function run to fetch event details for that particular chat
    const fetchEventDetails= async()=>{
        try {
            const response= await axios.get(`http://localhost:3000/api/v1/event/getsingle-event/${selectedChat?._id}`,{withCredentials:true})
            setEvent(response?.data?.data);
        
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Drawer isOpen={open} >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerBody>
                        <CloseIcon cursor="pointer" onClick={() => { setOpenDrawer(!open) }} />

                        <DrawerHeader>
                            <Center display="flex" flexDirection="column">
                                <Avatar boxSize="90px" />
                                <Text fontSize="20px" textAlign="center">{selectedChat?.chatName}</Text>
                                <Box display="flex" gap={"10px"} padding={"10px"}>
                                        <Button onClick={()=>{
                                            navigate(`/event-details/${event?._id}`, {state:event})
                                        }}><ViewIcon/> Details</Button>
                                    {block?<Button onClick={()=>{
                                        navigate('/dashboard/send-certificates')
                                    }}><ExternalLinkIcon/>Certificate</Button>:""}
                                </Box>
                            </Center>
                        </DrawerHeader>
                        <DrawerBody>
                            {
                                selectedChat ? (
                                    selectedChat?.users.map((user) => {
                                        return (
                                            <Box key={user._id}>
                                            <Card  height="max-content" m={2}>
                                                <CardHeader height="max-content" display="flex" justifyContent="space-between">
                                                    <Box>
                                                        <Text>{user?.username}</Text>
                                                        {selectedChat?.groupAdmin?
                                                        <Text fontSize="12">{selectedChat?.groupAdmin?._id==user._id?"Admin":"member"}</Text>
                                                        :<></>}
                                                    </Box>
                                                    <Box display="flex" gap="10px">
                                                        {
                                                        (selectedChat?.groupAdmin && selectedChat?.groupAdmin._id==user._id)? (
                                                          <Box>
                                                            <ChatIcon cursor="pointer" onClick={()=>{handleAdminChat(selectedChat?.groupAdmin._id)}}/>
                                                          </Box>
                                                        ):<Box>
                                                        { block?<Box>
                                                            <NotAllowedIcon boxSize={"20px"} cursor="pointer" onClick={()=>{handleAdminChat(selectedChat?.groupAdmin._id)}}/>
                                                          </Box>:""}   
                                                        </Box>
                                                        }
                                                
                                                    </Box>
                                                </CardHeader>
                                            </Card>
                                            </Box>
                                        )
                                    })
                                ) : (
                                    <p>no members found</p>
                                )
                            }

                        </DrawerBody>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}

export default ChatDrawer