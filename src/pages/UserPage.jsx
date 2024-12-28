import UserHeader from "@/components/user/UserHeader";
import UserPost from "@/components/user/UserPost";
import { Stack } from "@chakra-ui/react";
import React from "react";

const UserPage = () => {
  return (
    <Stack gap={4}>
      <UserHeader />
      <UserPost />
      <UserPost />
    </Stack>
  );
};

export default UserPage;
