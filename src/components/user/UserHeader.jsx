import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

import { Avatar } from "../ui/avatar";
import { useColorModeValue } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { toaster } from "../ui/toaster";

const UserHeader = () => {
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    toaster.create({
      title: "URL copied",
      type: "success",
      isClosable: true,
    });
  };
  return (
    <Stack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Heading size={"2xl"}>Mark Zuckerberg</Heading>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"}>markzuckerberg</Text>
            <Text
              fontSize={"xs"}
              bg={useColorModeValue("gray.200", "gray.800")}
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
        <Flex gap={2} color={"gray.500"}>
          <Link color={"inherit"}>
            <FaInstagram size={25} />
          </Link>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant={"ghost"}>
                <CiCircleMore size={28} />
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem onClick={copyURL}>Copy Link</MenuItem>
            </MenuContent>
          </MenuRoot>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Box
          textAlign={"center"}
          flex={1}
          borderBottom={"1px solid white"}
          cursor={"pointer"}
          pb={"3"}
        >
          <Heading as={"h3"}>Threads</Heading>
        </Box>
        <Box
          textAlign={"center"}
          flex={1}
          borderBottom={"1px solid gray"}
          color={"gray.500"}
        >
          <Heading as={"h3"}>Replies</Heading>
        </Box>
        <Box></Box>
      </Flex>
    </Stack>
  );
};

export default UserHeader;
