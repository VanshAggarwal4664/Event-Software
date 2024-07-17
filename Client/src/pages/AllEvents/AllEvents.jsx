import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Event from '../../Components/EventPage/Event';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AllEvents = () => {
  const user= useSelector((state)=>state.user)
  const navigate= useNavigate();
  // manage the event data in two different state one is original and other one is filter because we perform all the filter function on the filter data only and we want to come back to original data we used originalData 
    const [originalData,setOriginalData]= useState([]);
    const [filterData,setFilterData]=useState([]);
    const url="http://localhost:3000/api/v1/event/all-events"

// fetching all the events which are approved
      useEffect(() => {
        // fetching all the events
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

      // handle the user joining functionality and redirect to login page
      const handleJoin=async(id,eventId)=>{
        if(user.role == ""){
          alert("please login to join event")
         navigate("/user/login")
         return
        }
        try {
          const response = await axios.post("http://localhost:3000/api/v1/chat/create",{id,eventId},{withCredentials:true})
          console.log(response)
          navigate("/dashboard/chat");
        } catch (error) {
          alert("something went wrong")
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