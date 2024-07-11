import { DownloadIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Link, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed'

const SingleMessage = ({ messages }) => {
  const user = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const renderAttachment=(attachment)=>{
  console.log(attachment,"ma call hua hu")
  const downloadIcon = (
    <Link >
    <a href="path_to_file" download={`custom.${attachment?.format}`} >
      <IconButton
      icon={<DownloadIcon/>}
      />
    </a>
    </Link>

  );
  if(attachment?.format==="png" || attachment?.format === "jpeg"){
    return (
      <Box boxSize="250" display="flex" justifyContent="center" alignItems="center" backgroundImage={attachment.url} backgroundSize="contain" backgroundRepeat="no-repeat" backgroundPosition="center">
          {downloadIcon}
      </Box>
    );
  }
  
  else if(attachment?.format==="mpeg" || attachment?.format === "wav"){
    return (<Box>
        <audio controls src={attachment.url} />
        {downloadIcon}
      </Box>)
  }
  
  
  else if(attachment?.format==="mp4" || attachment?.format === "webm" || attachment?.format === "ogg"){
    return (
      <Box>
      <video controls src={attachment.url} width="300" />
      {downloadIcon}
    </Box>
    )    

  }else {
    // Handling other file types
    return (
      <Box>
        <iframe
          src={attachment.url}
          width="300"
          height="200"
          style={{ border: '1px solid black', borderRadius: '10px' }}
          title="PDF preview"
        />
        {downloadIcon}
      </Box>
    );
  }
 }


  return (

    <ScrollableFeed forceScroll={true}>

        {messages?.map((message) => {
          const isCurrentUser = message?.sender?._id === user?._id;

          return (

            <Box
              key={message._id}
              display="flex"
              justifyContent={(isCurrentUser) ? "flex-end" : "flex-start"}
              mb={2}
            >
              <Box
                bg={isCurrentUser ? "black" : "#e0e0e0"}
                color={isCurrentUser ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="20px"
                borderBottomLeftRadius={!(isCurrentUser) ? "0px" : "20px"}
                borderBottomRightRadius={isCurrentUser ? "0px" : "20px"}
                maxWidth="80%"

              >
                <Text fontSize="12px" fontWeight="bold">{isCurrentUser ? "" :message?.sender?.username}</Text>
                
                {message?.attachments && message?.attachments?.map((attachment, index)=>{
                return(<Box key={index} mt={2}>
                  {renderAttachment(attachment)}
                </Box>)
                })}
                <Text>{message?.content}</Text>
              </Box>
              <Box ref={messagesEndRef} />
            </Box>
          );
        })}
    </ScrollableFeed>

  );
};

export default SingleMessage;
