import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SingleChat from '../SingleChat/SingleChat'


const ChatPanel = ({ originalData,setFilterData,filterData}) => {
  const [searchData, setSearchData] = useState("");
  const [searchActive, setSearchActive] = useState(true)
 // simple search function to search between the data
  const handleSearch=()=>{
    if (searchActive) {
      setSearchActive(false)
      const searchValue = searchData.toLowerCase();

      const filterChats = originalData.filter((chat) => {
          const chatname = (chat?.chatName).toLowerCase().split(' ')
          const searchname = searchValue.split(' ')

          return searchname.every((name) => {

              return chatname.some((cname) => {
                  return cname.startsWith(name)
              })
          })
      })

      setFilterData(filterChats)
  } else {
      setSearchData("")
      setFilterData(originalData)
      setSearchActive(true)
  }
  }


  // displaying all the chats in which logged in user is joined

  return (
    <Box width="100%" height="100%" padding="20px" display="flex" flexDirection="column" gap="10px"  borderRadius="12px">
       <Box>
       <Box flex="0.8" padding="30px">
                <InputGroup>
                    <Input
                        width="90%" type='text' name="search" placeholder='Search Chat...' 
                          value={searchData} onChange={(e)=>{setSearchData(e.target.value) }}
                        />
                  <InputRightAddon cursor="pointer" onClick={handleSearch}>{searchActive ? <SearchIcon boxSize="20px" /> : <CloseIcon />}</InputRightAddon>
                </InputGroup>
            </Box>
       </Box>
       <Box display="flex" flexDirection="column" gap="2"> 
       {
       filterData.map((chat)=>{
        return (
        <Box  key={chat._id}>
            <SingleChat
            data={chat}
            />
        </Box>
        )
       }) 
    }
       </Box>
    </Box>
  )
}

export default ChatPanel