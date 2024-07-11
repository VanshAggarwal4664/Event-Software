
import { Box, Button, IconButton, Input, InputGroup, InputRightAddon, Radio, Select, Text } from '@chakra-ui/react'
import React, { useDebugValue, useState } from 'react'
import { ArrowUpDownIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'
import { useEffect } from 'react';

const EventFilter = ({ originalData, setFilterData }) => {

    const [searchData, setSearchData] = useState("");
    const [searchActive, setSearchActive] = useState(true)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [certified, setCertified] = useState("")
    const [type, setType] = useState("");

    const normalizeDate = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      };

    const applyFilters = () => {
        let filteredEvents = originalData;
        if (searchData) {
            setSearchActive(false)
            const searchValue = searchData.toLowerCase();
            filteredEvents = originalData.filter((event) => {
                const eventname = (event?.eventName).toLowerCase().split(' ')
                const searchname = searchValue.split(' ')

                return searchname.every((name) => {

                    return eventname.some((ename) => {
                        return ename.startsWith(name)
                    })
                })
            })
        }

        if (certified !== "") {
            filteredEvents = filteredEvents.filter(event => {
                return (certified === "true" ? event?.certified : !event?.certified);
            });
        }
        if (type !== "") {
            filteredEvents = filteredEvents.filter(event => {
                return (type === "true" ? event?.eventType : !event?.eventType);
            });
        }
        if (startDate && endDate) {
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
    useEffect(() => {
        applyFilters()
    }, [certified,searchData,type,startDate,endDate])

    const handleSearch = () => {
        if (!searchActive) {
            setSearchData("");
        }
        setSearchActive(true)
        setFilterData(originalData)
    }
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