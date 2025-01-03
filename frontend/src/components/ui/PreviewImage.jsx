import React, { useRef } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Button } from "./button";

const PreviewImage = ({ children, imgUrl, handleImageChange }) => {
  const fileRef = useRef(null);
  return (
    <Box>
      <Button onClick={() => fileRef.current.click()}>{children}</Button>
      <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
    </Box>
  );
};

export default PreviewImage;
