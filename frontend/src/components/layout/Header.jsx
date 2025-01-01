import { Flex } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "../ui/color-mode";
import LogoutButton from "../ui/LogoutButton";
import HomeButton from "../ui/HomeButton";
import { useRecoilValue } from "recoil";
import userAtom from "@/atoms/user.atom";

const Header = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      marginBlockEnd={"2rem"}
    >
      {user && <HomeButton />}
      <ColorModeButton />
      {user && <LogoutButton />}
    </Flex>
  );
};

export default Header;
