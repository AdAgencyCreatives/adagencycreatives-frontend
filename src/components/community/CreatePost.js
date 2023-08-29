import { FiCamera, FiImage, FiPaperclip } from "react-icons/fi";
import Nathan from "../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import ModalCss from "../../styles/Modal/PostModal.scss";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import Divider from "../Divider";
import ImagePicker from "./Modals/ImagePicker";

const CreatePost = () => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPicker, setShowPicker] = useState(false);
  const [content, setContent] = useState("");
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const selectEmoji = (emojiData) => {
    console.log(emojiData.getEmojiUrl);
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
  };

  return (
    <div className="post-form">
      <div className="status-box">
        <div className="user-avatar">
          <img src={Nathan} />
        </div>
        <div className="textarea">
          <textarea
            className="status-input form-control"
            rows={1}
            placeholder="What's on your mind?"
            onClick={handleOpen}
          ></textarea>
        </div>
      </div>
      <div className="divider"></div>
      <div className="status-options">
        <div className="item">
          <FiCamera />
        </div>
        <div className="item">
          <FiImage />
        </div>
        <div className="item">
          <FiPaperclip />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="create-post-modal post-modal">
          <div className="postmodal-header">
            <div className="user-avatar">
              <img src={Nathan} height={50} width={50} />
            </div>
            <div className="user-meta">
              <p className="username mb-0">Nathan Walker</p>
            </div>
          </div>
          <div className="postmodal-body">
            <ContentEditable
              placeholder="What do you want to talk about?"
              html={content}
              onChange={(evt) => setContent(evt.target.value)}
            />
            <div className="emoticons">
              <div className="toggle-emo">
                <BsEmojiSmile onClick={() => setShowPicker((val) => !val)} />

                {showPicker && (
                  <EmojiPicker
                    previewConfig={{ showPreview: false }}
                    skinTonesDisabled={true}
                    height={300}
                    suggestedEmojisMode=""
                    categories={[
                      "smileys_people",
                      "animals_nature",
                      "food_drink",
                      "travel_places",
                      "activities",
                      "objects",
                      "symbols",
                      "flags",
                    ]}
                    onEmojiClick={selectEmoji}
                  />
                )}
              </div>
            </div>
            <div className="post-options d-flex">
              <div className="item" onClick={() => setImagePickerOpen(true)} >
                <FiCamera/>
              </div>
              <div className="item">
                <FiImage />
              </div>
              <div className="item">
                <FiPaperclip />
              </div>
            </div>
          </div>
          <Divider />
          <div className="postmodal-footer">
            <div className="postmodal-action">
              <button className="btn btn-post">Post</button>
            </div>
          </div>
          <ImagePicker open={imagePickerOpen} handleImagePickerClose={() => setImagePickerOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
