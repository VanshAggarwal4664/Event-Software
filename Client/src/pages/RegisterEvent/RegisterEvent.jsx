import React, { useEffect, useState } from 'react'
import CreateEvent from '../../Components/CreateEvent/CreateEvent'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import { useToast } from '@chakra-ui/react'


const RegisterEvent = () => {
    const toast= useToast();
    const navigate= useNavigate()
    const [show,setShow]=useState(true)
    const[loader,setLoader]=useState(false)
    const user= useSelector((state)=> {return state.user})

    useEffect(() => {
        if(user.username==="" && user.email===""){
            setShow(false)
           
          }
    }, [user])

    useEffect(() => {
        if (!show) {
            alert('Please Login');
            navigate('/user/login');
        }
    }, [show, navigate]);
    
   
    const handleClick=async(data)=>{
        setLoader(true)
        try {
            const response = await axios.post("http://localhost:3000/api/v1/event/register",data,{
                headers:{
                  "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            }) 
            setLoader(false)
            toast({
                title: 'Event Created',
                description: "Event Created Successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              setTimeout(() => {
                navigate("/dashboard/created-events")
              }, 2000);
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
       {
        (show)?
        <>
        <Header/>
        <CreateEvent
            handleClick={handleClick}
            loader={loader}
        />
        </>:(
         <p>Please login</p>
        )
       } 
    </>
  )
}

export default RegisterEvent