import { ClassNames } from "@emotion/react";
import { useEffect, useState } from "react";

const DelayedOutput = ({ children, delay }) => {
    const [showDelayed, setShowDelayed] = useState(false);

    useEffect(() => {
        window.setTimeout(() => {
            setShowDelayed(true);
        }, (delay ? delay : 250));
    }, []);

    return (
        <div className={showDelayed ? "show-delayed" : ""} style={{ visibility: "hidden" }}>
            {children}
        </div>
    );
};

export default DelayedOutput;
