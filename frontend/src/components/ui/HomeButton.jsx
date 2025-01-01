import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";

import React from "react";
import { useColorModeValue } from "./color-mode";

const HomeButton = () => {
  return (
    <ChakraLink
      as={RouterLink}
      to={"/"}
      display={"block"}
      p={"7.5px"}
      _hover={{ bg: useColorModeValue("gray.100", "gray.900") }}
      _focus={{ outline: "none" }}
      fontSize={"lg"}
    >
      <BiHomeAlt2 />
    </ChakraLink>
  );
};

export default HomeButton;
