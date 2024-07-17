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
  // this array store the object in which two keys one is user id and selected with value true or false
    const usersMap= new Array();
    const [usersData,setUsersData]=useState([]);
    const [loader,setLoader]=useState(false)
    const toast=useToast();
 

    // send certificate to users ,after successful sending the certificate it show toast and close the modal
    const sendCertificateToUsers= async()=>{
      setLoader(true)
        try {
             const response= await axios.post(`http://localhost:3000/api/v1/certificate/send-certificate/${id}`,usersMap,{withCredentials:true})
             setLoader(false);
             toast({
              title: 'Send Certificate',
              description: "Certificate Send Successfully to selected Users",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            setSendModal((prev)=>!prev)
        } catch (error) {
             setLoader(false);
             alert("something went wrong")
             setSendModal((prev)=>!prev)
             console.log(error)
        }
    }
    
  

// this use effect calling api which give all the joined uswe for that particular eventn and userList component used here
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
        > {loader?<Spinner/>:"Send Certificate"}</Button>
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

