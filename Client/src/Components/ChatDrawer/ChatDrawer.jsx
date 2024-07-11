import React from 'react'
import {ChatIcon, CloseIcon} from '@chakra-ui/icons'

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
} from '@chakra-ui/react'

const ChatDrawer = ({ open, setOpenDrawer, selectedChat,handleAdminChat }) => {
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
                            </Center>
                        </DrawerHeader>
                        <DrawerBody>
                            {
                                selectedChat ? (
                                    selectedChat?.users.map((user) => {
                                        return (
                                            <Box key={user._id}>
                                            <Card  height="max-content">
                                                <CardHeader height="max-content" display="flex" justifyContent="space-between">
                                                    <Box>
                                                        <Text>{user?.username}</Text>
                                                        {selectedChat?.groupAdmin?
                                                        <Text fontSize="12">{selectedChat?.groupAdmin?._id==user._id?"Admin":"member"}</Text>
                                                        :<></>}
                                                    </Box>
                                                    <Box>
                                                        {
                                                            (selectedChat?.groupAdmin && selectedChat?.groupAdmin._id==user._id)? (
                                                          <Box>
                                                            <ChatIcon cursor="pointer" onClick={()=>{handleAdminChat(selectedChat?.groupAdmin._id)}}/>
                                                          </Box>
                                                        ):<Box>

                                                        </Box>}
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