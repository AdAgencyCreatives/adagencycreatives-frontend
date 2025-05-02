import TipTapEditor from './TipTapEditor';

const CustomEditor = ({ value, setValue, onValueChange = false, enableAdvanceEditor = true, placeholder = "", height = 250, editorId = 'editor-container' }) => {

    return (
        <>
            {enableAdvanceEditor ? (
                <div className='custom-editor-container' >
                    <TipTapEditor
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (onValueChange) {
                                onValueChange(e.target.value);
                            }
                        }}
                        style={{ height: height }}
                    />
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
