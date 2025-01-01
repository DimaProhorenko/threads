import { useState } from "react";
import { errorToast } from "@/utils/toasts";

const usePreviewImage = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      errorToast("Invalid file type", "Please select an image file");
      setImgUrl(null);
    }
  };
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImage;
