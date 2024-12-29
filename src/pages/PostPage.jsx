import Comment from "@/components/Comment";
import PostBody from "@/components/user/PostBody";
import PostHeader from "@/components/user/PostHeader";
import { Stack } from "@chakra-ui/react";
import React from "react";

const PostPage = () => {
  return (
    <Stack gap={4}>
      <PostHeader />
      <PostBody />
      <Comment />
      <Comment />
      <Comment />
    </Stack>
  );
};

export default PostPage;
