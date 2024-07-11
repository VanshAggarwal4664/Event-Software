import React, { useEffect } from 'react'
import { BrowserRouter , Routes, Route, Router } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import AdminSignup from './pages/Signup-page/AdminSignup.jsx';
import SuperAdminSignup from './pages/Signup-page/SuperAdminSignup.jsx';
import UserSignup from './pages/Signup-page/UserSignup.jsx';
import UserSignin from './pages/Signin-page/UserSignin.jsx';
import Home from './pages/Home/Home.jsx';
import RegisterEvent from './pages/RegisterEvent/RegisterEvent.jsx';
// import Event from './pages/EventPage/Event.jsx';
import EventDetails from './pages/EventDetails/EventDetails.jsx';
import Chat from './pages/ChatPage/Chat.jsx';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './ReduxFeatures/User/UserSlice.js';
import OngoingEvent from './pages/OngoingEvents/OngoingEvent.jsx';
import UpcomingEvents from './pages/UpcomingEvents/UpcomingEvents.jsx';
import PastEvents from './pages/PastEvents/PastEvents.jsx';
import EventHistory from './pages/EventHistory/EventHistory.jsx';
import CreatedEvents from './pages/CreatedEvents/CreatedEvents.jsx';
import AllEvents from './pages/AllEvents/AllEvents.jsx';
import Certificate from './pages/SendCertificate/Certificate.jsx';
import TempCertificate from './Templates/TempCertificate.jsx';
import EventApproval from './pages/EventApproval/EventApproval.jsx';
import RecievedCertificate from './pages/RecievedCertificate/RecievedCertificate.jsx';

const App = () => {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
        <Route path='/admin/signup' element={<AdminSignup/>}></Route>
        <Route path ='/superadmin/signup' element={<SuperAdminSignup/>}></Route>
        <Route path ='/user/signup' element={<UserSignup/>}></Route>
        <Route path='/user/login' element={<UserSignin/>}></Route>
        <Route path='all-events' element={<AllEvents/>}></Route>
        <Route path='/create-event' element={<RegisterEvent/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}>
          {/* <Route path='view-events' element={<Event/>}></Route> */}
          <Route path='chat' element={<Chat/>}></Route>
         
          <Route path='ongoing-events' element={<OngoingEvent/>}></Route>
          <Route path='approval-events' element={<EventApproval/>}></Route>
          <Route path='upcoming-events' element={<UpcomingEvents/>}></Route>
          <Route path='past-events' element={<PastEvents/>}></Route>
          <Route path='event-history' element={<EventHistory/>}></Route>
          <Route path='created-events' element={<CreatedEvents/>}></Route>
          <Route path='send-certificates' element={<Certificate/>}></Route>
          <Route path='recieved-certificates' element={<RecievedCertificate/>}></Route>
        </Route>
        <Route path='/event-details/:id' element={<EventDetails/>}></Route>
        <Route path='/view-certificate/:id' element={<TempCertificate/>}></Route>
      </Routes>
    </BrowserRouter>

    
    
  )
}

export default App
