import React from 'react'
import { Button, Container, VStack } from '@chakra-ui/react'

const Login = (props) => {
    return (
        <Container bg={"black"} color={"white"} w={"50%"} h="50%">
            <VStack>
                <h1>Ocean Engineers</h1>
                <h4>Chat App</h4>
                <Button onClick={() => {
                    props.logIn();
                }}>Login</Button>
            </VStack>
        </Container>
    )
}

export default Login
