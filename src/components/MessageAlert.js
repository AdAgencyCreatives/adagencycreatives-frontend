import React, { useContext } from 'react';
import { Context } from "../context/AuthContext";

const MessageAlert = (props) => {
    const {
        hideMessageAlert,
    } = useContext(Context);

    const types = {
        "success": { title: "Success", alert: 'success' },
        "error": { title: "Error", alert: 'danger' },
        "info": { title: "Info", alert: 'primary' },
    };
    const handleClick = () => {
        hideMessageAlert();
    }
    return (
        <>
            {props.display == "true" &&
                <div className={`alert alert-${props.type ? types[props.type].alert : ''} alert-dismissible fade show`} role="alert">
                    <strong>{props.type ? types[props.type].title : ''}!</strong> {props.message || ''}.
                    <button type="button" onClick={() => handleClick()} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
        </>
    );
};

export default MessageAlert;
