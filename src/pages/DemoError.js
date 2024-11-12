import * as React from "react";
import { useState } from "react";

const DemoError = (props) => {

    const [showError, setShowError] = useState(false);
    window.setTimeout(() => {
        setShowError(true);
    }, 3000);

    return (
        <div className="container offset-top fs-15" style={{ minHeight: '100vh' }}>
            <h3 style={{ textAlign: 'center' }}>Generating Demo Error...</h3>
            {showError && (
                <>
                    {props.invokeSomeError()}
                </>
            )}
        </div>
    );
};

export default DemoError;
