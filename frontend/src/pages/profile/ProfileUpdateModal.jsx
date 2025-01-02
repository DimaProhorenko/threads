import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import PasswordInput from "@/components/ui/PasswordInput";
import {
  Box,
  DialogActionTrigger,
  DialogFooter,
  Flex,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import userAtom from "@/atoms/user.atom";
import { Avatar } from "@/components/ui/avatar";
import usePreviewImage from "@/hooks/usePreviewImage";
import { errorToast, successToast } from "@/utils/toasts";
import axios from "axios";

const ProfileUpdateModal = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  const { imgUrl, handleImageChange } = usePreviewImage();

  const fileRef = useRef(null);

  const updateInput = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit");
    try {
      const res = await axios.put("/api/users/update", {
        ...inputs,
        profileImage: imgUrl,
      });
      if (res.status === 200) {
        console.log(res.data.data);
        setUser(res.data.data);
        localStorage.setItem("threads-user", JSON.stringify(res.data.data));
        successToast("Profile updated");
      }
    } catch (error) {
      console.log(error);
      errorToast("Profile update failed", error.response.data.error);
    }
  };
  return (
    <div>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Update Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={submitHandler}>
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Stack spaceY={4}>
                <Flex alignItems={"center"} gap={4}>
                  <Avatar size="2xl" src={imgUrl || user.profileImage} />
                  <Box>
                    <Button onClick={() => fileRef.current.click()}>
                      Change Profile Picture
                    </Button>
                    <Input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />
                  </Box>
                </Flex>
                <Field label="Full Name">
                  <Input
                    type="text"
                    variant={"outline"}
                    name="name"
                    value={inputs.name}
                    onChange={updateInput}
                  />
                </Field>
                <Field label="Username">
                  <Input
                    type="text"
                    variant={"outline"}
                    name="username"
                    value={inputs.username}
                    onChange={updateInput}
                  />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    variant={"outline"}
                    name="email"
                    value={inputs.email}
                    onChange={updateInput}
                  />
                </Field>
                <PasswordInput
                  value={inputs.password}
                  handleChange={updateInput}
                />
                <PasswordInput
                  label="Verify Password"
                  name="verifyPassword"
                  value={inputs.password}
                  handleChange={updateInput}
                />
                <Field label="Bio">
                  <Textarea
                    autoresize
                    name="bio"
                    value={inputs.bio}
                    onChange={updateInput}
                  />
                </Field>
              </Stack>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button colorPalette="gray">Close</Button>
              </DialogActionTrigger>
              <Button type="submit" colorPalette="green">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    </div>
  );
};

export default ProfileUpdateModal;
