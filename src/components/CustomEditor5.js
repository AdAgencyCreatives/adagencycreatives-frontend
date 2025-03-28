import { useEffect, useRef, useState, useContext } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { CircularProgress } from '@mui/material';
import "../styles/Editor.css";
import { Context as CreativesContext } from "../context/CreativesContext";

import {Mention, MentionBlot} from "quill-mention";

class StyledMentionBlot extends MentionBlot {
  static render(data) {
    const element = document.createElement("a");
    element.href = data.link;
    element.innerHTML = `<span>${data.value}</span>`;
    return element;
  }
}
StyledMentionBlot.blotName = "styled-mention";
Quill.register(StyledMentionBlot);
Quill.register({ "modules/mention": Mention });

const CustomEditor = ({ value, setValue, onValueChange = false, enableAdvanceEditor = true, placeholder = "", height = '250px', editorId = 'editor-container' }) => {
    const [loading, setLoading] = useState(true);
    const editorRef = useRef(null);

    const {
        getLoungeCreativesForTag,
    } = useContext(CreativesContext);

    async function suggestPeople(searchTerm) {
        let allPeople = await getLoungeCreativesForTag(searchTerm);

        return allPeople.map((item) => {
            return {
                id: item.uuid,
                value: item.name !== '' ? item.name : item.username,
                link: `/creative/${item.username}`,
                thumbnail: item.user_thumbnail
            }
        });
    }

    useEffect(() => {
        if (enableAdvanceEditor && !editorRef.current) {
            
            editorRef.current = new Quill(`#${editorId}`, {
                theme: 'snow',
                placeholder,
                formats: [
                    'bold', 'italic', 'underline', 'strike',
                    'header', 'size',
                    'list',
                    'link',
                    'blockquote', 'code-block',
                    'align', 'indent',
                    'styled-mention'
                ],
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // Bold, Italic, Underline, Strikethrough
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Blocks (Headers)
                        [{ size: [] }], // Font size
                        [{ list: 'ordered' }, { list: 'bullet' }], // Numbered & Bullet List
                        ['link'], // Links
                        ['blockquote', 'code-block'], // Code block
                        [{ align: [] }], // Text alignment
                        [{ indent: '-1' }, { indent: '+1' }], // Indent / Outdent
                        ['clean'], // Remove formatting
                    ],
                    mention: {
                        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                        mentionDenotationChars: ["@", "#"],
                        linkTarget: "_blank",
                        dataAttributes: ['id', 'value', 'link', 'thumbnail', 'disabled'],
                        blotName: 'styled-mention',
                        source: async function(searchTerm, renderList) {
                            // Show "Loading..." initially
                            renderList([{ id: "loading", value: "Loading...", link: "", thumbnail: "", disabled: true }]);
                            const matchedPeople = await suggestPeople(searchTerm);
                            renderList(matchedPeople);
                        },
                        renderItem: (item, searchTerm) => {
                            // Create mention item container
                            const container = document.createElement('div');
                            container.classList.add('mention-item');

                            let thumbnail = '';

                            if (item.thumbnail !== '') {
                                // Create thumbnail image
                                thumbnail = document.createElement('img');
                                thumbnail.src = item.thumbnail || '/default-thumbnail.png'; // Default thumbnail
                                thumbnail.alt = item.value;
                                thumbnail.classList.add('mention-thumbnail');
                            } else {
                                // Create thumbnail image
                                thumbnail = document.createElement('div');
                                thumbnail.textContent = item.value ? item.value.charAt(0).toUpperCase() : '';
                                thumbnail.classList.add('mention-thumbnail');
                            }

                            // Create text span
                            const text = document.createElement('span');
                            text.textContent = item.value;

                            // Append elements to container
                            if (item.value !== 'Loading...') 
                                container.appendChild(thumbnail);

                            container.appendChild(text);

                            return container;
                        },
                    }
                }
            });

            editorRef.current.clipboard.dangerouslyPasteHTML(0, value);

            editorRef.current.on('text-change', () => {
                const content = editorRef.current.root.innerHTML;
                setValue(content);
                if (onValueChange) {
                    onValueChange(content);
                }
            });
        }
        setLoading(false);
    }, [enableAdvanceEditor, editorId]);

    return (
        <>
            {enableAdvanceEditor ? (
                <div className='custom-editor-container' style={{ height: height }}>
                    <div id={editorId} className="ql-editor-container"></div>
                    <div className={"circular-progress d-" + (loading ? 'show' : 'none')}>
                        <CircularProgress />
                    </div>
                </div>
            ) : (
                <textarea
                    className="form-control"
                    placeholder={placeholder}
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
            )}
        </>
    );
};

export default CustomEditor;
