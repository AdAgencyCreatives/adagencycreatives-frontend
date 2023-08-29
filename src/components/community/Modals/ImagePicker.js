import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageModalStyles from '../../../styles/Modal/ImageModal.scss';

const ImagePicker = ({open,handleImagePickerClose}) => {

  return (
    <Modal
      open={open}
      onClose={handleImagePickerClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="image-upload-modal post-modal">
        <div className="image-picker-header">
            <h4 className="m-0">Editor</h4>
            <div className="modal-close">
                <IoClose onClick={handleImagePickerClose} />
            </div>
        </div>
        <div className="image-picker-body">
            <p className="m-0 h4">Select files to begin</p>
            <p className="m-0">Share images or a single video in your post.</p>
            <button className="btn btn-upload-img">Upload</button>
        </div>
      </div>
    </Modal>
  );
};

export default ImagePicker;
