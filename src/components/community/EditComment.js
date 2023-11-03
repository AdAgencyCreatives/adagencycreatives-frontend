import {
  IoPencilOutline, IoCloseCircleSharp,
} from "react-icons/io5";
import { Modal } from "@mui/material";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import Divider from "../Divider";
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";
import { Editor } from '@tinymce/tinymce-react';

const EditComment = (props) => {

  const editorRef = useRef(null);
  const editorLog = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
  }, [props.comment]);

  useEffect(() => {
    setHaltRefresh(open);
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
  }, []);

  const performInit = (evt, editor) => {
    editorRef.current = editor;
    editor.focus();
  };

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
          <Editor
              onInit={(evt, editor) => performInit(evt, editor) }
              apiKey='0de1wvfzr5x0z7za5hi7txxvlhepurk5812ub5p0fu5tnywh'
              init={{
                height: 250,
                menubar: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                content_style: 'body { font-family:Jost, Arial, sans-serify; font-size:14pt }',
                placeholder: 'Comment on this post',
              }}
              initialValue={props.comment.content}
              onChange={(e) => setContent(editorRef.current ? editorRef.current.getContent() : "")}
            />
          </div>
          <Divider />
          <div className="postmodal-footer">
            <div className="postmodal-action">
              <button className="btn btn-post" onClick={() => doUpdateComment()}>Update Comment</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditComment;
