
import { Box, Button, IconButton, Input, InputGroup, InputRightAddon, Radio, Select, Text } from '@chakra-ui/react'
import React, { useDebugValue, useState } from 'react'
import { ArrowUpDownIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { useEffect } from 'react';

const EventFilter = ({ originalData, setFilterData }) => {
    // store the search value
    const [searchData, setSearchData] = useState("");
    // checking search is active or not
    const [searchActive, setSearchActive] = useState(true)
    // set the start date for the filter
    const [startDate, setStartDate] = useState("")
    // set the end date for the filter
    const [endDate, setEndDate] = useState("")
    // set the certified for the filter
    const [certified, setCertified] = useState("")
    // set the type for the filter
    const [type, setType] = useState("");

    // normalize the date
    const normalizeDate = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      };

    const applyFilters = () => {
        let filteredEvents = originalData;
        // checking search data is present or not,if its present 
        if (searchData) {
            setSearchActive(false)
            //making the search value to lower case
            const searchValue = searchData.toLowerCase();
            //filter events according to logic
            filteredEvents = originalData.filter((event) => {
                // eventname to lowercase and then splitting the event name into single letter
                const eventname = (event?.eventName).toLowerCase().split(' ')
                // splitting the search value
                const searchname = searchValue.split(' ')
              
                return searchname.every((name) => {

                    return eventname.some((ename) => {
                        return ename.startsWith(name)
                    })
                })
            })
        }

        if (certified !== "") {
            // filter events accordig to value of certified
            filteredEvents = filteredEvents.filter(event => {
                return (certified === "true" ? event?.certified : !event?.certified);
            });
        }
        if (type !== "") {
             // filter events accordig to value of type of event (paid and unpaid)
            filteredEvents = filteredEvents.filter(event => {
                return (type === "true" ? event?.eventType : !event?.eventType);
            });
        }
        if (startDate && endDate) {
            // filter the event whose start date equal or geater than typday
            const start = new Date(startDate);
            const end = new Date(endDate);
            filteredEvents = filteredEvents.filter(event => {
                const eventStartDate = normalizeDate(new Date(event?.startDate));
                const eventEndDate = normalizeDate(new Date(event?.endDate));
                return start >= eventStartDate && end <= eventEndDate;
            });
        }
        setFilterData(filteredEvents);
    }

    // if any of the value changes useEffect calls the applyFilters function
    useEffect(() => {
        applyFilters()
    }, [certified,searchData,type,startDate,endDate])

    // toggle between the icons of search and cross
    const handleSearch = () => {
        if (!searchActive) {
            setSearchData("");
        }
        setSearchActive(true)
        setFilterData(originalData)
    }

    // clear all the filter trigger by clear button
    const ClearFilter = () => {
      setCertified("");
      setType("")
      setStartDate("")
      setEndDate("")
      setSearchActive(true)
      setSearchData("")
      setFilterData(originalData)
    }

    return (
        <Box display="flex" justifyContent="space-evenly" padding="20px 0px">
            <Box flex="0.8" padding="30px">
                <InputGroup>
                    <Input
                        onChange={(e) => {
                            setSearchData(e.target.value);
                            applyFilters()
                        }}
                        value={searchData}
                        width="90%" type='text' name="search" placeholder='Search event...' />
                    <InputRightAddon cursor="pointer" onClick={handleSearch}>{searchActive ? <SearchIcon boxSize="20px" /> : <CloseIcon />}</InputRightAddon>
                </InputGroup>
            </Box>
            <Box flex="0.5" padding="30px">
                <Select value={certified} backgroundColor="#f6f6f6" onChange={(e) => { setCertified(e?.target?.value) }}
                    placeholder='Certified'>
                    <option value="true" >Yes</option>
                    <option value="false" >No</option>
                </Select>
            </Box>
            <Box flex="0.5" padding="30px">
                <Select backgroundColor="#f6f6f6" onChange={(e)=>{setType(e.target.value)}} placeholder='Courses'>
                    <option value={false}>Free</option>
                    <option value={true}>Paid</option>
                </Select>
            </Box>
            <Box display="flex" flex="2" padding="30px" gap="10px">
                <Input
                    onChange={(e) => { setStartDate(e.target.value) }} value={startDate}
                    backgroundColor="#f6f6f6" width="30%" type="date"
                />
                <Input
                    onChange={(e) => { setEndDate(e.target.value) }} value={endDate}
                    backgroundColor="#f6f6f6" width="30%" type="date"
                />
                <Button onClick={ClearFilter} variant="outline" width="25%">Clear</Button>
            </Box>

        </Box>
    )
}

export default EventFilter