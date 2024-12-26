import { Flex } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "../ui/color-mode";

const Header = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      marginBlockEnd={"2rem"}
    >
      <ColorModeButton />
    </Flex>
  );
};

export default Header;
