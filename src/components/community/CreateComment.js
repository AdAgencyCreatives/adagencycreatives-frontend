import { IoCloseCircleSharp, } from "react-icons/io5";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import Divider from "../Divider";
import ImagePicker from "./Modals/ImagePicker";
import { useContext, useEffect, } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { containsOffensiveWords } from "../../helpers/functions";
import { Context as CommunityContext } from "../../context/CommunityContext";
import Placeholder from "../../assets/images/placeholder.png";
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import { CircularProgress } from "@mui/material";
import ContentEditable from 'react-contenteditable'
import { Context as CreativesContext } from "../../context/CreativesContext";
import { sendLoungeMentionNotifications } from "../../context/NotificationsDataContext";
import AvatarImageLoader from "../AvatarImageLoader";

const CreateComment = (props) => {

  const taggerRef = useRef(null);
  const editorRefTinyMCE = useRef(null);

  const [requireContent, setRequireContent] = useState(false);
  const [taggerOpened, setTaggerOpened] = useState(false);
  const [taggerSearchText, setTaggerSearchText] = useState("");
  const [taggerSearchResults, setTaggerSearchResults] = useState(null);
  const [taggerPosLeft, setTaggerPosLeft] = useState(0);
  const [taggerPosTop, setTaggerPosTop] = useState(0);
  const [taggerUsers, setTaggerUsers] = useState([]);
  const [allowType, setAllowType] = useState("image");
  const [postAttachments, setPostAttachments] = useState([]);

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
      if (e && e.keyCode == 50 && e.shiftKey) { /* i.e., pressed '@' */
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
      if (e && e.keyCode == 50) { /* i.e., pressed '@' */
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

  const {
    state: { token, user },
  } = useContext(AuthContext);

  const {
    state: { formSubmit, },
    saveComment, setHaltRefresh,
  } = useContext(CommunityContext);

  const {
    getLoungeCreativesForTag,
  } = useContext(CreativesContext);

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

    saveComment({
      "user_id": user.uuid,
      "post_id": props.post.id,
      "content": content
    }, async (response) => {
      if (taggerUsers.length > 0) {
        const notifications_data = {
          "sender_id": response.data.data.user_id,
          "recipient_ids": taggerUsers,
          "post_id": response.data.data.id,
          "notification_type": 'lounge_mention',
          "notification_text": `${response.data.data.author} commented on you in his post`,
          "send_email": "yes",
        };
        let result = await sendLoungeMentionNotifications(notifications_data);
        console.log(result);
      }
      setTaggerUsers([]);
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
          <AvatarImageLoader user={user} height={40} width={40} />
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
                  }}
                  initialValue=""
                  onEditorChange={(e) => setContent(editorRefTinyMCE.current ? editorRefTinyMCE.current.getContent() : "")}
                  onFocus={(e) => setRequireContent(false)}
                  onKeyDown={(e) => handleKeyDown(e)}
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
              <div className="item" onClick={() => {
                setAllowType("image");
                setImagePickerOpen(true);
              }}>
                <FiCamera />
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
            </div> */}
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
          <ImagePicker
            open={imagePickerOpen}
            handleImagePickerClose={() => setImagePickerOpen(false)}
            allowType={allowType}
          />
        </div>
      </Modal >
    </div >
  );
};

export default CreateComment;
