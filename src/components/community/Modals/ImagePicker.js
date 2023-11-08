import { Modal } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageModalStyles from '../../../styles/Modal/ImageModal.scss';
import { CircularProgress } from "@mui/material";
import { Context as AuthContext } from "../../../context/AuthContext";
import { saveAttachment } from "../../../context/AttachmentsDataContext";

const ImagePicker = ({ open, handleImagePickerClose }) => {

  const [isFileUploading, setIsFileUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  const {
    state: { token, user },
  } = useContext(AuthContext);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setUploadedFile(fileUploaded);

    const fileReader = new FileReader();

    fileReader.onload = function () {
      setPreview(fileReader.result);
    }

    fileReader.readAsDataURL(fileUploaded)

    setIsFileUploading(true);
    console.log(fileUploaded);
  };

  useEffect(()=>{
    if(uploadedFile) {
      console.log("Uploaded File Change: ");
      console.log(uploadedFile);

      saveAttachmentAsync(uploadedFile);
    }
  }, [uploadedFile]);

  const saveAttachmentAsync = async (file) => {
    let formData = new FormData();

    formData.append("user_id", user.uuid);
    formData.append("resource_type", "post_attachment");
    formData.append("file", file);

    let result = await saveAttachment(formData);
    //setIsFileUploading(false);
    console.log(result);
  };

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
          {preview && (
            <p><img src={preview} width={320} height={240} alt="Upload preview" /></p>
          )}
          {isFileUploading ? (<CircularProgress />) : (<></>)}
          <p className="m-0 h4">
            {isFileUploading ? "Uploading file..." : "Select files to begin"}
          </p>
          <p className="m-0">
            {isFileUploading ? "Please wait while your file is being uploaded." : "Share images or a single video in your post."}
          </p>
          {!isFileUploading ? (
            <button className="btn btn-upload-img" onClick={handleClick}>Upload</button>
          ) : (<></>)}
        </div>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }} // Make the file input element invisible
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
        />
      </div>
    </Modal>
  );
};

export default ImagePicker;
