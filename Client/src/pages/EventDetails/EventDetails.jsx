import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from '../../Components/Header/Header'
import Details from '../../Components/Details/Details'

const EventDetails = () => {
  return (
    <Box width="100%" height="100vh">
        <Header/>
        <Details/>
    </Box>
  )
}

export default EventDetails