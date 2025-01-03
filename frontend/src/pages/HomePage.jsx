import Post from "@/components/Post";
import useLoading from "@/hooks/useLoading";
import { errorToast } from "@/utils/toasts";
import { Center, Heading, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading(true);

  console.log(posts);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        startLoading();
        const res = await axios.get("/api/posts/feed");
        if (res.status === 200) {
          setPosts(res.data.data);
        }
      } catch (error) {
        errorToast("An error occured", error.response.data.error);
      } finally {
        stopLoading();
      }
    };

    fetchArea();
  }, []);

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!isLoading && posts.length === 0) {
    return <Heading as={"h1"}>Follow some users to see the feed</Heading>;
  }

  if (!isLoading && posts.length) {
    return (
      <Stack spaceY={4}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Stack>
    );
  }
};

export default HomePage;
