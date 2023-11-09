import Placeholder from "../../assets/images/placeholder.png";
import { IoEyeOffOutline, IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../../styles/Activities.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import { deleteActivity, getActivities, updateActivity } from "../../context/ActivitiesDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../TimeAgo";
import UtcToLocalDateTime from "../UtcToLocalDateTime";
import MessageModal from "../MessageModal";


const ActivityWidget = (props) => {

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
        let result = await updateActivity(props.activity.uuid);
        if (result) {
            showMessageModal("success", "Thanks!", "The activity is marked as read", null);
            if (props.loadActivities) {
                props.loadActivities();
            }
        } else {
            showMessageModal("error", "Oops!", "Unfortunately not able to mark as read activity", null);
        }
    };

    const onDeleteAsync = async () => {
        let result = await deleteActivity(props.activity.uuid);
        if (result) {
            showMessageModal("success", "Thanks!", "The activity is deleted", null);
            if (props.loadActivities) {
                props.loadActivities();
            }
        } else {
            showMessageModal("error", "Oops!", "Unfortunately not able to delete activity", null);
        }
    };

    const handleOnClick = (e, action) => {
        if (action == "mark-as-read") {
            onMarkAsReadAsync();
        } else if (action == "delete") {
            onDeleteAsync();
        }
    };

    return (
        <>
            <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
            <div className="notif-item">
                <div className="user-avatar">
                    <img src={props.activity.user.image || Placeholder} alt="" height={50} width={50} />
                </div>
                <div className="notif-details">
                    <div className="username">{props.creative ? props.creative.name : ""}</div>
                    <div className="notif-time">
                        <IoTimeOutline />
                        <TimeAgo datetime={props.activity.created_at} />
                        {/* <UtcToLocalDateTime datetime={props.activity.created_at} /> */}
                    </div>
                    <Link to={props.activity.link} className="notif-content text-dark">
                        {props.activity.message}
                    </Link>
                </div>
                <div className="notif-actions">
                    <Tooltip title="Mark as Read">
                        <IconButton onClick={(e) => handleOnClick(e, "mark-as-read")}>
                            {props.activity.read_at ? (
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
    );
};

export default ActivityWidget;