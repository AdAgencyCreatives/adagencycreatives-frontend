import { IoEyeOffOutline, IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../../styles/Notifications.scss";
import { Context as AuthContext } from "../../context/AuthContext";
import { deleteNotification, getNotifications, updateNotification } from "../../context/NotificationsDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../TimeAgo";
import MessageModal from "../MessageModal";
import AvatarImageLoader from "../AvatarImageLoader";

import defaultAvatar from "../../assets/images/AdAgency.png";

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

    const onMarkAsReadAsync = async () => {
        let result = await updateNotification(props.notification.uuid);
        if (result) {
            showMessageModal("success", "Thanks!", "The notification is marked as read", null);
            if (props.loadNotifications) {
                props.loadNotifications();
            }
            if (props.onMarkRead) {
                props.onMarkRead(props.notification);
            }
        } else {
            showMessageModal("error", "Oops!", "Unfortunately not able to mark as read notification", null);
        }
    };

    const onDeleteAsync = async () => {
        let result = await deleteNotification(props.notification.uuid);
        if (result?.data?.uuid == props.notification.uuid) {
            showMessageModal("success", "Thanks!", "The notification is deleted", null);
            if (props.onDelete) {
                props.onDelete(props.notification);
            }
        } else {
            showMessageModal("error", "Oops!", "Unfortunately not able to delete notification", null);
        }
    };

    const handleOnClick = (e, action, read) => {
        if (action == "mark-as-read") {
            if (read) return;

            onMarkAsReadAsync();
        } else if (action == "delete") {
            onDeleteAsync();
        }
    };

    return (
        <>
            {props?.notification && (
                <>
                    <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} size="xs" />
                    <div className="notif-item">
                        <div className="user-avatar">
                            <AvatarImageLoader user={props.notification?.sender} height={50} width={50} defaultAvatar={defaultAvatar} />
                        </div>
                        <div className="notif-details">
                            <div className="username">{props.notification?.sender?.name || "Notification"}</div>
                            <div className="notif-time">
                                <IoTimeOutline />
                                <TimeAgo datetime={props.notification.created_at} />
                                {/* <UtcToLocalDateTime datetime={props.notification.created_at} /> */}
                            </div>
                            {/* <Link to={props.notification.link} className="notif-content text-dark"> */}
                            <div className="message" dangerouslySetInnerHTML={{ __html: props.notification?.message ?? '' }}></div>
                            {/* </Link> */}
                        </div>
                        <div className="notif-actions">
                            <Tooltip title={`${props.notification.read_at ? "Marked as Read" : "Mark as Read"}`}>
                                <IconButton onClick={(e) => handleOnClick(e, "mark-as-read", props.notification.read_at)}>
                                    {props.notification.read_at ? (
                                        <IoEyeOffOutline />
                                    ) : (
                                        <IoEyeOutline />
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={(e) => handleOnClick(e, "delete")}>
                                    <IoTrashOutline />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default NotificationWidget;