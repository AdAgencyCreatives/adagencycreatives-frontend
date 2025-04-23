import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { CircularProgress } from '@mui/material';
import "../styles/Editor.css";

const Embed = Quill.import('blots/embed');

class BrBlot extends Embed {
  static create() {
    return super.create();
  }
}

BrBlot.blotName = 'break';
BrBlot.tagName = 'br';

Quill.register(BrBlot);

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
                        quill.insertEmbed(range.index, 'break', true); // insert <br>
                        quill.setSelection(range.index + 1);

                        console.log('working!');
                        // return false;
                    }
                }
            };

            editorRef.current = new Quill(`#${editorId}`, {
                theme: 'snow',
                placeholder,
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                    ],
                    keyboard: {
                        bindings: bindings
                    },                  
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
