import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import CertificateModal from '../CertificateModal/CertificateModal'
import certificateTemp from '../../../public/certificateTemp.jpeg'
import { useNavigate } from 'react-router-dom'
import SendCertificate from '../SendCertificate/SendCertificate'

const CertificateCard = ({event,download}) => {
    const navigate= useNavigate();
    console.log(event?.certificate)
    const [createModal,setCreateModal]=useState(false)
    const [sendModal,setSendModal]=useState(false)
    return (
        <Box width="100%" display="flex" justifyContent="center"  >
            <Box width="100%" display="flex" justifyContent="space-between" padding="20px">
                <Box width="40%" display="flex" justifyContent="center" alignItems="center" cursor="pointer" onClick={()=>{
                    if(event?.certificate){
                        navigate(`/view-certificate/${event._id}`)
                    }
                  return
                }}>
                   { event?.certificate?<Image border="4px solid black" borderRadius="12px"
                        src={(event?.certificate)?certificateTemp:""} 
                        width="80%"
                        height="250px"
                        objectFit="cover"
                        objectPosition="center"
                        textAlign="center"
                        alt='No Certificate Created' />:<Heading fontSize={"25px"}>No certificate</Heading>}
                </Box>
                <Box width="40%" gap="10px" display="flex" flexDirection="column" justifyContent="center" >
                    <Text textAlign="right"> <span  style={{fontWeight:"bold"}}>Start Date:</span>  {event?.startDate.split('T')[0]}</Text>
                    <Heading textAlign="left">{event?.eventName}</Heading>

                    <Text textAlign="left">{event?.hostName}</Text>
                    <Text isTruncated textAlign="left">{event?.description}</Text>

                   { (download)?<Box display="flex" gap="20px">
                        <Button width="100%" color={"white"} backgroundColor={"black"} 
                        onClick={()=>{
                            console.log("i am running",!(createModal))
                            setCreateModal(!(createModal))}}
                            >
                            Create Certificate
                            </Button>
                        {(createModal)?<CertificateModal
                            setCreateModal={setCreateModal}
                            id={event._id}
                        />:""}
                        <Button width="100%" color={"white"} backgroundColor={"black"}
                        onClick={()=>setSendModal(!sendModal)}
                        > 
                        Send Certificate

                        </Button>
                        {
                            sendModal?<SendCertificate setSendModal={setSendModal} id={event._id}/>:""
                        }
                    </Box>:<Box width="100%">
                    <a>
                      <Button  width="100%" color={"white"} backgroundColor={"black"}>Download Certificate</Button>
                    </a>   
                    </Box>}


                </Box>
            </Box>
        </Box>
    )
}

export default CertificateCard