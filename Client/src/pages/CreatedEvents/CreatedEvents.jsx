import React, { useEffect, useState } from 'react'
import EventBox from '../../Components/EventBox/EventBox'
import axios from 'axios';
const CreatedEvents = () => {
   const [originalData,setOriginalData]= useState([]);
  const [filterData,setFilterData]=useState([]);
  // maintaining two data one is original and filter to perform filter function and for comeback to original state by using originalData state
    const url="http://localhost:3000/api/v1/event/created-events"

// fetching all the events which is create by logged in user
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

export default CreatedEvents 