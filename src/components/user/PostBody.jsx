import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import PostActions from "./PostActions";

const PostBody = () => {
  return (
    <Stack gap={2} w={"full"}>
      <Text fontSize={"sm"}>My first post</Text>
      <Box
        borderRadius={"5px"}
        overflow={"hidden"}
        border="1px solid"
        borderColor={"gray.500"}
        marginBlockEnd={2}
      >
        <Image alt="First Post" src="/post1.png" />
      </Box>
      <PostActions />
      <Flex alignItems={"center"} gap={2} color={"gray.500"}>
        <Text fontSize={"sm"}>123 Replies</Text>
        <Box w={"1"} h={"1"} borderRadius={"full"} bg={"gray.500"}></Box>
        <Text fontSize={"sm"}>456 Likes</Text>
      </Flex>
    </Stack>
  );
};

export default PostBody;
