import React, { useEffect, useState } from 'react'
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
    Box,
  } from '@chakra-ui/react'
import axios, { formToJSON } from 'axios';
import UserList from '../UserList/UserList';

const SendCertificate = ({setSendModal,id}) => {
    const usersMap= new Array();
 
    const sendCertificateToUsers= async()=>{

        
        console.log("ma run g=ho raha hu")
        try {
             const response= await axios.post(`http://localhost:3000/api/v1/certificate/send-certificate/${id}`,usersMap,{withCredentials:true})
        } catch (error) {
             console.log(error)
        }
    }
    const [usersData,setUsersData]=useState([]);
    const [loader,setLoader]=useState(false)
    const toast=useToast();

    useEffect(() => {

        const fetchJoinedUsers=async()=>{
            try {
                const response=  await axios.get(`http://localhost:3000/api/v1/event/joined-users/${id}`,{withCredentials:true})  
                setUsersData(response?.data?.data?.joinedUsers)
              } catch (error) {
                console.log(error)
              }
        }
        fetchJoinedUsers();
     
    }, [])
    
  return (
    <Box >
         <Modal size={"full"}  isOpen isCentered scrollBehavior="inside">
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader textAlign="center" fontSize="35px">Send Certificate To Users</ModalHeader>
      <ModalBody >
       {usersData.length>0 ?
       usersData?.map((user,index)=>{
        console.log(user);
        return (
            <Box key={user?._id} display="flex" justifyContent="center" >
                 <UserList user={user} usersMap={usersMap} index={index}/>
            </Box>
        )
       })
                
       
       :"no joined users"}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} 
        onClick={()=>setSendModal((prev)=> !prev)}
         >
          Close
        </Button>
        <Button variant='outline' onClick={sendCertificateToUsers}
        >Send Certificate</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    </Box>
    
  )
}

export default SendCertificate



// const CertificateModal = ({setCreateModal,id}) => {

//     const [data,setData]=useState({
//         companyName:"",
//         companyLogo:null,
//         event:id
//     })
//     const handleCreation=()=>{
//       setLoader(true)
//         console.log("yaha se api leke jaunga is id pe",id);

//         try {
//             const response= axios.post("http://localhost:3000/api/v1/certificate/create-certificate",data,{
//                 headers:{
//                     "Content-Type":"multipart/form-data"
//                 },
//                 withCredentials:true
//             })

//             setLoader(false)
//             toast({
//                 title: 'Certificate Created',
//                 description: "Certificate Created Successfully for the event",
//                 status: 'success',
//                 duration: 9000,
//                 isClosable: true,
//               })
//               setCreateModal((prev)=> !prev)
//         } catch (error) {
//             console.log(error)
//         }
      
//     }

 
// }

