import { Badge, Box, Button, Card, CardHeader, Center, Heading, Image, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const EventCard = ({ data, handleJoin }) => {
  const navigate = useNavigate()
  const handleDetail = () => {
    navigate(`/event-details/${data._id}`, { state: data })
  }
  const dayCalculator = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return ((end - start) / (24 * 60 * 60 * 1000));
  }
  return (
    <Card height="45vh" borderRadius="0px" border="3px dashed #c3c3c3" borderStyle="dashed" paddingBottom="20px">
      <CardHeader height="100%">
        <Box display="flex" justifyContent="space-between">
          <Text>{data?.certified ? "Certified" : "Uncertified"}</Text>
          <Text>{data?.eventType ? "Paid" : "UnPaid"}</Text>
        </Box>
        <Image borderRadius="10px" border="1px inset grey" src={data.eventImage} width="100%" height="40%" objectFit="cover" alt="event image" />
        <Box display="flex" justifyContent="space-between">
          <Text>StartDate: {data?.startDate?.split('T')[0]} </Text>
          <Text>Time: {data.time}</Text>
        </Box>
        <Center padding="4px" fontSize="18px" fontWeight="Bold">
          {data.eventName}
          <Badge padding="2px" colorScheme='green'>
            {dayCalculator(data?.startDate, data?.endDate)}Day Event
          </Badge>
        </Center>
        <Heading fontSize="16px" >{data.hostName}</Heading>
        <Text width="300px" overflow="clip" textOverflow="ellipsis" whiteSpace="nowrap" fontSize="14px">{data.description}</Text>
        <Box height="100%" padding="20px 0px" display="flex" justifyContent="space-between">
          <Button onClick={handleDetail} backgroundColor="black" color="white">View Details</Button>
          <Button onClick={() => { handleJoin(data?.eventChatGroup, data?._id) }} backgroundColor="black" color="white">Join Now</Button>
        </Box>
      </CardHeader>
    </Card>
  )
}

export default EventCard