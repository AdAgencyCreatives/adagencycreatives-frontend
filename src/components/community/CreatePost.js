import {
  IoClose, IoCloseCircle, IoCloseCircleOutline, IoCloseCircleSharp,
} from "react-icons/io5";
import { FiCamera, FiImage, FiPaperclip } from "react-icons/fi";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import ModalCss from "../../styles/Modal/PostModal.scss";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import Divider from "../Divider";
import ImagePicker from "./Modals/ImagePicker";
import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";

const CreatePost = () => {

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { posts, formSubmit },
    savePost
  } = useContext(CommunityContext);

  const [open, setOpen] = useState(false);
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

  const doSavePost = () => {
    savePost({
      "group_id": "d3ae7dff-e382-30f0-9a94-30e4def92e8a",
      "content": content,
      "attachment_ids": []
    });
  };

  useEffect(() => {
    if (!formSubmit) {
      handleClose();
    }
  }, [formSubmit]);

  return (
    <div className="post-form">
      <div className="status-box">
        <div className="user-avatar">
          <img src={user ? user.image : Placeholder} />
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
              <img src={user ? user.image : Placeholder} height={50} width={50} />
            </div>
            <div className="user-meta">
              <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'}</p>
            </div>
            <div className="post-modal-close" onClick={() => handleClose()}>
              <IoCloseCircleSharp />
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
                <FiCamera />
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
              <button className="btn btn-post" onClick={() => doSavePost()}>Post</button>
            </div>
          </div>
          <ImagePicker open={imagePickerOpen} handleImagePickerClose={() => setImagePickerOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
