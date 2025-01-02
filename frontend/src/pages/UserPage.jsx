import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack } from "@chakra-ui/react";

import UserHeader from "@/components/user/UserHeader";
import UserPost from "@/components/user/UserPost";
import { errorToast } from "@/utils/toasts";
import axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/profile/${username}`);
        if (res.status === 200) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.log(error);
        errorToast("Failed to fetch user");
      }
    };

    fetchUser();
  }, [username]);

  return (
    user && (
      <Stack gap={8} paddingBlockEnd={4}>
        <UserHeader user={user} />
        <UserPost />
        <UserPost />
      </Stack>
    )
  );
};

export default UserPage;
