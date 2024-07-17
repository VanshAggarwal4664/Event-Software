import { Box, Button, Checkbox, Heading, Input, Select, SelectField, Spinner, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import './CreateEvent.css'
const CreateEvent = ({ handleClick,loader }) => {
  const [data, setData] = useState({
    hostName: "",
    eventName: "",
    startDate: "",
    endDate:"",
    time: "",
    eventImage: null,
    certified: false,
    eventType: false,
    description: "",
    longDescription: "",
    limit: 0
  });

  // updating certified value  according to event change
  const handleChange = (e) => {
    if (e.target.name === "certified") {
      setData({ ...data, certified: !(data.certified) })
    }
    
  // updating eventType value  according to event change
    else if (e.target.name === "eventType") {
      setData({ ...data, eventType: e.target.value })
    }
    
  // updating Event Image value  according to event change
    else if (e.target.name === "eventImage") {
      console.log(e.target.files[0])
      setData({ ...data, eventImage: e.target.files[0] })
    }
    // updating remaining value
    else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }


  return (
    <>
      <Box height="130vh" display="flex"  justifyContent="center" padding="30px 0px">
        <Box className="register-box" display="flex" width="40%" height="100%" justifyContent="center" padding="40px 20px">
          <Box width="90%" display="flex" flexDirection="column" gap="12px"  >
            <label >HostName
              <Input borderColor="black" backgroundColor="white" type="text" name="hostName" placeholder='Enter Host Name'
                onChange={handleChange} value={data.hostName} required
              />
            </label>
            <label>Event Name
              <Input borderColor="black" backgroundColor="white" type="text" name="eventName" placeholder='Enter Event Name'
                onChange={handleChange} value={data.eventName}
              />
            </label>
            <Box display="flex" gap="10px">
              <Box width="50%" padding="2px">
                <label>Choose Start Date
                  <Input  borderColor="black" backgroundColor="white" type="Date" name="startDate" placeholder='Enter your email'
                    onChange={handleChange} value={data.startDate} />
                </label>
              </Box>
              <Box width="50%" padding="2px">
                <label >Choose End Date
                  <Input borderColor="black" backgroundColor="white" type="Date" name="endDate" placeholder='Enter your email'
                    onChange={handleChange} value={data.endDate} />
                </label>
              </Box>
            </Box>

            <label >Set Time
              <Input borderColor="black" backgroundColor="white" type="time" name="time"
                onChange={handleChange} value={data.time}
              />
            </label>
            <label >Upload Event Image
              <Input padding="5px" borderColor="black" backgroundColor="white" type="file" name="eventImage"
                onChange={handleChange}
              />
            </label>
            <Checkbox onChange={handleChange} value={data.certified} borderColor="black" backgroundColor="white" name="certified">Certified</Checkbox>
            <label >Event Type
              <Select name="eventType" borderColor="black" backgroundColor="white"
                onChange={handleChange} value={data.eventType}
              >
                <option value={true}>Paid</option>
                <option value={false}>UnPaid</option>
              </Select>
            </label>
            <label>Description
              <Input borderColor="black" backgroundColor="white" type="text" name="description" placeholder='Enter Event Description'
                onChange={handleChange} value={data.description}
              />
            </label>
            <label>Long Description
              <Textarea borderColor="black" backgroundColor="white" name='longDescription' placeholder='Write Event Full Description'
                onChange={handleChange} value={data.longDescription}
              />
            </label>
            <label>Limit
              <Input borderColor="black" backgroundColor="white" name='limit' type="number"
                onChange={handleChange} value={data.limit}
              />
            </label>
            <Button onClick={() => handleClick(data)} _hover={{ backgroundColor: "white", color: "black", borderColor: "black", border: "1px solid black" }} 
            border="1px solid" backgroundColor="#4a3de5" color="white">
            {loader?<Spinner boxSize="30px"/>:"Submit"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CreateEvent