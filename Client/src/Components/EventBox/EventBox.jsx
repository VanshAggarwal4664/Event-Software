import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import EventFilter from '../EventFilter/EventFilter.jsx'
import EventTable from '../EventTable/EventTable.jsx';

const EventBox = ({ originalData, setFilterData, filterData }) => {
// displaying events filter and Event Table showing all the events in the list format
  return (
    <Box width="100%" height="140vh">
      <Box height="12%">
        <EventFilter
          setFilterData={setFilterData}
          originalData={originalData}
        />
      </Box>
      <Box height="88%" width="max-content">
        <EventTable
          data={filterData}
        />
      </Box>

    </Box>

  )
}

export default EventBox