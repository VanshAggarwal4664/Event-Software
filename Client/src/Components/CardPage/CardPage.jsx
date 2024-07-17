import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import EventCard from '../EventCard/EventCard'
import Paginate from '../Paginate/Paginate'

const CardPage = ({data,handleJoin}) => {
  // count how many cards should be visible on screen
  const cardsPerPage= 8

  const [itemOffset, setItemOffset] = useState(0); // Initial offset is set to 0

  const endOffset = itemOffset + cardsPerPage; // Calculate the end offset
  const currentData = data.slice(itemOffset, endOffset); // Slice the items array to get the current items
  const pageCount = Math.ceil(data.length / cardsPerPage); // Calculate the total number of pages

  const handlePageChange = (event) => {
    const newOffset = (event.selected * cardsPerPage) % data.length; // Calculate the new offset based on the selected page
    setItemOffset(newOffset); // Update the offset state
  };

  return (
    <Box>
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridTemplateRows="repeat(2,auto)" gridAutoFlow="row" padding="20px"  gridGap="20px">
    {currentData?.length>0?
       currentData?.map((single)=>{
        return (
        <Box key={single._id}  padding="5px">
            <EventCard 
            data={single}
            handleJoin={handleJoin}
            />
        </Box>
        )
       }) :<Box>
       <Heading fontSize="20" color="black">no data found</Heading>
       </Box>
       
       
    }
    </Box>
    <Box mt="20px" display="flex" justifyContent="flex-end" padding="10px">
    {
       pageCount>1 && (
          <Paginate
            pageCount={pageCount}
            handlePageChange={handlePageChange}
            currentPage={itemOffset}
          />
       )
    }
    </Box>
    </Box>
  )
}

export default CardPage