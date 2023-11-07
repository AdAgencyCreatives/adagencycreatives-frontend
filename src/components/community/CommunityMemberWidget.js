import Placeholder from "../../assets/images/placeholder.png";
import { IoEarth, IoBookmarkOutline, IoLocationOutline, IoMailOpen, IoPersonAdd, IoClose, IoCloseSharp, IoCheckmarkCircleSharp, IoBandageOutline, IoBanSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { getSingleFriendship, requestFriendship, respondFriendship } from "../../context/FriendsDataContext";
import MessageModal from "../MessageModal";

import SlidingMessage from "../../components/SlidingMessage";
import { Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { saveNotification } from "../../context/NotificationsDataContext";

const CommunityMemberWidget = (props) => {

    const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
    const [loadingFriendshipRecord, setLoadingFriendshipRecord] = useState(false);
    const [hasFriendshipRecord, setHasFriendshipRecord] = useState(false);
    const [friendshipRecord, setFriendshipRecord] = useState(null);
    const [friendshipRequestResult, setFriendshipRequestResult] = useState({ "status": "none", "data": null });
    const [loadingFriendRequestRecord, setLoadingFriendRequestRecord] = useState(false);
    const [hasFriendRequestRecord, setHasFriendRequestRecord] = useState(false);
    const [friendRequestRecord, setFriendRequestRecord] = useState(null);

    const [slidingMessage, setSlidingMessage] = useState("");

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    const friendship_statuses = {
        "pending": "Pending",
        "accepted": "Accepted",
        "declined": "Declined",
        "cancelled": "Cancelled",
    };

    const showMessageModal = (type, title, message, data) => {
        setMessageModalOptions({ "open": true, "type": type, "title": title, "message": message, "data": data });
    };

    const {
        state: { role, user, token },
    } = useContext(AuthContext);

    useEffect(() => {
        if (friendshipRequestResult && friendshipRequestResult.status) {
            if (friendshipRequestResult.status == "success") {
                showMessageModal("success", "Thanks!", friendshipRequestResult.data.message, null);
            } else if (friendshipRequestResult.status == "error") {
                if (friendshipRequestResult.data) {
                    showMessageModal("error", "Oops!", friendshipRequestResult.data.message, null);
                } else {
                    showMessageModal("error", "Oops!", "Unexpected error occured.", null);
                }

            }
        }
    }, [friendshipRequestResult]);

    useEffect(() => {
        if (user) {
            getSingleFriendshipAsync();
            getSingleFriendRequestAsync();
        }
    }, [user]);

    const getSingleFriendshipAsync = async () => {
        setLoadingFriendshipRecord(true);
        let result = await getSingleFriendship(user.uuid, props.creative.user_id);
        setLoadingFriendshipRecord(false);
        setFriendshipRecord(result);
        setHasFriendshipRecord(result ? true : false);
    };

    const getSingleFriendRequestAsync = async () => {
        setLoadingFriendRequestRecord(true);
        let result = await getSingleFriendship(props.creative.user_id, user.uuid);
        setLoadingFriendRequestRecord(false);
        setFriendRequestRecord(result);
        setHasFriendRequestRecord(result ? true : false);
    };

    const requestFriendshipAsync = async (creative) => {
        let result = await requestFriendship({
            "receiver_id": creative.user_id
        });
        getSingleFriendshipAsync();
        setFriendshipRequestResult(result);
    };

    const handleRequestFriendship = (evt, creative) => {
        requestFriendshipAsync(creative);
        sendFriendshipRequestedNotificationAsync(creative);
    };

    const handleRespondFriendship = (evt, creative, status) => {
        respondFriendshipAsync(creative, status);
        sendFriendshipRespondedNotificationAsync(creative, status);
    };

    const cancelFriendshipAsync = async (creative) => {
        let result = await respondFriendship({
            "request_id": friendshipRecord.id,
            "response": "cancelled"
        });
        getSingleFriendshipAsync();
        setFriendshipRequestResult(result);
    };

    const respondFriendshipAsync = async (creative, status) => {
        let result = await respondFriendship({
            "request_id": friendRequestRecord.id,
            "response": status
        });
        getSingleFriendshipAsync();
        setFriendshipRequestResult(result);
    };

    const handleCancelFriendship = (evt, creative) => {
        cancelFriendshipAsync(creative);
    };

    const sendFriendshipRequestedNotificationAsync = async (creative) => {
        let result = await saveNotification({
            "user_id": creative.user_id,
            "type": "friendship_requested",
            "message": user.first_name + " " + user.last_name + " has sent friendship request.",
            "body": "{}"
        });
    };

    const sendFriendshipRespondedNotificationAsync = async (creative, status) => {
        let result = await saveNotification({
            "user_id": creative.user_id,
            "type": "friendship_responded",
            "message": user.first_name + " " + user.last_name + " has " + status + " your friendship request.",
            "body": "{}"
        });
    };

    return (
        <>
            <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
            <SlidingMessage message={slidingMessage} setMessage={setSlidingMessage} delay={4000} />
            <div className="col-md-4 col-sm-6 col-12">
                <div className="sliderContent members-list">
                    <img
                        src={props.creative.profile_image || Placeholder}
                        className="candidateLogo"
                        width={150}
                        height={150}
                        alt=""
                    />
                    <div className="member-data">
                        <div className="agencyName">
                            <Link className="text-dark" to={`/creative/${props.creative.slug}`}>
                                {props.creative.name}
                            </Link></div>
                        <div className="position">{props.creative.title}</div>
                        {props.creative.location && (
                            <div className="job-location location">
                                {props.creative.location && (props.creative.location.state || props.creative.location.city) ? (
                                    <IoLocationOutline />
                                ) : (
                                    <></>
                                )}
                                <Link to={`/creative-location/${props.creative.location.state}`}>
                                    {props.creative.location.state}
                                </Link>
                                {props.creative.location && props.creative.location.state && props.creative.location.city ? (
                                    <span>,&nbsp;</span>
                                ) : (
                                    <></>
                                )}
                                <Link to={`/creative-location/${props.creative.location.city}`}>
                                    {props.creative.location.city}
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="user-actions">
                        {loadingFriendshipRecord || loadingFriendRequestRecord ? (
                            <CircularProgress />
                        ) : (<>
                            {(hasFriendshipRecord && friendshipRecord.status) || (hasFriendRequestRecord && friendRequestRecord && (friendRequestRecord.status == "accepted" || friendRequestRecord.status == "declined")) ? (<>
                                <Tooltip title="Friendship Status">
                                    <div className="friendship-request-status">
                                        {friendship_statuses[(friendshipRecord ? friendshipRecord.status : (friendRequestRecord ? friendRequestRecord.status : ""))]}
                                    </div>
                                </Tooltip>
                            </>) : (<></>)}
                            {hasFriendshipRecord && friendshipRecord.status == "pending" ? (<>
                                <Tooltip title="Cancel Friendship">
                                    <button className="btn btn-dark no-border" onClick={(e) => handleCancelFriendship(e, friendshipRecord)}>
                                        <IoCloseSharp />
                                    </button>
                                </Tooltip>
                            </>) : (<></>)}

                            {(!hasFriendshipRecord || friendshipRecord.status == "cancelled") && (!hasFriendRequestRecord) ? (<>
                                <Tooltip title="Request Friendship">
                                    <button className="btn btn-dark no-border" onClick={(e) => handleRequestFriendship(e, props.creative)}>
                                        <IoPersonAdd />
                                    </button>
                                </Tooltip>
                            </>) : (<></>)}

                            {hasFriendRequestRecord && !(friendRequestRecord.status == "accepted" || friendRequestRecord.status == "declined") ? (<>
                                <Tooltip title="Accept Friendship">
                                    <button className="btn btn-dark no-border" onClick={(e) => handleRespondFriendship(e, props.creative, "accepted")}>
                                        <IoCheckmarkCircleSharp />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Decline Friendship">
                                    <button className="btn btn-dark no-border" onClick={(e) => handleRespondFriendship(e, props.creative, "declined")}>
                                        <IoBanSharp />
                                    </button>
                                </Tooltip>
                            </>) : (<></>)}
                            <Tooltip title="View Messages">
                                <Link className="btn btn-dark no-border" to={"/messages/" + (props.creative.slug || "")}>
                                    <IoMailOpen />
                                </Link>
                            </Tooltip>
                        </>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommunityMemberWidget;