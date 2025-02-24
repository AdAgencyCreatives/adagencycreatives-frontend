
import { useEffect, useState } from "react";
import InfoIconImage from "../assets/images/info-icon.png";
import { IoClose } from "react-icons/io5";

const IconMessage = (props) => {

    const [show, setShow] = useState('');

    useEffect(() => {
    }, []);

    return (
        <div className={"icon-message" + (show ? " show" : "")}>
            <div className="icon" onClick={(e) => setShow(state => !state)}>
                <img src={InfoIconImage} alt="Info" title="Click to expand/collapse information" width={20} height={20} />
            </div>
            <div className="message-container">
                <IoClose className="close-info" onClick={(e) => setShow(state => !state)} />
                <div className="message" dangerouslySetInnerHTML={{ __html: props?.message }}></div>
            </div>
        </div>
    );
};

export default IconMessage;
