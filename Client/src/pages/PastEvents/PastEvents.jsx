import React, { useEffect, useState } from 'react'
import EventBox from '../../Components/EventBox/EventBox'
import axios from 'axios';
const PastEvents = () => {
   const [originalData,setOriginalData]= useState([]);
  const [filterData,setFilterData]=useState([]);
    const url="http://localhost:3000/api/v1/event/past-events"


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

export default PastEvents