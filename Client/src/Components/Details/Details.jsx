import { Box, Button, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'


const Details = ({handleJoin}) => {
    const location=useLocation();
    const data= location.state
    // setEventData(data)

    // displaying the event details 
    return (
        <Box width="100%" height="max-content" display="flex" justifyContent="center" >
            <Box display="flex" backgroundColor="#bee1e6" width="70%" flexDirection="column" padding="20px">
                <Box width="100%" display="flex" padding="10px" justifyContent="space-between">
                    <Text fontSize="18px" fontWeight="Bold">Date:
                     <span style={{ fontWeight: "400" }}>{data.startDate?.split("T")[0] }</span> 
                     <span>  to </span> 
                     <span style={{ fontWeight: "400" }}>{data.endDate?.split("T")[0]}</span> 
                     </Text>
                    <Text fontSize="18px" fontWeight="Bold">Time: <span style={{ fontWeight: "400" }}>{data.time}</span> </Text>
                </Box>
                <Box display="flex">
                    <Box flex="1.2" padding="40px" >
                        <Text fontSize="25px" fontWeight="Bold">Event Name: <span style={{ fontWeight: "400" }}>{data.eventName}</span> </Text>
                        <Text fontSize="25px" fontWeight="Bold">Host Name: <span style={{ fontWeight: "400" }}>{data.hostName}</span> </Text>
                        <Box width="90%" padding="30px 0px" display="flex" flexDirection="column" gap="10px">
                            <Text textAlign="left" fontSize="18px" fontWeight="Bold">Certification: <span style={{ fontWeight: "400" }}>{data.certified?"Certified":"Uncertified"}</span> </Text>
                            <Text textAlign="left" fontSize="18px" fontWeight="Bold">Event Type: <span style={{ fontWeight: "400" }}>{data.eventType?"Paid":"UnPaid"}</span> </Text>
                            <Text textAlign="left" fontSize="18px" fontWeight="Bold">Description: <span style={{ fontWeight: "400" }}>{data.description}</span> </Text>
                            <Text  textAlign="left" fontSize="18px" fontWeight="Bold">Long Description: <span style={{ fontWeight: "400" }}>{data.longDescription}</span> </Text>
                            <Text textAlign="left" fontSize="18px" fontWeight="Bold">Limit: <span style={{ fontWeight: "400" }}>{data.limit}</span> </Text>
                        </Box>
                        <Button onClick={() => { handleJoin(data?.eventChatGroup, data?._id) }} backgroundColor="black" color="white">Join Now</Button>
                    </Box>
                    <Box flex="0.8" padding="40px" display="flex" justifyContent="center" alignItems="center">
                       <Image src={data?.eventImage}  width="100%" height="70%" objectFit="cover" border="2px unset black" borderRadius="12px"/>
                    </Box>

                </Box>

            </Box>

        </Box>
    )
}

export default Details