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
            const bindings = {
                ENTER: {
                    key: "Enter",
                    shiftKey: true,
                    handler: function (range, context) {
                        const quill = editorRef.current;
                        if (!quill) return true;

                        // Use Delta to insert a soft line break
                        quill.updateContents(
                            new Quill.import('delta')()
                            .retain(range.index)
                            .delete(range.length)
                            .insert('\n'),
                            'user'
                        );

                        // Move cursor after the inserted newline
                        quill.setSelection(range.index + 1, Quill.sources.SILENT);

                        return false;
                    }
                }
            };

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
                    ],
                    keyboard: {
                        bindings: bindings
                    }
                }
            });

            editorRef.current.clipboard.dangerouslyPasteHTML(0, value);

            editorRef.current.on('text-change', () => {
                let content = editorRef.current.root.innerHTML;
                content = content.replace(/\n/g, "<br>");
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
