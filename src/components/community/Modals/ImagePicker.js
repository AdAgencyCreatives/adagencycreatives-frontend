import { Modal } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import ImageModalStyles from '../../../styles/Modal/ImageModal.scss';
import { CircularProgress } from "@mui/material";
import { Context as AuthContext } from "../../../context/AuthContext";
import { saveAttachment } from "../../../context/AttachmentsDataContext";
import { Context as AlertContext } from "../../../context/AlertContext";

import CircularProgressWithLabel from "../../CircularProgressWithLabel";

import useUploadHelper from "../../../hooks/useUploadHelper";
import IconMessage from "../../IconMessage";

const ImagePicker = ({ open, setOpen, handleImagePickerClose, allowType, postAttachments, setPostAttachments }) => {

  const { showAlert } = useContext(AlertContext);

  const { isFileValid, getUploadGuide, getUploadGuideMessage } = useUploadHelper();
  const imageUploadGuide = getUploadGuide('image', 'lounge');
  const videoUploadGuide = getUploadGuide('video', 'lounge');
  const imageUploadGuideMessage = getUploadGuideMessage(imageUploadGuide);
  const videoUploadGuideMessage = getUploadGuideMessage(videoUploadGuide);

  const [isFileUploading, setIsFileUploading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [progressText, setProgressText] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [acceptFileTypes, setAcceptFileTypes] = useState("image/*");

  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [currentFileToUploadIndex, setCurrentFileToUploadIndex] = useState(-1);
  const [filesToUploadProcessed, setFilesToUploadProcessed] = useState(false);

  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  const {
    state: { token, user },
  } = useContext(AuthContext);

  const getImageAttachmentsCount = () => {
    let count = 0;
    if (postAttachments?.length > 0) {
      for (let index = 0; index < postAttachments.length; index++) {
        const element = postAttachments[index];
        if (element.resource_type == "post_attachment_image") {
          count++;
        }
      }
    }
    return count;
  };

  const getVideoAttachmentsCount = () => {
    let count = 0;
    if (postAttachments?.length > 0) {
      for (let index = 0; index < postAttachments.length; index++) {
        const element = postAttachments[index];
        if (element.resource_type == "post_attachment_video") {
          count++;
        }
      }
    }
    return count;
  };

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {

    if (allowType == "image" && event.target.files?.length + getImageAttachmentsCount() > 5) {
      setErrorText("Sorry, you can upload up to 5 images per post.");
      return;
    }

    if (allowType == "video" && event.target.files?.length + getVideoAttachmentsCount() > 1) {
      setErrorText("Sorry, you can upload up to 1 video per post.");
      return;
    }

    setCurrentFileToUploadIndex(-1);
    setFilesToUploadProcessed(false);
    setFilesToUpload(event.target.files);
  };

  useEffect(() => {
    if (filesToUpload?.length > 0 && !filesToUploadProcessed && !isFileUploading) {
      let index = currentFileToUploadIndex + 1;
      if (index >= filesToUpload.length) {
        setFilesToUploadProcessed(true);
        setProgressText("");
        setOpen(false);
        return;
      }
      setProgressText("Uploading file: " + (index + 1) + " of " + filesToUpload.length);
      handleSingleFileUpload(filesToUpload[index]);
    }
  }, [filesToUpload, isFileUploading]);

  const handleSingleFileUpload = (fileUploaded) => {
    let isImage = fileUploaded.type.indexOf("image") >= 0;
    let isVideo = fileUploaded.type.indexOf("video") >= 0;

    setIsFileUploading(true);
    setErrorText("");
    let validationResult = isFileValid(fileUploaded, (isImage ? "image" : "video"), "lounge");
    if (!validationResult.status) {
      setErrorText(validationResult.message);
      window.setTimeout(() => {
        setCurrentFileToUploadIndex(current => current + 1);
        setIsFileUploading(false);
      }, 2000)
      return;
    }

    setUploadedFile(fileUploaded);

    const fileReader = new FileReader();

    fileReader.onload = function () {
      setPreview(fileReader.result);
    }

    fileReader.readAsDataURL(fileUploaded)
    //console.log(fileUploaded);
  };

  useEffect(() => {
    if (uploadedFile) {
      saveAttachmentAsync(uploadedFile);
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (!open) {
      setErrorText("");
      setIsFileUploading(false);
      setUploadedImages(null);
      setCurrentFileToUploadIndex(-1);
      setFilesToUploadProcessed(false);
      setFilesToUpload(null);
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

    let result = await saveAttachment(formData, progressHandler);
    if (result && result.resource_type) {
      postAttachments.push(result);
      let newUploadedImages = uploadedImages?.length > 0 ? [...uploadedImages] : [];
      newUploadedImages.push(result);
      setUploadedImages(newUploadedImages);
      setPreview("");
      setCurrentFileToUploadIndex(current => current + 1);
      setIsFileUploading(false);
    } else {
      setErrorText(result.message);
      setPreview("");
      setCurrentFileToUploadIndex(current => current + 1);
      setIsFileUploading(false);
    }
  };

  const progressHandler = (progressEvent) => {
    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //console.log(percentCompleted);
    setFileUploadProgress(percentCompleted)
  };

  const handleModalClose = (e) => {
    setIsFileUploading(false);
    if (handleImagePickerClose) {
      handleImagePickerClose();
    }
  };

  return (
    <Modal
      className="image-picker"
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
          <IconMessage message={(allowType == "video" ? videoUploadGuideMessage : imageUploadGuideMessage)} />
          {(preview || uploadedImages?.length > 0) && (<>
            {allowType == "image" && (
              <p class="image-previews">
                {uploadedImages?.length > 0 && uploadedImages.map((item) => <img className="uploaded-image" src={item?.url} alt="Uploaded Image" />)}
                {preview && <img className="image-to-upload" src={preview} alt="Upload preview" />}
              </p>
            )}
            {allowType == "video" && (<>
              {/* <video controls muted playsInline>
                 <source src="" type={"video/" + uploadedFile.name.substring(uploadedFile.name.lastIndexOf('.') + 1)} />
                 Sorry, your browser doesn't support videos.
              </video> */}
            </>)}
          </>)}
          {isFileUploading && (
            <>
              {fileUploadProgress < 100 && <CircularProgressWithLabel value={fileUploadProgress} />}
            </>)}
          <p className="m-0 h4">
            {isFileUploading ? (
              <>
                {fileUploadProgress < 100 ? "Uploading file: " + fileUploadProgress + "% complete..." : ""}
                {fileUploadProgress >= 100 ? "Upload Success" : ""}
              </>
            ) : "Select " + (allowType == "video" ? "" : "maximum 5 ") + allowType + " file" + (allowType == "video" ? "" : "s") + " to begin (up to " + (allowType == "video" ? videoUploadGuide.maxSizeLabel : (imageUploadGuide.maxSizeLabel + " per file")) + ")"}

          </p>
          <p className="m-0">
            {isFileUploading ? (fileUploadProgress >= 100 ? "Attaching file to your message" : "Please wait while your file is being uploaded.") : "Share " + (allowType == 'video' ? allowType : allowType + 's') + " in your post."}
            {progressText && (<p className="progress-text">{progressText}</p>)}
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
          multiple
        />
      </div>
    </Modal>
  );
};

export default ImagePicker;
