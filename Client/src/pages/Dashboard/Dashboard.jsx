import React from 'react'
import { useSelector } from 'react-redux'
import Panel from '../../Components/DashboardPanel/Panel'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'


const Dashboard = () => {
   const user= useSelector((state)=> state.user);

  return (
    user._id!="" ?<Box width="100%" display="flex">
    <Box width="20%">
    <Panel/>
    </Box>
    <Box width="80%">
    <Outlet/>
    </Box>
  </Box>:"UnAuthorized Request"
  )
}

export default Dashboard

























// import React, { useEffect, useState } from 'react'
// import './Dashboard.css'
// import { NavLink, Outlet } from 'react-router-dom'
// import axios from 'axios'
// const Dashboard = () => {
//   const [userdata, setUserdata]= useState()
//  useEffect(() => {
//    const getUser= async()=>{
//    try {
//      const response = await axios.get("http://localhost:3000/api/auth/getUser",{
//        withCredentials:true
//      })
//      console.log(response.data)
//      setUserdata(response.data.data)
    
 
//    } catch (error) {
//     console.log(error)
//    }
//    }


//    getUser()
//    ;

  
//  },[])
 
//   return (
//     <>
//     {userdata?(<div className='dashboard'>
//             <div className='dashboard-navigation'>
//             <h1 style={{textAlign:"center"}}> Hi {userdata.name}</h1>
//             <ul className='menu-items'>
//                 <li className='menu-item'>
//                 <NavLink to="event-register"  style={{textDecoration:"none"}} className={({isActive})=>{return `menu-item ${isActive?"active":""}`}}>
//                 Event Registration
//                 </NavLink>
//                </li>
//                 <li  >
//                 <NavLink to="view-events"  style={{textDecoration:"none"}} className={({isActive})=>{return `menu-item ${isActive?"active":""}`}}>
//                 View Events
//                 </NavLink>
//                </li>
//             </ul>
//             </div>
//             <div className='dashboard-content'>
//                <Outlet/>
//             </div>
//         </div>):(
//           <p>Unauthorized Request</p>
//         )}
        
//     </>
//   )
// }

// export default Dashboard