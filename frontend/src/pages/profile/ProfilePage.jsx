import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  return (
    <div>
      <Button onClick={toggleModal}>Update Profile</Button>
      <ProfileUpdateModal isOpen={isModalOpen} handleOpenChange={toggleModal} />
    </div>
  );
};

export default ProfilePage;
