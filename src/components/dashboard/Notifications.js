import Paginate from "../../components/Paginate";
import { CircularProgress } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";
import { Context as AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "../TimeAgo";
import useNotifications from "../../hooks/useNotifications";

const Notifications = () => {

    const { notifications, meta, loading, getNotifications } = useNotifications();
    const { state: { user } } = useContext(AuthContext);
    const paginate = (page) => {
        getNotifications(user.uuid, page);
    };

    return (
        <>
            {loading ? (
                <div className="center-page">
                    <CircularProgress />
                    <span>Loading ...</span>
                </div>
            ) : (
                <div className="card">
                    <div className="card-title">Notifications</div>
                    {notifications && notifications.length ? (
                        <div className="notif-list">
                            {notifications.map((notification) => {
                                return (
                                    <div className="notif-item-dashboard" key={notification.id}>
                                        <div className="notif-details">
                                            <Link to={notification.link} className="notif-content text-dark">{notification.message}</Link>
                                            <div className="notif-time">
                                                <IoTimeOutline />
                                                <TimeAgo datetime={notification.created_at} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {meta.total > 10 && <Paginate meta={meta} paginate={paginate} />}
                        </div>
                    ) : (
                        <div className="center-page">Sorry, nothing here.</div>
                    )}
                </div>
            )}
        </>
    );
}
export default Notifications;