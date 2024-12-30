import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

const Link = ({ children, to }) => {
  return (
    <ChakraLink asChild _hover={{ textDecoration: true }}>
      <RouteLink to={to}>{children}</RouteLink>
    </ChakraLink>
  );
};

export default Link;
