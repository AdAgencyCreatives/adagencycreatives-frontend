import {
  IoPencilOutline, IoCloseCircleSharp,
} from "react-icons/io5";
import { Modal } from "@mui/material";
import { useState, useRef } from "react";
import ImagePicker from "./Modals/ImagePicker";
import Divider from "../Divider";
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { containsOffensiveWords } from "../../helpers/functions";
import { Context as CommunityContext } from "../../context/CommunityContext";
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import { CircularProgress } from "@mui/material";
import ContentEditable from 'react-contenteditable'
import AvatarImageLoader from "../AvatarImageLoader";

const EditComment = (props) => {

  const editorRefTinyMCE = useRef(null);

  const {
    state: { token, user },
  } = useContext(AuthContext);

  const {
    state: { formSubmit, },
    updateComment, setHaltRefresh,
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

  const selectEmoji = (emojiData) => {
    console.log(emojiData.getEmojiUrl);
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
  };

  const doUpdateComment = () => {
    if (containsOffensiveWords(content)) {
      setHasOffensiveWords(true);
      return;
    }
    setHasOffensiveWords(false);

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
  }, [props.comment.content]);


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
              <AvatarImageLoader user={user} height={50} width={50} />
            </div>
            <div className="user-meta">
              <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'} :: Edit Comment</p>
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
                  apiKey='niqd0bqfftqm2iti1rxdr0ddt1b46akht531kj0uv4snnaie'
                  init={{
                    height: 250,
                    menubar: false,
                    // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount',
                    toolbar: 'bold italic underline strikethrough | blocks fontsize | numlist bullist link | emoticons charmap | align lineheight | indent outdent | removeformat',
                    content_css: ['https://fonts.googleapis.com/css?family=Jost:400,500,600,700,800&#038;subset=latin%2Clatin-ext'],
                    font_family_formats: 'JOST=JOST',
                    content_style: 'body, * { font-family: "JOST", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important; font-size: 14pt } a { color: #d3a11f; cursor: pointer; } a:hover { color: #000; }',
                    placeholder: 'What do you want to talk about?',
                    forced_root_block: false, // Disable wrapping content in paragraph tags 
                    setup: (editor) => {
                      editor.on('keydown', (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) { // Enter key without Shift 
                          e.preventDefault();
                          editor.execCommand('InsertLineBreak');
                        } else if (e.key === 'Enter' && e.shiftKey) { // Enter key with Shift
                          e.preventDefault();
                          editor.execCommand('InsertParagraph');
                        }
                      });
                    },
                  }}
                  value={content}
                  onEditorChange={(e) => {
                    setContent(editorRefTinyMCE.current ? editorRefTinyMCE.current.getContent() : "");
                  }}
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
            {/* <div className="post-options d-flex">
              <div className="item" >
                <FiCamera />
              </div>
              <div className="item" onClick={() => setImagePickerOpen(true)}>
                <FiImage />
              </div>
              <div className="item" onClick={() => setImagePickerOpen(true)}>
                <FiPaperclip />
              </div>
            </div> */}
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
                <button className={"btn btn-post" + (useTinyMCE ? (!isLoadingTinyMCE ? ' d-show' : ' d-none') : "")} onClick={() => doUpdateComment()}>Update Comment</button>
              </div>
            </div>
            <ImagePicker open={imagePickerOpen} handleImagePickerClose={() => setImagePickerOpen(false)} />
          </div>
        </div>
      </Modal >
    </>
  );
};

export default EditComment;
