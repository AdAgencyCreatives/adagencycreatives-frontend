import { IoCloseCircleSharp, } from "react-icons/io5";
import { FiCamera, FiVideo } from "react-icons/fi";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import Divider from "../Divider";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import ImagePicker from "./Modals/ImagePicker";
import { useContext, useEffect, useCallback } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { containsOffensiveWords } from "../../helpers/functions";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as CommunityContext } from "../../context/CommunityContext";
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import { CircularProgress } from "@mui/material";
import ContentEditable from 'react-contenteditable'
import { Context as CreativesContext } from "../../context/CreativesContext";

import { saveAttachment } from "../../context/AttachmentsDataContext";
import { sendLoungeMentionNotifications } from "../../context/NotificationsDataContext";
import AvatarImageLoader from "../AvatarImageLoader";

const CreatePost = (props) => {

  const taggerRef = useRef(null);
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

  const {
    getLoungeCreativesForTag,
  } = useContext(CreativesContext);

  const [open, setOpen] = useState(false);
  const [isLoadingTinyMCE, setIsLoadingTinyMCE] = useState(true);
  const [hasOffensiveWords, setHasOffensiveWords] = useState(false);
  const [useTinyMCE, setUseTinyMCE] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    closeTagger();
    setOpen(false);
  };
  const [showPicker, setShowPicker] = useState(false);
  const [content, setContent] = useState("");
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [allowType, setAllowType] = useState("image");
  const [postAttachments, setPostAttachments] = useState([]);

  const [requireContent, setRequireContent] = useState(false);

  const [taggerOpened, setTaggerOpened] = useState(false);
  const [taggerSearchText, setTaggerSearchText] = useState("");
  const [taggerSearchResults, setTaggerSearchResults] = useState(null);
  const [taggerPosLeft, setTaggerPosLeft] = useState(0);
  const [taggerPosTop, setTaggerPosTop] = useState(0);
  const [taggerUsers, setTaggerUsers] = useState([]);

  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  useEffect(() => {
    if (taggerSearchText && taggerSearchText.length) {
      (async () => {
        let data = await getLoungeCreativesForTag(taggerSearchText);
        setTaggerSearchResults(data);
        //console.log(data);
      })();
    } else {
      setTaggerSearchResults(null);
    }
  }, [taggerSearchText]);

  const onTaggerItemSelected = (e, item) => {
    if (item != null) {
      setTaggerUsers([
        ...taggerUsers,
        item?.uuid
      ]);
    }
    let html = '<a href="/creative/' + item.username + '" target="_blank">@' + item.first_name + ' ' + item.last_name + '</a>'
    editorRefTinyMCE?.current?.execCommand('mceInsertContent', false, html);
    //console.log(item);
    closeTagger();
  };

  const closeTagger = () => {
    if (taggerRef.current) {
      taggerRef.current.canQuitTagger = true;
    }
    handleTaggerBlur(null);
  };
  const handleTaggerKeyDown = (e) => {
    if (taggerRef?.current) {
      if (e && e.keyCode == 27) { /* i.e., pressed '@' */
        if (taggerRef.current) {
          taggerRef.current.canQuitTagger = true;
        }
        handleTaggerBlur(e);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    return true;
  };

  const handleTaggerBlur = (e) => {
    if (taggerRef?.current?.canQuitTagger) {
      setTaggerOpened(false);
      setTaggerSearchText("");
      setTaggerSearchResults(null);
      editorRefTinyMCE?.current?.focus();
      return;
    }
    window.setTimeout(function () {
      taggerRef?.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (editorRefTinyMCE?.current) {
      if (e && e.keyCode == 50 && e.shiftKey) { /* i.e., pressed '@' */
        if (taggerRef.current) {
          taggerRef.current.canQuitTagger = false;
        }
        let posLeft = 30 + (editorRefTinyMCE?.current?.selection?.getRng()?.startOffset || 0) * 10;
        let top = editorRefTinyMCE?.current?.selection?.getRng()?.getClientRects()[0]?.top ?? 40;
        let height = editorRefTinyMCE?.current?.selection?.getRng()?.getClientRects()[0]?.height ?? 0;
        top = 140 + top + height;
        let left = editorRefTinyMCE?.current?.selection?.getRng()?.getClientRects()[0]?.left ?? 10;
        left = 20 + left;

        setTaggerPosLeft(left);
        setTaggerPosTop(top);

        let bookmark = editorRefTinyMCE?.current?.selection?.getBookmark();
        console.log(bookmark);

        setTaggerOpened(true);
        setTaggerSearchText("");
        window.setTimeout(function () {
          taggerRef?.current?.focus();
        }, 250);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    return true;
  };

  const doSavePost = () => {
    if (!content) {
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
    }, async (response) => {
      // this functionality moved to backend
      // if (taggerUsers.length > 0) {
      //   const notifications_data = {
      //     "sender_id": response.data.data.user_id,
      //     "recipient_ids": taggerUsers,
      //     "post_id": response.data.data.id,
      //     "notification_type": 'lounge_mention',
      //     "notification_text": `${response.data.data.author} commented on you in a post`,
      //     "send_email": "yes",
      //   };
      //   let result = await sendLoungeMentionNotifications(notifications_data);
      //   console.log(result);
      // }
      setTaggerUsers([]);
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
    // console.log(emojiData.getEmojiUrl);
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
    if (editableRef) {
      setCursorToEnd(editableRef);
      editableRef?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }

  };

  function setCursorToEnd(ele) {
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

  const handleDragDropAsync = async (blobInfo, success, failure, progress) => {
    if (blobInfo) {
      alert("Disabled. Use attachment icons please.");
      return;
    }
    let content = editorRefTinyMCE.current.getContent();
    // const count = (content.match(/<img/g) || [])?.length > 0 ?? 0;
    // console.log(count);
    // if (count > 5) {
    //   alert('Cannot add more then 5 images!');
    //   return;
    // }

    let formData = new FormData();

    formData.append("user_id", user.uuid);
    formData.append("resource_type", "post_attachment_" + allowType);
    formData.append("file", blobInfo.blob(), blobInfo.filename());

    let result = await saveAttachment(formData, progressHandler);

    if (result && result.resource_type) {
      content = content.replace(/(<img *src="data:)(.*?)"/, '<img src="' + result.url + '"');
      editorRefTinyMCE.current.setContent(content);
      success(result.url);
    }
  };

  const progressHandler = (progressEvent) => {
    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //console.log(percentCompleted);
    setFileUploadProgress(percentCompleted)
  };

  return (
    <div className={props?.className}>
      <div className="status-box">
        <div className="user-avatar">
          <AvatarImageLoader user={user} height={50} width={50} />
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
          <div id="tagger" className="tagger" style={{ display: taggerOpened ? 'block' : 'none', left: taggerPosLeft + 'px', top: taggerPosTop + 'px' }}>
            <IoCloseCircleSharp className="tagger-exit" onClick={(e) => closeTagger()} />
            <input type="text"
              ref={taggerRef}
              onKeyDown={(e) => handleTaggerKeyDown(e)}
              onChange={(e) => setTaggerSearchText(e.target.value.substring(1))}
              value={"@" + taggerSearchText}
              onBlur={(e) => handleTaggerBlur(e)}
            />
            <div className="tagger-dropdown" style={{ display: taggerSearchResults?.length > 0 ? 'block' : 'none' }}>
              {taggerSearchResults?.length && taggerSearchResults?.map((item, index) => {
                return (
                  <div className="tagger-item" onClick={(e) => onTaggerItemSelected(e, item)}>
                    <img src={item?.user_thumbnail || item?.image} alt="" width={30} height={30} />
                    <div>{item?.first_name + ' ' + item?.last_name}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="postmodal-header">
            <div className="user-avatar">
              <AvatarImageLoader user={user} height={50} width={50} />
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
                    paste_block_drop: true,
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
                  initialValue=""
                  onEditorChange={(e) => setContent(editorRefTinyMCE.current ? editorRefTinyMCE.current.getContent() : "")}
                  onFocus={(e) => setRequireContent(false)}
                  onKeyDown={(e) => handleKeyDown(e)}
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
                let images = postAttachments ? postAttachments.filter(item => item.resource_type == "post_attachment_image") : [];
                if (images.length >= 5) {
                  alert("Can't upload more than five images.");
                  return false;
                }
                setAllowType("image");
                setImagePickerOpen(true);
              }}>
                <FiCamera />
              </div>
              {/* <div className="item" onClick={() => {
                setAllowType("image");
                setImagePickerOpen(true);
              }}>
                <FiImage />
              </div> */}
              <div className="item" onClick={() => {
                let videos = postAttachments ? postAttachments.filter(item => item.resource_type == "post_attachment_video") : [];
                if (videos.length >= 1) {
                  alert("Can't upload more than one video.");
                  return false;
                }
                setAllowType("video");
                setImagePickerOpen(true);
              }}>
                <FiVideo />
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
            postAttachments={postAttachments}
            setPostAttachments={setPostAttachments}
            allowType={allowType}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
