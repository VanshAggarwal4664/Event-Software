import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
    Input,
    IconButton,
  } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
const FileModal = ({openModal,setOpenModal,selectedfiles,handleSendFile}) => {
 const [data,setData]=useState({
    content:"",
    files: selectedfiles
 })

const closeModal=()=>{
 setOpenModal(!openModal)
}

  return (
    <Modal isOpen={openModal} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="space-between">
          <Text>Selected Files</Text>
          <IconButton onClick={closeModal}  boxSize="15px 15px" icon={<CloseIcon  boxSize="10px"/>} />
          </ModalHeader>
        
          <ModalBody>
          <Text>
          {selectedfiles.length>0 ? selectedfiles.map((file)=>{
               return ` ${file.name}, `
          }) :<p>no files</p>}
          </Text>
          </ModalBody>

          <ModalFooter display="flex" gap="10px">
          <Input onChange={(e)=> setData({...data, content:e.target.value})} value={data.content}  type='text' placeholder='Enter any message'/>
            <Button variant="outline" onClick={()=>{
                setOpenModal(!openModal)
             const formdata=new FormData()
             selectedfiles.map((file)=>{
                formdata.append("files",file)
             })
             formdata.append("content",data.content)
             handleSendFile(formdata)
            }}>send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default FileModal