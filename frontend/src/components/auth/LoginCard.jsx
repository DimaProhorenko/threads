import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useColorModeValue } from "../ui/color-mode";
import {
  Box,
  Button,
  Flex,
  Group,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import Link from "../ui/Link";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        <form action="">
          <Stack spaceY={4}>
            <Field label="Email" required>
              <Input type="text" variant={"outline"} />
            </Field>
            <Field label="Password" required>
              <Group attached w={"full"}>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant={"outline"}
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
                size={"lg"}
                color={"white"}
                bg={useColorModeValue("gray.600", "gray.700")}
                _hover={{ bg: useColorModeValue("gray.700", "gray.800") }}
              >
                Login
              </Button>
              <Text textAlign={"center"}>
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  color={"blue.400"}
                  _hover={{ color: "blue.500" }}
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
