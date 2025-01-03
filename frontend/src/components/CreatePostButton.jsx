import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { useColorModeValue } from "./ui/color-mode";
import { Button } from "./ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Box, Image, Stack, Textarea } from "@chakra-ui/react";
import useForm from "@/hooks/useForm";
import { Field } from "./ui/field";
import PreviewImage from "./ui/PreviewImage";
import usePreviewImage from "@/hooks/usePreviewImage";
import { CloseButton } from "./ui/close-button";
import { errorToast, successToast } from "@/utils/toasts";
import axios from "axios";

const MAX_CHAR = 500;

const CreatePostButton = () => {
  const [postText, setPostText] = useState("");
  const { imgUrl, handleImageChange, setImgUrl } = usePreviewImage();
  const [remainingChars, setRemainingChars] = useState(MAX_CHAR);

  const handleTextChange = (e) => {
    const text = e.target.value;

    if (text.length > MAX_CHAR) {
      const truncated = text.slice(0, MAX_CHAR);
      setPostText(truncated);
      setRemainingChars(0);
    } else {
      setPostText(text);
      setRemainingChars(MAX_CHAR - text.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/posts", {
        text: postText,
        image: imgUrl,
      });

      if (res.status === 200) {
        successToast("Post created");
      }
    } catch (error) {
      errorToast("Create post failed", error.response.data.error);
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          position={"fixed"}
          bottom={10}
          right={10}
          bg={useColorModeValue("gray.300", "gray.800")}
          color={useColorModeValue("gray.800", "white")}
          _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
        >
          <FaPlus /> Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack spaceY={4}>
              <Field
                label="Post text"
                helperText={`${remainingChars}/${MAX_CHAR}`}
              >
                <Textarea
                  name="text"
                  value={postText}
                  onChange={handleTextChange}
                />
              </Field>
              {!imgUrl && (
                <PreviewImage
                  imgUrl={imgUrl}
                  handleImageChange={handleImageChange}
                >
                  Add Image
                </PreviewImage>
              )}
              {imgUrl && (
                <Box position={"relative"} className="group">
                  <Image src={imgUrl} alt={"Post Image"} />
                  <CloseButton
                    onClick={() => setImgUrl("")}
                    position="absolute"
                    top={2}
                    right={2}
                    size="xs"
                    variant="solid"
                    colorPalette="red"
                    display="none"
                    _groupHover={{ display: "flex" }}
                  />
                </Box>
              )}
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
  );
};

export default CreatePostButton;
