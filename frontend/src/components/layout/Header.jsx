import { Flex } from "@chakra-ui/react";
import React from "react";
import { ColorModeButton } from "../ui/color-mode";
import LogoutButton from "../ui/LogoutButton";
import HomeButton from "../ui/HomeButton";
import { useRecoilValue } from "recoil";
import userAtom from "@/atoms/user.atom";
import ProfileButton from "../ui/ProfileButton";

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
      {user && <ProfileButton username={user.username} />}
    </Flex>
  );
};

export default Header;
