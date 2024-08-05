import { CircularProgress } from '@mui/material';
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';

const CustomEditor = ({ value, setValue, onValueChange = false, enableAdvanceEditor = true, placeholder = "", key = "" }) => {

    const [loading, setLoading] = useState(true);

    const editorRefTinyMCE = useRef(null);

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
        setLoading && setLoading(false);

        editorRefTinyMCE.current = editor;
        editor.focus();
    };

    if (!enableAdvanceEditor) {
        setLoading(false);
    }

    return (
        <>
            {enableAdvanceEditor ? (
                <div className='custom-editor-container'>
                    <EditorTinyMCE
                        key={key}
                        onInit={(evt, editor) => performInitTinyMCE(evt, editor)}
                        apiKey='j1xmsbgy7mm4sd2czch7suv0680w3flyx8n2daatar52pxm3'
                        init={{
                            height: 250,
                            menubar: false,
                            // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                            // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount',
                            toolbar: 'bold italic underline | numlist bullist link | removeformat',
                            content_css: ['https://fonts.googleapis.com/css?family=Jost:400,500,600,700,800&#038;subset=latin%2Clatin-ext'],
                            font_family_formats: 'JOST=JOST',
                            content_style: 'body, * { font-family: "JOST", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important; font-size: 14pt } a { color: #d3a11f; cursor: pointer; } a:hover { color: #000; }',
                            placeholder: placeholder,
                            paste_block_drop: true
                        }}
                        initialValue=""
                        value={value}
                        onEditorChange={(e) => {
                            let newValue = editorRefTinyMCE.current ? editorRefTinyMCE.current.getContent() : "";
                            setValue(newValue);
                            onValueChange && onValueChange(newValue);
                        }}
                    />
                    <div className={"circular-progress d-" + (loading ? 'show' : 'none')}>
                        <CircularProgress />
                    </div>
                </div>
            ) : (
                <textarea
                    key={key}
                    className="form-control"
                    placeholder={placeholder}
                    required="required"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
            )}
        </>
    );
};

export default CustomEditor;
