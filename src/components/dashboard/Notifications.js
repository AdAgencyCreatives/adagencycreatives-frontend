import Paginate from "../../components/Paginate";
import { Context as AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "../TimeAgo";
import useNotifications from "../../hooks/useNotifications";
import { IoEyeOffOutline, IoEyeOutline, IoTimeOutline } from "react-icons/io5";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";

const Notifications = () => {
    const { notifications, meta, loading, getNotifications, markAsReadNotifications } = useNotifications();
    const { state: { user } } = useContext(AuthContext);
    const paginate = (page) => {
        getNotifications(user.uuid, page);
    };

    const handleMarkAsRead = async (notification_id) => {
        await markAsReadNotifications(notification_id);
        getNotifications(user.uuid, meta.current_page);
    };

    return (
        <>
            {loading ? (
                <div className="center-page">
                    <CircularProgress />
                    <span>Loading ...</span>
                </div>
            ) : (
                <div className="card notification_sidebar">
                    <div className="card-title">Notifications</div>
                    {notifications?.length > 0 ? (
                        <div className="notif-list">
                            {notifications.map((notification) => {
                                return (
                                    <div className="notif-item-dashboard d-flex gap-2 align-items-start" key={notification.uuid}>
                                        <div className="notif-details">
                                            <div className="notif-content text-dark m-0" dangerouslySetInnerHTML={{ __html: notification.message }}></div>
                                            <div className="notif-time">
                                                <IoTimeOutline />
                                                <TimeAgo datetime={notification.created_at} />
                                            </div>
                                        </div>
                                        <div className="notif-actions">
                                            <Tooltip title="Mark as Read">
                                                <IconButton size='small' onClick={() => handleMarkAsRead(notification.uuid)}>
                                                    <IoEyeOutline />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                )
                            })}
                            {meta?.total > 9 && <Paginate meta={meta} paginate={paginate} title={"notifications"} />}
                        </div>
                    ) : (
                        <div className="no_result">
                            {/* <p>Please try again. No exact results found.</p> */}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
export default Notifications;