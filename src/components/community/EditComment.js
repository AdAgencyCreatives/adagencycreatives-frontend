import {
  IoPencilOutline, IoCloseCircleSharp,
} from "react-icons/io5";
import { Modal } from "@mui/material";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import Divider from "../Divider";
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";

const EditComment = (props) => {

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
    updateComment, setHaltRefresh,
  } = useContext(CommunityContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPicker, setShowPicker] = useState(false);
  const [content, setContent] = useState("");

  const selectEmoji = (emojiData) => {
    console.log(emojiData.getEmojiUrl);
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
  };

  const doUpdateComment = () => {
    updateComment(props.post.id, props.comment.uuid, {
      "content": content,
      "status": "published"
    });
  };

  useEffect(() => {
    if (!formSubmit) {
      handleClose();
      if (props.onUpdateComment) {
        props.onUpdateComment();
      }
    }
  }, [formSubmit]);

  useEffect(() => {
    setContent(props.comment.content);
    console.log("Editing Comment: ");
    console.log(props.comment)
  }, [props.comment]);

  useEffect(() => {
    setHaltRefresh(open);
  }, [open]);


  return (
    <>
      <li onClick={handleOpen}>
        <IoPencilOutline /> Edit
      </li>
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
              <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'} :: Edit Comment</p>
            </div>
            <div className="post-modal-close" onClick={() => handleClose()}>
              <IoCloseCircleSharp />
            </div>
          </div>
          <div className="postmodal-body">
            <ContentEditable
              id="new-input"
              placeholder="Comment on this post"
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
              <button className="btn btn-post" onClick={() => doUpdateComment()}>Comment</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditComment;
