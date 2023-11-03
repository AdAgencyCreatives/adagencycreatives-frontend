import {
  IoClose, IoCloseCircle, IoCloseCircleOutline, IoCloseCircleSharp,
} from "react-icons/io5";
import { FiCamera, FiImage, FiPaperclip } from "react-icons/fi";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import Divider from "../Divider";
import ModalCss from "../../styles/Modal/PostModal.scss";
import ImagePicker from "./Modals/ImagePicker";
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";
import { Editor } from '@tinymce/tinymce-react';
import { CircularProgress } from "@mui/material";

const CreateComment = (props) => {

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
    saveComment, setHaltRefresh,
  } = useContext(CommunityContext);

  const [open, setOpen] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
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
    setEditorLoading(false);
    editorRef.current = editor;
    editor.focus();
  };


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
            <div className={"d-" + (editorLoading ? 'show' : 'none')}>
              <CircularProgress />
            </div>
            <Editor
              onInit={(evt, editor) => performInit(evt, editor)}
              apiKey='0de1wvfzr5x0z7za5hi7txxvlhepurk5812ub5p0fu5tnywh'
              init={{
                height: 250,
                menubar: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                content_style: 'body { font-family:Jost, Arial, sans-serify; font-size:14pt }',
                placeholder: 'Comment on this post',
              }}
              initialValue=""
              onChange={(e) => setContent(editorRef.current ? editorRef.current.getContent() : "")}
            />
          </div>
          <div className="post-options d-flex">
            <div className="item" >
              <FiCamera />
            </div>
            <div className="item" onClick={() => setImagePickerOpen(true)}>
              <FiImage />
            </div>
            <div className="item">
              <FiPaperclip />
            </div>
          </div>
          <Divider />
          <div className="postmodal-footer">
            <div className="postmodal-action">
              <button className={"btn btn-post d-" + (!editorLoading ? 'show' : 'none')} onClick={() => doSaveComment()}>Comment</button>
            </div>
          </div>
          <ImagePicker open={imagePickerOpen} handleImagePickerClose={() => setImagePickerOpen(false)} />
        </div>
      </Modal >
    </div >
  );
};

export default CreateComment;
