import { Modal } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageModalStyles from '../../../styles/Modal/ImageModal.scss';
import { CircularProgress } from "@mui/material";
import { Context as AuthContext } from "../../../context/AuthContext";
import { saveAttachment } from "../../../context/AttachmentsDataContext";
import { Context as AlertContext } from "../../../context/AlertContext";

const ImagePicker = ({ open, setOpen, handleImagePickerClose, allowType, postAttachments, setPostAttachments }) => {

  const { showAlert } = useContext(AlertContext);

  const [isFileUploading, setIsFileUploading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [acceptFileTypes, setAcceptFileTypes] = useState("image/*");

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

    let isImage = fileUploaded.type.indexOf("image") >= 0;
    let isVideo = fileUploaded.type.indexOf("video") >= 0;
    let imageSizeLimit = 1024 * 1024 * 6; // 6 mb
    let videoSizeLimit = 1024 * 1024 * 12; // 12 mb
    let imageSizeLimitLabel = "6 mb"
    let videoSizeLimitLabel = "12 mb";
    let fileSize = fileUploaded.size;

    setErrorText("");
    if ((isImage && fileSize > imageSizeLimit) || (isVideo && fileSize > videoSizeLimit)) {
      setErrorText("The selected file must be less than or equal to " + (isImage ? imageSizeLimitLabel : videoSizeLimitLabel));
      return;
    }

    setUploadedFile(fileUploaded);

    const fileReader = new FileReader();

    fileReader.onload = function () {
      setPreview(fileReader.result);
    }

    fileReader.readAsDataURL(fileUploaded)

    setIsFileUploading(true);
    console.log(fileUploaded);
  };

  useEffect(() => {
    if (uploadedFile) {
      saveAttachmentAsync(uploadedFile);
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (!open) {
      setErrorText("");
    }
  }, [open]);

  useEffect(() => {
    if (allowType) {
      switch (allowType) {
        case "video":
          setAcceptFileTypes("video/*");
          break;
        case "file":
          setAcceptFileTypes("*");
          break;
        case "image":
        default:
          setAcceptFileTypes("image/*");
      }
    }
  }, [allowType]);

  const saveAttachmentAsync = async (file) => {
    let formData = new FormData();

    formData.append("user_id", user.uuid);
    formData.append("resource_type", "post_attachment_" + allowType);
    formData.append("file", file);

    let result = await saveAttachment(formData);

    if (result && result.resource_type) {
      postAttachments.push(result);
      setPreview("");
      setIsFileUploading(false);
      setOpen(false);
    } else {
      setErrorText(result.message);
      setPreview("");
      setIsFileUploading(false);
    }
  };

  const handleModalClose = (e) => {
    setIsFileUploading(false);
    if (handleImagePickerClose) {
      handleImagePickerClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={(e) => handleModalClose(e)}
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
          {preview && (<>
            {allowType == "image" && (
              <p><img className="image-to-upload" src={preview} alt="Upload preview" /></p>
            )}
            {allowType == "video" && (
              <video controls muted playsInline>
                <source src="" type={"video/" + uploadedFile.name.substring(uploadedFile.name.lastIndexOf('.') + 1)} />
                Sorry, your browser doesn't support videos.
              </video>
            )}
          </>)}
          {isFileUploading ? (<CircularProgress />) : (<></>)}
          <p className="m-0 h4">
            {isFileUploading ? "Uploading file..." : "Select " + allowType + " file to begin (up to " + (allowType == "video" ? "12mb" : "6mb") + ")"}
          </p>
          <p className="m-0">
            {isFileUploading ? "Please wait while your file is being uploaded." : "Share images or a single video in your post."}
          </p>
          {!isFileUploading ? (
            <button className="btn btn-upload-img" onClick={handleClick}>Upload</button>
          ) : (<></>)}
          {errorText && (
            <p className="error-text">{errorText}</p>
          )}
        </div>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }} // Make the file input element invisible
          accept={acceptFileTypes}
        />
      </div>
    </Modal>
  );
};

export default ImagePicker;
