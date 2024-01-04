import React from 'react'
import { Avatar, HStack, Text } from '@chakra-ui/react';

const Messages = ({user,uri,message}) => {
  return (
    <HStack alignSelf={(user == "me")?"flex-end":"flex-start"} maxW="400px" color={"white"} bg="#86B6F6"  borderRadius="0.85rem" padding={2}> 
        {user == "others" && <Avatar src={uri} w="35px" h="35px" />}
        <Text>{message}</Text>
        {user == "me" && <Avatar src={uri} w="35px" h="35px" /> }
    </HStack>
  )
}
export default Messages