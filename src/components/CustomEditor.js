import TipTapEditor from './TipTapEditor';

const CustomEditor = ({ value, setValue, onValueChange = false, enableAdvanceEditor = true, placeholder = "", key = "", height = 250 }) => {

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
