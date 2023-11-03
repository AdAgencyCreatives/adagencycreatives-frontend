import {
    IoPencilOutline, IoClose, IoCloseCircle, IoCloseCircleOutline, IoCloseCircleSharp,
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

const EditPost = (props) => {

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
        state: { feed_group, formSubmit },
        updatePost, setHaltRefresh,
    } = useContext(CommunityContext);

    const [open, setOpen] = useState(false);
    const [editorLoading, setEditorLoading] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPicker, setShowPicker] = useState(false);
    const [content, setContent] = useState("");
    const [imagePickerOpen, setImagePickerOpen] = useState(false);

    const doUpdatePost = () => {
        updatePost(props.post.id, {
            "content": content,
            "status": "published",
            "attachment_ids": []
        });
    };

    useEffect(() => {
        if (!formSubmit) {
            handleClose();
            if (props.onUpdatePost) {
                props.onUpdatePost();
            }
        }
    }, [formSubmit]);

    useEffect(() => {
        setContent(props.post.content);
    }, [props.post.content]);

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
                            <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'} :: Edit Post</p>
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
                                placeholder: 'What do you want to talk about?',
                            }}
                            initialValue={props.post.content}
                            onChange={(e) => setContent(editorRef.current ? editorRef.current.getContent() : "")}
                        />
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
                            <button className={"btn btn-post d-" + (!editorLoading ? 'show' : 'none')} onClick={() => doUpdatePost()}>Update Post</button>
                        </div>
                    </div>
                    <ImagePicker open={imagePickerOpen} handleImagePickerClose={() => setImagePickerOpen(false)} />
                </div>
            </Modal>
        </>
    );
};

export default EditPost;
