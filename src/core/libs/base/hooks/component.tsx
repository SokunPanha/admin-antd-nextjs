import React from "react";
import Modal from "antd/es/modal";
import { message } from "antd";
import Button from "antd/es/button";
import type { RcFile } from "antd/es/upload/interface";
type ShowImageProps = {
  open: boolean;
  setOpenImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
};

export const ShowImage = ({ open, setOpenImageModal, img }: ShowImageProps) => {
  return (
    <Modal
      open={open}
      onOk={() => setOpenImageModal(false)}
      onCancel={() => setOpenImageModal(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => setOpenImageModal(false)}
        >
          Ok
        </Button>,
      ]}
    >
      <img src={img} width="100%" />
    </Modal>
  );
};

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp" ||
    file.type === "image/gif";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG/webp/gif file!");
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error("Image must smaller than 2MB!");
  // }
  return isJpgOrPng;
};

export const beforeUploadVideo = (file: RcFile) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp" ||
    file.type === "image/gif";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG/webp/gif file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

