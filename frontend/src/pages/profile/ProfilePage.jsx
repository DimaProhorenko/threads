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

const ProfilePage = () => {
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
  return (
    <div>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Update Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form>
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
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button colorPalette="gray">Close</Button>
            </DialogActionTrigger>
            <Button colorPalette="green">Save</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </div>
  );
};

export default ProfilePage;
