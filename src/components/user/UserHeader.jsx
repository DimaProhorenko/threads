import React from "react";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

import { Avatar } from "../ui/avatar";

const UserHeader = () => {
  return (
    <Stack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Heading size={"2xl"}>Mark Zuckerberg</Heading>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"}>markzuckerberg</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.800"}
              paddingInline={2}
              paddingBlock={1}
              color={"gray.500"}
              borderRadius={"full"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Mark Zuckerberg" src="/mark.jpg" size="xl" />
        </Box>
      </Flex>
      <Text>Co-founder, executive chairman and CEO of Meta Platform</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} color={"gray.500"} alignItems={"center"}>
          <Text fontSize={"sm"}>72k followers</Text>
          <Box w={1} h={1} borderRadius={"50%"} bg={"gray.500"}></Box>
          <Link color={"inherit"}>instagram</Link>
        </Flex>
        <Flex gap={2}>
          <Link>
            <FaInstagram />
          </Link>
          <Link>
            <FaFacebook />
          </Link>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default UserHeader;
