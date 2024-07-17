import { Avatar, Box, Divider, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Panel.css'
import { useSelector } from 'react-redux'

const Panel = () => {
   const user = useSelector((state) => state.user)

   // displaying the side panel of the dashboard

  return (
    <>
      <Box width="100%" height={"max-content"} padding="20px" >
        <Box boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" borderRadius="25px" display="flex" flexDirection="column" alignItems="center" height="100%" padding="30px 10px">
          <Box display="flex" flexDirection="column" gap="20px" justifyContent="left">
            <Box padding="20px 0px" display="flex" gap="10px" alignItems="center">
              <Avatar>

              </Avatar>
              <Box >
                <Text color="#a9a9a9">{user?.email}</Text>
                <Heading fontSize="20px">{user?.username}</Heading>

              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap="20px">
              <Divider></Divider>
              <Divider></Divider>
            </Box>

            <Box padding="20px 0px" display="flex" flexDirection="column" gap="10px" justifyContent="left">
              <Text color="#a9a9a9">Main Menu</Text>
              {/* some functionalities only for the super admin */}
              {(user?.role != "SuperAdmin") ?
                <UnorderedList display="flex" flexDirection="column" gap="18px" listStyleType="none" fontSize="16px">
                  <ListItem width="100%">
                    <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/">Home</NavLink>
                  </ListItem>
                  <ListItem width="100%">
                    <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/create-event">Create Event</NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/event-history">Event History</NavLink>
                  </ListItem>
                  <ListItem color="#a9a9a9">Certificate
                    <UnorderedList listStyleType="none" display="flex" flexDirection="column">
                      <ListItem p="1">
                        <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/send-certificates">
                          Send Certificate
                        </NavLink>
                      </ListItem>
                      <ListItem p="1">
                        <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/recieved-certificates">
                          Recieved Certificate
                        </NavLink>
                      </ListItem>
                    </UnorderedList>

                  </ListItem>
                  <ListItem>
                    <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/chat">ChatBot</NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/payment">Payment</NavLink>
                  </ListItem>
                  <ListItem width="180px" color="#a9a9a9" >
                  <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/all-events">
                           Events
                        </NavLink>
                    <UnorderedList listStyleType="none" display="flex" flexDirection="column">
                      <ListItem p="1">
                        <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/ongoing-events">
                          Ongoing Events
                        </NavLink>
                      </ListItem>
                      <ListItem p="1">
                        <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/upcoming-events">
                          Upcoming Events
                        </NavLink>
                      </ListItem>
                      <ListItem p="1">
                        <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/past-events">
                          Past Events
                        </NavLink>
                      </ListItem>
              
                        <ListItem p="1">
                          <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/created-events">
                            Created Events
                          </NavLink>
                        </ListItem>
                     

                    </UnorderedList>
                  </ListItem>
                </UnorderedList> :
                <UnorderedList display="flex" flexDirection="column" gap="18px" listStyleType="none" fontSize="16px">
                  <ListItem width="100%">
                    <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/">Home</NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink className={({ isActive }) => { return `list-item ${isActive ? "list-active" : ""}` }} to="/dashboard/approval-events">Approval Events</NavLink>
                  </ListItem>
                </UnorderedList>}


            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Panel