import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { CiCircleMore } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Md3dRotation } from "react-icons/md";

import React from "react";
import { Avatar } from "../ui/avatar";

const PostHeader = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <Flex alignItems={"center"} gap={1}>
        <Avatar
          src="/mark.jpg"
          alt="Mark Zuckerberg"
          size={{
            base: "sm",
            md: "md",
          }}
        />
        <Heading as={"h2"} fontSize={"md"}>
          Mark Zuckerberg
        </Heading>
        <Image src="/verified.png" alt="verified" w={3} h={3} />
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Text fontSize={"sm"}>1d</Text>
        <Box fontSize={{ base: "md", md: "lg" }} cursor={"pointer"}>
          <CiCircleMore />
        </Box>
      </Flex>
    </Flex>
  );
};

export default PostHeader;
