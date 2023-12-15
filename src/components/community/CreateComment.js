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
import { Context as AuthContext, containsOffensiveWords } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import { CircularProgress } from "@mui/material";
import ContentEditable from 'react-contenteditable'

const CreateComment = (props) => {

  const editorRefTinyMCE = useRef(null);

  const {
    state: { token, user },
  } = useContext(AuthContext);

  const {
    state: { formSubmit, },
    saveComment, setHaltRefresh,
  } = useContext(CommunityContext);

  const [open, setOpen] = useState(false);
  const [isLoadingTinyMCE, setIsLoadingTinyMCE] = useState(true);
  const [hasOffensiveWords, setHasOffensiveWords] = useState(false);
  const [useTinyMCE, setUseTinyMCE] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPicker, setShowPicker] = useState(false);
  const [content, setContent] = useState("");
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const doSaveComment = () => {
    if (containsOffensiveWords(content)) {
      setHasOffensiveWords(true);
      return;
    }
    setHasOffensiveWords(false);

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


  const onEditableRef = (node) => {
    if (node && node.el && node.el.current) {
      node.el.current.focus();
    }
  }

  useEffect(() => {
    setHaltRefresh(open);
  }, [open]);

  useEffect(() => {
    setHasOffensiveWords(containsOffensiveWords(content));
  }, [content]);

  useEffect(() => {
    /* Hack to resolve focus issue with TinyMCE editor in bootstrap model dialog */
      const handler = (e) => {
        if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
          e.stopImmediatePropagation();
        }
      };
      document.addEventListener("focusin", handler);
      return () => document.removeEventListener("focusin", handler);
  }, []);

  const performInitTinyMCE = (evt, editor) => {
    setIsLoadingTinyMCE(false);
    editorRefTinyMCE.current = editor;
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
              <img src={user ? user.image : Placeholder} height={50} width={50} alt="" />
            </div>
            <div className="user-meta">
              <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'} :: New Comment</p>
            </div>
            <div className="post-modal-close" onClick={() => handleClose()}>
              <IoCloseCircleSharp />
            </div>
          </div>
          <div className="postmodal-body">
            {useTinyMCE ? (
              <>
                <div className={"d-" + (isLoadingTinyMCE ? 'show' : 'none')}>
                  <CircularProgress />
                </div>
                <EditorTinyMCE
                  onInit={(evt, editor) => performInitTinyMCE(evt, editor)}
                  apiKey='0de1wvfzr5x0z7za5hi7txxvlhepurk5812ub5p0fu5tnywh'
                  init={{
                    height: 250,
                    menubar: false,
                    // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount',
                    toolbar: 'bold italic underline strikethrough | blocks fontfamily fontsize | numlist bullist link | emoticons charmap | align lineheight | indent outdent | removeformat',
                    content_style: 'body { font-family: "JOST", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; font-size: 14pt }',
                    placeholder: 'What do you want to talk about?',
                  }}
                  initialValue=""
                  onEditorChange={(e) => setContent(editorRefTinyMCE.current ? editorRefTinyMCE.current.getContent() : "")}
                />
              </>
            ) : (
              <ContentEditable
                ref={onEditableRef}
                className="postmodal-editor"
                html={content}
                placeholder="Comment on this post"
                tagName="div"
                onChange={(e) => setContent(e.target.value)}
              />
            )}
            <div className="post-options d-flex">
              <div className="item" >
                <FiCamera />
              </div>
              <div className="item" onClick={() => setImagePickerOpen(true)}>
                <FiImage />
              </div>
              <div className="item" onClick={() => setImagePickerOpen(true)}>
                <FiPaperclip />
              </div>
            </div>
          </div>
          <Divider />
          <div className="postmodal-footer">
            <div className="postmodal-offensive-words">
              {hasOffensiveWords && (
                <div className="message">
                  Your post includes offensive language. Please rephrase.
                </div>
              )}
            </div>
            <div className="postmodal-action">
              <button className={"btn btn-post" + (useTinyMCE ? (!isLoadingTinyMCE ? ' d-show' : ' d-none') : "")} onClick={() => doSaveComment()}>Comment</button>
            </div>
          </div>
          <ImagePicker open={imagePickerOpen} handleImagePickerClose={() => setImagePickerOpen(false)} />
        </div>
      </Modal >
    </div >
  );
};

export default CreateComment;
