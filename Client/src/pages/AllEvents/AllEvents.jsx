import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Event from '../../Components/EventPage/Event';
const AllEvents = () => {
    const [originalData,setOriginalData]= useState([]);
    const [filterData,setFilterData]=useState([]);
    const url="http://localhost:3000/api/v1/event/all-events"

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
      const handleJoin=async(id,eventId)=>{
        try {
          const response = await axios.post("http://localhost:3000/api/v1/chat/create",{id,eventId},{withCredentials:true})
          console.log(response)
        } catch (error) {
          console.log(error)
        }
     }
  
    return (
      <Event
      filterData={filterData}
      setFilterData={setFilterData}
      originalData={originalData}
      handleJoin={handleJoin}
      />
    )
}

export default AllEvents