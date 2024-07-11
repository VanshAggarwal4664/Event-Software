import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, CheckIcon, DeleteIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';


const EventTable = ({ data }) => {
    const user = useSelector((state) => state.user);
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const normalizeDate = () => {
        const date = new Date()
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    const status = (start, end) => {
        const currentDate = normalizeDate()
        if (start > currentDate) {
            return "Upcoming"
        } else if (end < currentDate) {
            return "Ended"
        } else {
            return "Ongoing"
        }
    }


    const handleApproved = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/event/approved/${id}`, { withCredentials: true })
            alert(response?.data?.message)
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }

    }
    const handleRejected = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/event/rejected/${id}`, { withCredentials: true })
            alert(response?.data?.message)
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Box display="flex" width={"max-content"} p="8">
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>HostName</Th>
                            <Th>EventName</Th>
                            <Th >Start-Date</Th>
                            <Th >End-Date</Th>
                            <Th isNumeric>Limit</Th>
                            <Th>Event-Status</Th>
                            {user?.role=="SuperAdmin" || user?._id == data[0]?.createdBy ? <Th>Approval-Status</Th> : ""}
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.length > 0 ?
                                data?.map((single) => {
                                    {/* handleVisiblity(single) */ }
                                    return (
                                        <Tr key={single?._id} fontSize="14px">
                                            <Td>{single?.hostName}</Td>
                                            <Td>{single?.eventName}</Td>
                                            {/* <Td maxWidth="300px">
                                                {
                                                    <Text isTruncated whiteSpace="none" overflow="clip"  >
                                                        {single?.description}
                                                    </Text>
                                                }

                                            </Td> */}
                                            <Td>{single?.startDate?.split('T')[0]}</Td>
                                            <Td>{single?.endDate?.split('T')[0]}</Td>
                                            <Td>{single?.limit}</Td>
                                            <Td>
                                                <Badge p="1" colorScheme='green' borderRadius="6px">
                                                    {status(single?.startDate, single?.endDate)}
                                                </Badge>
                                            </Td>
                                            {user?.role=="SuperAdmin" || user?._id == data[0]?.createdBy? <Td>
                                                <Badge p="1" colorScheme={single?.status == "Approved" ? "green" : "red"} borderRadius="6px">
                                                    {single?.status}
                                                </Badge>
                                            </Td> : ""}
                                            <Td>
                                                <Menu>
                                                    <MenuButton>
                                                        <HamburgerIcon />
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem onClick={() => { navigate(`/event-details/${single._id}`, { state: single }) }}>
                                                            <CalendarIcon boxSize={"15px"} />
                                                            <span style={{ fontSize: "16px", fontWeight: "600", padding: "0px 4px" }}>View-Details</span>
                                                        </MenuItem>
                                                        {user?.role == "SuperAdmin" ? <MenuItem onClick={() => {
                                                            handleApproved(single._id)
                                                        }} > <CheckIcon boxSize={"15px"} color={"green"} />
                                                            <span style={{ fontSize: "16px", fontWeight: "600", padding: "0px 4px" }}>Approved</span>
                                                        </MenuItem> : ""}
                                                        {user?.role == "SuperAdmin" ?
                                                            <MenuItem onClick={() => {
                                                                handleRejected(single._id)
                                                            }}>
                                                                <DeleteIcon boxSize={"15px"} color={"rgb(200,0,0)"} />
                                                                <span style={{ fontSize: "16px", fontWeight: "600", padding: "0px 4px" }}>Rejected</span>
                                                            </MenuItem> : ""}
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                    )
                                }) :
                                <Tr>
                                    <Td>No Events</Td>
                                </Tr>
                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default EventTable