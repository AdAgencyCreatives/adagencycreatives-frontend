import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { CircularProgress } from '@mui/material';
import "../styles/Editor.css";

const CustomEditor = ({ value, setValue, onValueChange = false, enableAdvanceEditor = true, placeholder = "", height = 250, editorId = 'editor-container' }) => {
    const [loading, setLoading] = useState(true);
    const editorRef = useRef(null);

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
                    'align', 'indent'
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
                    ]
                }
            });

            console.log(value);

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
                    <div id={editorId} style={{ height: 'calc( 100% - 50px)' }}></div>
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
