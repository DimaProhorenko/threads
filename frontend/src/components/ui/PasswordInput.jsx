import React, { useState } from "react";
import { Field } from "./field";
import { Group, Input } from "@chakra-ui/react";
import { Button } from "./button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  label = "Password",
  value,
  handleChange,
  name = "password",
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Field label={label} required={required}>
      <Group attached w={"full"}>
        <Input
          type={showPassword ? "text" : "password"}
          variant={"outline"}
          onChange={handleChange}
          value={value}
          name={name}
          {...props}
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
  );
};

export default PasswordInput;
