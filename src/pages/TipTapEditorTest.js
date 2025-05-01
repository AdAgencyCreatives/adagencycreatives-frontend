import React, { useState } from 'react';
import TipTapEditor from '../components/TipTapEditor';

const TipTapEditorTest = () => {
    const [content, setContent] = useState(
        '<h2>About Me</h2><p>This is my <strong>profile</strong> information.</p><ul><li>Item 1</li><li>Item 2</li></ul>'
    );

    const handleEditorChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <div className="tip-tap-editor-test">
            <TipTapEditor
                value={content}
                onChange={handleEditorChange}
            />
            <button type='button' onClick={() => alert(content)}>Get</button>
        </div>
    );
}

export default TipTapEditorTest;