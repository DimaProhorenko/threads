import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useColorModeValue } from "../ui/color-mode";
import {
  Box,
  Button,
  Flex,
  Group,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import authScreenAtom from "@/atoms/auth.atom";
import { toaster } from "../ui/toaster";
import userAtom from "@/atoms/user.atom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const setUser = useSetRecoilState(userAtom);

  const setAuthScreenState = useSetRecoilState(authScreenAtom);

  const updateInput = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", inputs, {
        "Content-Type": "application/json",
      });

      if (res.status === 200 || res.status === 201) {
        setInputs({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        localStorage.setItem("threads-user", JSON.stringify(res.data.data));
        setUser(res.data.data);
        toaster.create({
          type: "success",
          title: "Signed up",
        });
      }
    } catch (error) {
      console.log(error);
      toaster.create({
        type: "error",
        title: "Error",
        description: error.response.data.error,
      });
    }
  };

  return (
    <Stack paddingBlock={1} paddingInline={2} spaceY={4} maxWidth={"500px"}>
      <Heading as={"h1"} fontSize={"2xl"} textAlign={"center"} fontWeight={500}>
        Signup
      </Heading>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.900")}
        padding={8}
        boxShadow={"lg"}
      >
        <form onSubmit={handleSubmit}>
          <Stack spaceY={4}>
            <Flex gap={4} flexDirection={{ base: "column", sm: "row" }}>
              <Field label="Full Name" required>
                <Input
                  type="text"
                  variant={"outline"}
                  name="name"
                  value={inputs.name}
                  onChange={updateInput}
                />
              </Field>
              <Field label="Username" required>
                <Input
                  type="text"
                  variant={"outline"}
                  value={inputs.username}
                  onChange={updateInput}
                  name="username"
                />
              </Field>
            </Flex>
            <Field label="Email" required>
              <Input
                type="text"
                variant={"outline"}
                value={inputs.email}
                onChange={updateInput}
                name="email"
              />
            </Field>
            <Field label="Password" required>
              <Group attached w={"full"}>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant={"outline"}
                  onChange={updateInput}
                  value={inputs.password}
                  name="password"
                />
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setShowPassword((prevState) => !prevState);
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </Group>
            </Field>
            <Stack spaceY={8}>
              <Button
                type="submit"
                size={"lg"}
                color={"white"}
                bg={useColorModeValue("gray.600", "gray.700")}
                _hover={{ bg: useColorModeValue("gray.700", "gray.800") }}
              >
                Signup
              </Button>
              <Text textAlign={"center"}>
                Already a user?{" "}
                <Link
                  color={"blue.400"}
                  _hover={{ color: "blue.500" }}
                  onClick={() => {
                    setAuthScreenState("login");
                  }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
