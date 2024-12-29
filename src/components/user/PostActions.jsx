import React from "react";
import {
  FaRegComment,
  FaPaperPlane,
  FaRegHeart,
  FaRetweet,
} from "react-icons/fa";
import { Flex } from "@chakra-ui/react";

const PostActions = () => {
  return (
    <Flex alignItems={"center"} gap={2}>
      <FaRegHeart />
      <FaRegComment />
      <FaRetweet />
      <FaPaperPlane />
    </Flex>
  );
};

export default PostActions;
