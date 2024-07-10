"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const ProfilePicture = ({ userImage, onDelete, onUpload }) => {
  const router = useRouter();

  const onRemoveProfileImage = async () => {
    const response = await onDelete();
    if (response) {
      router.refresh();
    }
  };

  const handleFileUpload = async (e) => {
    const file = await onUpload(e.cdnUrl);
    if (file) {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg text-white"> Profile Picture</p>
      <div className="flex h-[30vh] flex-col items-center justify-center">
        {userImage ? (
          <>
            <div className="relative h-full w-2/12">
              <Image src={userImage} alt="User_Image" fill />
            </div>
            <Button
              onClick={onRemoveProfileImage}
              className="bg-transparent text-white/70 hover:bg-transparent hover:text-white"
            >
              <X /> Remove Logo
            </Button>
          </>
        ) : (
          <div>
            <FileUploaderRegular
              onFileUploadSuccess={handleFileUpload}
              pubkey="8a1ee5434220a749e1b1"
              maxLocalFileSizeBytes={10000000}
              imgOnly={true}
              sourceList="local, url, camera"
              classNameUploader="my-config uc-light"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
