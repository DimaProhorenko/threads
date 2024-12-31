import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

const Link = ({ children, to, ...props }) => {
  return (
    <ChakraLink
      as={RouteLink}
      to={to}
      _hover={{ textDecoration: true }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
