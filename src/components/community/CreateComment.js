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
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";

const CreateComment = (props) => {

  const inputRef = useCallback(node => {
    if (node && node.focus) {
      node.focus()
    }
  }, [])

  const {
    state: { token, user },
  } = useContext(AuthContext);

  const {
    state: { formSubmit, },
    saveComment, setHaltRefresh,
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

  const doSaveComment = () => {
    saveComment({
        "user_id": user.uuid,
        "post_id": props.post.id,
        "content": content
    });
  };

  useEffect(() => {
    if (!formSubmit) {
      handleClose();
      setContent("");
    }
  }, [formSubmit]);

  useEffect(() => {
    setHaltRefresh(open);
  }, [open]);

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
            placeholder="Comment on this post"
            onClick={handleOpen}
            onChange={handleOpen}
            onKeyDown={handleOpen}
          ></textarea>
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
              <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'} :: New Comment</p>
            </div>
            <div className="post-modal-close" onClick={() => handleClose()}>
              <IoCloseCircleSharp />
            </div>
          </div>
          <div className="postmodal-body">
            <ContentEditable
              id="new-input"
              placeholder="Write a Creative comment on this post..."
              html={content}
              onChange={(evt) => setContent(evt.target.value)}
              innerRef={inputRef}
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
          </div>
          <Divider />
          <div className="postmodal-footer">
            <div className="postmodal-action">
              <button className="btn btn-post" onClick={() => doSaveComment()}>Comment</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateComment;
