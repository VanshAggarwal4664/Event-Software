import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Input,
    useToast,
    Spinner,
  } from '@chakra-ui/react'
import axios from 'axios';

const CertificateModal = ({setCreateModal,id}) => {
  const [loader,setLoader]=useState(false)
    const toast=useToast();
    const [data,setData]=useState({
        companyName:"",
        companyLogo:null,
        event:id
    })
    const handleCreation=()=>{
      setLoader(true)
        try {
            const response= axios.post("http://localhost:3000/api/v1/certificate/create-certificate",data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })

            setLoader(false)
            toast({
                title: 'Certificate Created',
                description: "Certificate Created Successfully for the event",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
              setCreateModal((prev)=> !prev)
              window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
      
    }
    console.log("i am running")
  return (
    <Modal isOpen isCentered>
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>Certificate Form</ModalHeader>
      <ModalBody>
      <label>Compay Name</label>
      <Input name="companyName" type='text' placeholder='Enter company name' border={"1px solid grey"} borderRadius="4px" padding="5px" m={2}
        value={data.companyName}
        onChange={(e)=>setData({...data,companyName:e.target.value})}
      />
      <label>Company Logo</label>
      <Input name="companyName" type='file' placeholder='upload Logo' border={"1px solid grey"} borderRadius="4px" padding="5px" m={2}
        onChange={(e)=>setData({...data,companyLogo:e.target.files[0]})}
      />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} 
        onClick={()=>setCreateModal((prev)=> !prev)}
         >
          Close
        </Button>
        <Button variant='outline' onClick={handleCreation}>{loader?<Spinner boxSize="40px"/>:"Create Certificate"}</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default CertificateModal