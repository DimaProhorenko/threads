import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "./ui/avatar";
import PostActions from "./user/PostActions";
import { CiCircleMore } from "react-icons/ci";

const Comment = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} gap={2}>
      <Flex gap={4}>
        <Avatar
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
          alt="person"
        />
        <Box>
          <Heading as={"h4"} fontSize={"sm"}>
            maxi
          </Heading>
          <Text fontSize={"sm"} marginBlockEnd={3}>
            This sounds awesome
          </Text>
          <PostActions />
        </Box>
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Text color={"gray.500"}>1d</Text>
        <Box fontSize={{ base: "md", md: "lg" }} cursor={"pointer"}>
          <CiCircleMore />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Comment;
