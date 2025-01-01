import { Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { IoLogOut } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import userAtom from "@/atoms/user.atom";
import { toaster } from "./toaster";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      console.log(res);
      if (res.status === 200) {
        localStorage.removeItem("threads-user");
        setUser(null);
        toaster.create({
          type: "success",
          title: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant={"ghost"}
      size={"lg"}
      px={"7.5px"}
      py={"7.5px"}
      minWidth="auto"
      height="auto"
      onClick={logout}
    >
      <IoLogOut />
    </Button>
  );
};

export default LogoutButton;
