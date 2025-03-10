import { IoCloseCircleSharp, } from "react-icons/io5";
import { FiImage, } from "react-icons/fi";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import Divider from "../Divider";
import { useContext, useEffect, } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { containsOffensiveWords } from "../../helpers/functions";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as GroupsContext } from "../../context/GroupsContext";
import { Editor } from '@tinymce/tinymce-react';
import { CircularProgress } from "@mui/material";
import ContentEditable from 'react-contenteditable'
import { FaPencil } from "react-icons/fa6";
import AvatarImageLoader from "../AvatarImageLoader";

const CreateGroup = (props) => {

    const queryParams = new URLSearchParams(window.location.search);
    const viewQueryParam = queryParams.get("view");

    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null);

    const inputRef = useRef(null);
    const editorRef = useRef(null);
    const editorLog = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getDescription());
        }
    };

    const {
        state: { token, user },
    } = useContext(AuthContext);

    const {
        showAlert,
    } = useContext(AlertContext);

    const {
        state: { formSubmit, },
        saveGroup,
    } = useContext(GroupsContext);

    const [open, setOpen] = useState(false);
    const [editorLoading, setEditorLoading] = useState(true);
    const [hasOffensiveWords, setHasOffensiveWords] = useState(false);
    const [useRichEditor, setUseRichEditor] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPicker, setShowPicker] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imagePickerOpen, setImagePickerOpen] = useState(false);
    const [groupVisibility, setGroupVisibility] = useState("0");
    const [preview, setPreview] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const groupStatuses = {
        "0": "public",
        "1": "private",
        "2": "hidden",
    };

    const doSaveGroup = () => {
        if (containsOffensiveWords(name)) {
            setHasOffensiveWords(true);
            return;
        }

        if (containsOffensiveWords(description)) {
            setHasOffensiveWords(true);
            return;
        }
        setHasOffensiveWords(false);

        saveGroup({
            "name": name,
            "description": description,
            "file": uploadedFile,
            "status": groupStatuses[groupVisibility],
            "reflect": viewQueryParam && viewQueryParam == "my" ? true : groupVisibility == "0",
        }, () => {
            props?.onSave && props.onSave();
        });
    };

    useEffect(() => {
        if (!formSubmit) {
            handleClose();
            setName("");
            setDescription("");
            setGroupVisibility("0");
            setPreview(null);
            setUploadedFile(null);
        }
    }, [formSubmit]);

    const onInputRef = (node) => {
        if (node) {
            inputRef.current = node;
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);

    useEffect(() => {
        setHasOffensiveWords(containsOffensiveWords(name));
    }, [name]);

    useEffect(() => {
        setHasOffensiveWords(containsOffensiveWords(description));
    }, [description]);

    useEffect(() => {
        if (useRichEditor) {
            const handler = (e) => {
                if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
                    e.stopImmediatePropagation();
                }
            };
            document.addEventListener("focusin", handler);
            return () => document.removeEventListener("focusin", handler);
        }
    }, []);

    const performInit = (evt, editor) => {
        setEditorLoading(false);
        editorRef.current = editor;
        editor.focus();
    };

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setUploadedFile(fileUploaded);

        const fileReader = new FileReader();

        fileReader.onload = function () {
            setPreview(fileReader.result);
        }

        fileReader.readAsDataURL(fileUploaded)
    };

    return (
        <>
            <div className="btn btn-dark" onClick={() => setOpen(true)} style={{ "cursor": "pointer" }}>
                <FaPencil color="#a4a4a4" />
                <span className="m-2">Create a Group</span>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="create-post-modal post-modal edit-group">
                    <div className="postmodal-header">
                        <div className="user-avatar">
                            <AvatarImageLoader user={user} height={50} width={50} />
                        </div>
                        <div className="user-meta">
                            <p className="username mb-0">{user ? user.first_name + ' ' + user.last_name : 'User'} :: New Group</p>
                        </div>
                        <div className="post-modal-close" onClick={() => handleClose()}>
                            <IoCloseCircleSharp />
                        </div>
                    </div>
                    <div className="postmodal-body">
                        <input ref={onInputRef} type="text" className="postmodal-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter group name" />
                        {useRichEditor ? (
                            <>
                                <div className={"d-" + (editorLoading ? 'show' : 'none')}>
                                    <CircularProgress />
                                </div>
                                <Editor
                                    onInit={(evt, editor) => performInit(evt, editor)}
                                    apiKey='niqd0bqfftqm2iti1rxdr0ddt1b46akht531kj0uv4snnaie'
                                    init={{
                                        height: 250,
                                        menubar: false,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                        description_style: 'body { font-family:Jost, Arial, sans-serify; font-size:14pt }',
                                        placeholder: 'Enter group description',
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
                                    onChange={(e) => setDescription(editorRef.current ? editorRef.current.getDescription() : "")}
                                />
                            </>
                        ) : (
                            <>
                                <ContentEditable
                                    className="postmodal-editor"
                                    html={description}
                                    placeholder="Enter group description"
                                    tagName="div"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </>
                        )}
                        <div className="group-visibility">
                            <span>Visibility:</span>
                            <select onChange={(e) => {
                                setGroupVisibility(e.target.value);
                            }}>
                                <option value="0" selected={groupVisibility == "public" ? "selected" : ""}>Public</option>
                                <option value="1" selected={groupVisibility == "private" ? "selected" : ""}>Private</option>
                                <option value="2" selected={groupVisibility == "hidden" ? "selected" : ""}>Hidden</option>
                            </select>
                        </div>
                        <div className="post-options d-flex">
                            <div className="item" onClick={() => {
                                handleClick();
                            }}>
                                <FiImage />
                            </div>
                            {preview && (
                                <p><img className="group-image-to-upload" src={preview} alt="Upload preview" /></p>
                            )}
                            <input
                                type="file"
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{ display: 'none' }} // Make the file input element invisible
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <Divider />
                    <div className="postmodal-footer">
                        <div className="postmodal-offensive-words">
                            {hasOffensiveWords && (
                                <div className="message">
                                    Your group includes offensive language. Please rephrase.
                                </div>
                            )}
                        </div>
                        <div className="postmodal-action">
                            {formSubmit && <CircularProgress />}
                            <button disabled={formSubmit ? "disabled" : ""} className={"btn btn-post" + (useRichEditor ? (!editorLoading ? ' d-show' : ' d-none') : "")} onClick={() => doSaveGroup()}>Add New Group</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CreateGroup;
