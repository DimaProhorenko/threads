import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import React from "react";
import { Avatar } from "../ui/avatar";

const UserPost = () => {
  return (
    <Flex gap={3}>
      <Flex flexDirection={"column"} alignItems={"center"} gap={1}>
        <Avatar name="Mark Zuckerberg" src="/mark.jpg" size="lg" />
        <Box w={"1px"} h={"full"} bg={"gray.500"}></Box>
        <Flex gap={"3px"} w={"full"}>
          <Avatar
            name="Mark Zuckerberg"
            src="https://bit.ly/sage-adebayo"
            size="xs"
          />
          <Avatar
            name="Mark Zuckerberg"
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
            size="xs"
          />
        </Flex>
        <Box>
          <Avatar
            name="Mark Zuckerberg"
            src="https://randomuser.me/api/portraits/men/70.jpg"
            size="xs"
            marginInline="auto"
            marginBlockStart="3px"
            display="block"
          />
        </Box>
      </Flex>
      <Stack gap={2} w={"full"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={1} w={"full"} flex={1}>
            <Heading as={"h5"} fontSize={"sm"}>
              Mark Zuckerberg
            </Heading>
            <Image src="/verified.png" alt="verified" w={3} />
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"} color={"gray.500"}>
              1d
            </Text>
            <BsThreeDots />
          </Flex>
        </Flex>
        <Text fontSize={"sm"}>My first post</Text>
        <Box
          borderRadius={"5px"}
          overflow={"hidden"}
          border="1px solid"
          borderColor={"gray.500"}
        >
          <Image alt="First Post" src="/post1.png" />
        </Box>
      </Stack>
    </Flex>
  );
};

export default UserPost;
