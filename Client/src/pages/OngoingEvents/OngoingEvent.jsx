import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventBox from '../../Components/EventBox/EventBox.jsx';
const OngoingEvent = () => {
  // maintaining two data one is original and filter to perform filter function and for comeback to original state by using originalData state
  const [originalData,setOriginalData]= useState([]);
  const [filterData,setFilterData]=useState([]);
  const url= "http://localhost:3000/api/v1/event/ongoing-events"

  // fetching all the events which are ongoing
  useEffect(() => {
    const fetchEvents= async()=>{
      try {
        const response=  await axios.get(url,{
            withCredentials:true
        })
        setOriginalData(response?.data?.data?.events)
        setFilterData(response?.data?.data?.events)
      } catch (error) {
       console.log(error)

      }
    }
    fetchEvents()
  
  }, [])


  return (
    <EventBox
    filterData={filterData}
    setFilterData={setFilterData}
    originalData={originalData}
    />
  )
}

export default OngoingEvent