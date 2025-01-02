import React, { useState } from "react";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { useRecoilValue } from "recoil";

import { Avatar } from "../ui/avatar";
import { useColorModeValue } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { toaster } from "../ui/toaster";
import userAtom from "@/atoms/user.atom";
import ProfileUpdateModal from "@/pages/profile/ProfileUpdateModal";
import { errorToast } from "@/utils/toasts";
import axios from "axios";
import useLoading from "@/hooks/useLoading";
import { Button } from "../ui/button";

const UserHeader = ({ user }) => {
  const currentUser = useRecoilValue(userAtom);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(currentUser._id)
  );

  const isSameUser = currentUser._id === user._id;

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    toaster.create({
      title: "URL copied",
      type: "success",
      isClosable: true,
    });
  };

  const handleFollowUnfollow = async () => {
    try {
      startLoading();
      const res = await axios.post(`/api/users/follow/${user._id}`);

      if (res.status === 200) {
        if (isFollowing) {
          user.followers.pop();
        } else {
          user.followers.push(currentUser._id);
        }
        setIsFollowing((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong", error.response.data.error);
    } finally {
      stopLoading();
    }
  };

  return (
    <Stack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Heading size={"2xl"} textTransform={"capitalize"}>
            {user.name}
          </Heading>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"}>{user.username}</Text>
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
          <Avatar name={user.name} src={user.profileImage} size="xl" />
        </Box>
      </Flex>
      <Text>{user.bio}</Text>

      {isSameUser && <ProfileUpdateModal />}

      {!isSameUser && (
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={handleFollowUnfollow}
          loading={isLoading}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} color={"gray.500"} alignItems={"center"}>
          <Text fontSize={"sm"}>{user.followers.length} followers</Text>
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
