import React, { useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Text,
    Badge,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Checkbox,
    cookieStorageManager,
} from '@chakra-ui/react'

const UserList = ({ user ,usersMap,index}) => {
    // this component simply display the user list and used in send certificate modal in which i have to select user whom i want to send  certificate
    return (
        <>
            <Box display="flex" p="2" >
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr >
                                <Th fontSize="18px">Username</Th>
                                <Th fontSize="18px">Email</Th>
                                <Th fontSize="20px">Mobile Number</Th>
                                <Th fontSize="18px">Select</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                <Tr fontSize="18px">
                                    <Td>{user?.username}</Td>
                                    <Td>{user?.email}</Td>
                                    <Td>{user?.mobileNumber}</Td>
                                    <Td>{
                                        <Checkbox onChange={(e)=>{
                                            if(e.target.checked){
                                                usersMap[index]={id:user._id, selected:true};
                                               console.log(usersMap)
                                            }else{
                                                usersMap[index]={id:user._id, selected:false};
                                                console.log(usersMap)
                                            }
                                        }} />
                                    }</Td>
                                </Tr>
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default UserList