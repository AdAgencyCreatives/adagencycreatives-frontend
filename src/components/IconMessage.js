
import { useEffect, useState } from "react";
import InfoIconImage from "../assets/images/info-icon.png";

const IconMessage = (props) => {

    useEffect(() => {
    }, []);

    return (
        <div className="icon-message">
            <div className="icon">
                <img src={InfoIconImage} alt="" />
            </div>
            <div className="message-container">
                <div className="message" dangerouslySetInnerHTML={{ __html: props?.message }}></div>
            </div>
        </div>
    );
};

export default IconMessage;
