import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Box,
  Button,
  Group,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

import { Field } from "../ui/field";
import { useColorModeValue } from "../ui/color-mode";
import { errorToast, successToast } from "@/utils/toasts";

import authScreenAtom from "@/atoms/auth.atom";
import loadingAtom from "@/atoms/loading.atom";
import useAuthActions from "@/hooks/useAuthActions";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
  const { login } = useAuthActions();

  const updateInput = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", inputs);

      console.log(res);
      if (res.status === 200) {
        login(res.data.data);
        setInputs({ email: "", password: "" });
        successToast("Logged in");
      }
    } catch (error) {
      errorToast("Login failed", error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack paddingBlock={1} paddingInline={2} spaceY={4} maxWidth={"500px"}>
      <Heading as={"h1"} fontSize={"2xl"} textAlign={"center"} fontWeight={500}>
        Login
      </Heading>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.900")}
        padding={8}
        boxShadow={"lg"}
      >
        <form onSubmit={handleSubmit}>
          <Stack spaceY={4}>
            <Field label="Email" required>
              <Input
                type="text"
                variant={"outline"}
                name="email"
                value={inputs.email}
                onChange={updateInput}
              />
            </Field>
            <Field label="Password" required>
              <Group attached w={"full"}>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant={"outline"}
                  name="password"
                  value={inputs.password}
                  onChange={updateInput}
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
                {isLoading ? <Spinner /> : "Login"}
              </Button>
              <Text textAlign={"center"}>
                Don't have an account?{" "}
                <Link
                  color={"blue.400"}
                  _hover={{ color: "blue.500" }}
                  onClick={() => setAuthScreenState("signup")}
                >
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default LoginCard;
