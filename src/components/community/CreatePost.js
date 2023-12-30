import {
  IoClose, IoCloseCircle, IoCloseCircleOutline, IoCloseCircleSharp,
} from "react-icons/io5";
import { FiCamera, FiImage, FiPaperclip } from "react-icons/fi";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import Divider from "../Divider";
import ModalCss from "../../styles/Modal/PostModal.scss";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import ImagePicker from "./Modals/ImagePicker";
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext, containsOffensiveWords } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import { CircularProgress } from "@mui/material";
import ContentEditable from 'react-contenteditable'
import ConfirmDeleteModal from "../community/Modals/ConfirmDeleteModal";

const CreatePost = (props) => {

  const editorRefTinyMCE = useRef(null);

  const {
    state: { token, user },
  } = useContext(AuthContext);

  const {
    showAlert,
  } = useContext(AlertContext);

  const {
    state: { formSubmit, },
    savePost, setHaltRefresh,
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
  const [allowType, setAllowType] = useState("image");
  const [postAttachments, setPostAttachments] = useState([]);

  const [requireContent, setRequireContent] = useState(false);

  const doSavePost = () => {
    if(!content) {
      setRequireContent(true);
      editorRefTinyMCE?.current?.focus();
      return;
    }

    if (containsOffensiveWords(content)) {
      setHasOffensiveWords(true);
      return;
    }
    setHasOffensiveWords(false);

    let uploadPostAttachments = [];
    for (let index = 0; index < postAttachments.length; index++) {
      const postAttachment = postAttachments[index];
      uploadPostAttachments.push(postAttachment.id);
    }
    savePost({
      "group_id": props.feed_group,
      "content": content,
      "attachment_ids": uploadPostAttachments
    });
  };

  useEffect(() => {
    if (!formSubmit) {
      handleClose();
      setContent("");
      setPostAttachments([]);
    }
  }, [formSubmit]);

  const [editableRef, setEditableRef] = useState(null);

  const onEditableRef = (node) => {
    if (node && node.el && node.el.current) {
      setEditableRef(node.el.current);
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

  const selectEmoji = (emojiData) => {
    console.log(emojiData.getEmojiUrl);
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
    if(editableRef) {
      setCursorToEnd(editableRef);
      editableRef?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }
    
  };

  function setCursorToEnd(ele){
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(ele, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

  const removeAttachment = (e, postAttachment) => {
    setPostAttachments(postAttachments.filter((item) => item.id != postAttachment.id));
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
            placeholder="What's on your mind?"
            onClick={handleOpen}
            onChange={handleOpen}
            onKeyDown={handleOpen}
          ></textarea>
        </div>
      </div>
      {/* <div className="divider"></div>
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
      </div> */}

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
              <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'} :: New Post</p>
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
                  onFocus={(e) => setRequireContent(false)}
                />
              </>
            ) : (
              <>
                <ContentEditable
                  ref={onEditableRef}
                  className="postmodal-editor"
                  html={content}
                  placeholder="What do you want to talk about?"
                  tagName="div"
                  onChange={(e) => setContent(e.target.value)}
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
              </>
            )}
            <div className="post-options d-flex">
              <div className="item" onClick={() => {
                setAllowType("image");
                setImagePickerOpen(true);
              }}>
                <FiCamera />
              </div>
              <div className="item" onClick={() => {
                setAllowType("image");
                setImagePickerOpen(true);
              }}>
                <FiImage />
              </div>
              <div className="item" onClick={() => {
                let videos = postAttachments ? postAttachments.filter(item => item.resource_type == "post_attachment_video") : [];
                if (videos.length > 0) {
                  alert("Can't upload more than one video.");
                  return false;
                }
                setAllowType("video");
                setImagePickerOpen(true);
              }}>
                <FiPaperclip />
              </div>
              <div className="post-attachments">
                {postAttachments && postAttachments.map((postAttachment, index) => {
                  return (<>
                    <div className="post-attachment">
                      {postAttachment.resource_type && postAttachment.resource_type == "post_attachment_video" ? (
                        <video controls muted playsInline>
                          <source src={postAttachment.url} type={"video/" + postAttachment.url.substring(postAttachment.url.lastIndexOf('.') + 1)} />
                          Sorry, your browser doesn't support videos.
                        </video>
                      ) : (
                        <img src={postAttachment.url} alt="" />
                      )}
                      <IoCloseCircleSharp onClick={(e) => removeAttachment(e, postAttachment)} />
                    </div>
                  </>);
                })}
              </div>
            </div>
          </div>
          <Divider />
          <div className="postmodal-footer">
            <div className="postmodal-offensive-words">
              {/* {requireContent && (
                <div className="message">
                  Write something...
                </div>
              )} */}
              {hasOffensiveWords && (
                <div className="message">
                  Your post includes offensive language. Please rephrase.
                </div>
              )}
            </div>
            <div className="postmodal-action">
              <button className={"btn btn-post" + (useTinyMCE ? (!isLoadingTinyMCE ? ' d-show' : ' d-none') : "")} onClick={() => doSavePost()}>Post</button>
            </div>
          </div>
          <ImagePicker
            open={imagePickerOpen}
            setOpen={setImagePickerOpen}
            handleImagePickerClose={() => setImagePickerOpen(false)}
            postAttachments={postAttachments} setPostAttachments={setPostAttachments} allowType={allowType} />
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
