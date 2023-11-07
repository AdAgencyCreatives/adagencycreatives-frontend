import Placeholder from "../../assets/images/placeholder.png";
import { IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../../styles/Notifications.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import { getNotifications } from "../../context/NotificationsDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../TimeAgo";
import UtcToLocalDateTime from "../UtcToLocalDateTime";
import MessageModal from "../MessageModal";


const NotificationWidget = (props) => {

    const [isMounted, setIsMounted] = useState(false);
    const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
    const showMessageModal = (type, title, message, data) => {
        setMessageModalOptions({ "open": true, "type": type, "title": title, "message": message, "data": data });
    };

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);


    const {
        state: { role, user, token },
    } = useContext(AuthContext);


    useEffect(() => {
        if (user) {
        }
    }, [user]);

    return (
        <>
            <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
            <div className="notif-item">
                <div className="user-avatar">
                    <img src={props.notification.user.image || Placeholder} alt="" height={50} width={50} />
                </div>
                <div className="notif-details">
                    <div className="username">{props.creative ? props.creative.name : ""}</div>
                    <div className="notif-time">
                        <IoTimeOutline />
                        <TimeAgo datetime={props.notification.created_at} />
                        <UtcToLocalDateTime datetime={props.notification.created_at} />
                    </div>
                    <Link to={props.notification.link} className="notif-content text-dark">
                        {props.notification.message}
                    </Link>
                </div>
                <div className="notif-actions">
                    <Tooltip title="Mark as Read">
                        <IconButton>
                            <IoEyeOutline />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton>
                            <IoTrashOutline />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default NotificationWidget;