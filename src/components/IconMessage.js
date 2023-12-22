
import { useEffect, useState } from "react";
import InfoIconImage from "../assets/images/info-icon.png";

const IconMessage = (props) => {

    const [show, setShow] = useState('');

    useEffect(() => {
    }, []);

    return (
        <div className={"icon-message" + (show ? " show" : "")}>
            <div className="icon" onClick={(e) => setShow(state => !state)}>
                <img src={InfoIconImage} alt="Info" title="Click to expand/collapse information" />
            </div>
            <div className="message-container">
                <div className="message" dangerouslySetInnerHTML={{ __html: props?.message }}></div>
            </div>
        </div>
    );
};

export default IconMessage;
