import React, { useEffect, useState } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import { Box, Button, Container, HStack, Input, Text, VStack } from "@chakra-ui/react";
import Messages from './Messages';
import { app } from '../Configs/Firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

const Home = (props) => {

    const [message, setMessage] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(props.user.uid);
        try {
            const docref = await addDoc(collection(db, "messages"), {
                userID: props.user.uid,
                userURI: props.user.photoUrl,
                message: message,
                createdAt: Date.now(),
            })
        }
        catch (e) { console.log(e) }
    }

    useEffect(() => {

    }, [message])

    return (
        <Box bg="#EEF5FF" padding={2}>
            <Container h="98vh" bg="url(https://img.freepik.com/premium-vector/white-heart-love-confettis-valentine-s-day-vignette-exquisite-background-falling-stitched-paper-hearts-confetti-white-background-extra-vector-illustration_174187-6057.jpg)" color="#0F1035" opacity="0.89" boxShadow="0px 0px 3px 6px white" paddingX={0}>
                <VStack h="full" paddingX={0}>
                    <Button bg="#176B87"
                        color="white"
                        w="full"
                        borderRadius={0}
                        _hover={{ bg: "rgb(58, 149, 178)" }}
                        onClick={() => {
                            props.logOut();
                        }}
                    >Log Out
                    </Button>
                    <VStack
                        className="message-box"
                        h="full"
                        w="full"
                        overflowY={"auto"}
                        css={{
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}>
                        <Messages uri={""} user={"others"} message={"Hello"} />
                        <Messages uri={""} user={"others"} message={"Hello"} />
                        <Messages uri={""} user={"me"} message={message} />
                        <Messages uri={""} user={"others"} message={"Hello"} />
                        <Messages uri={""} user={"others"} message={"Hello"} />
                    </VStack>
                    <form action='/' method='post' style={{ width: "100%" }} onSubmit={(e) => {
                        sendMessage(e);
                    }}>
                        <HStack w="full">
                            <Input
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                placeholder="Write Your Message here . . ." />
                            <Button bg="#176B87" _hover={{ bg: "rgb(58, 149, 178)" }} color="white" type='submit'><LuSendHorizonal /></Button>
                        </HStack>
                    </form>
                </VStack>
            </Container>
        </Box>
    )
}

export default Home