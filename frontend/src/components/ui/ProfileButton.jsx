import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { PROFILE } from "@/constants/routes";
import { useColorModeValue } from "./color-mode";

const ProfileButton = ({ username }) => {
  return (
    <ChakraLink
      as={RouterLink}
      to={`/${username}`}
      display={"block"}
      p={"7.5px"}
      _hover={{ bg: useColorModeValue("gray.100", "gray.900") }}
      _focus={{ outline: "none" }}
      fontSize={"lg"}
    >
      <IoPersonCircle style={{ width: "25px", height: "25px" }} />
    </ChakraLink>
  );
};

export default ProfileButton;
