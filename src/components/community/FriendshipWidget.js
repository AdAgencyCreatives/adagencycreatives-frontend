import Placeholder from "../../assets/images/placeholder.png";
import { IoEarth, IoBookmarkOutline, IoLocationOutline, IoMailOpen, IoPersonAdd, IoClose, IoCloseSharp, IoCheckmarkCircleSharp, IoBandageOutline, IoBanSharp, IoPersonRemove, IoPerson, IoChevronDown, IoChevronDownCircle, IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext, logActivity } from "../../context/AuthContext";
import { getSingleFriendship, requestFriendship, respondFriendship, unfriend } from "../../context/FriendsDataContext";
import MessageModal from "../MessageModal";

import SlidingMessage from "../../components/SlidingMessage";
import { Dialog, Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { saveNotification } from "../../context/NotificationsDataContext";

const FriendshipWidget = (props) => {

    const queryParams = new URLSearchParams(window.location.search);
    const friendshipsParam = queryParams.get("friendships");

    const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
    const [loadingFriendshipRecord, setLoadingFriendshipRecord] = useState(false);
    const [hasFriendshipRecord, setHasFriendshipRecord] = useState(false);
    const [friendshipRecord, setFriendshipRecord] = useState(null);
    const [friendshipRequestResult, setFriendshipRequestResult] = useState({ "status": "none", "data": null });
    const [loadingFriendRequestRecord, setLoadingFriendRequestRecord] = useState(false);
    const [hasFriendRequestRecord, setHasFriendRequestRecord] = useState(false);
    const [friendRequestRecord, setFriendRequestRecord] = useState(null);
    const [statusClicked, setStatusClicked] = useState(false);
    const [isOpenUnfriendDialog, setIsOpenUnfriendDialog] = useState(false);
    const [changingFriendshipStatus, setChangingFriendshipStatus] = useState(false);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    const friendship_statuses = {
        "pending": "Pending",
        "accepted": "Friends",
        "declined": "Declined",
        "cancelled": "Cancelled",
        "unfriended": "Unfriended",
    };

    const showMessageModal = (type, title, message, data) => {
        setMessageModalOptions({ "open": true, "type": type, "title": title, "message": message, "data": data });
    };

    const {
        state: { role, user, token },
    } = useContext(AuthContext);

    const isOwnProfile = user?.uuid == props.creative?.user_id;

    useEffect(() => {
        if (friendshipRequestResult && friendshipRequestResult.status) {
            if (friendshipRequestResult.status == "success") {
                showMessageModal("success", "Thanks!", friendshipRequestResult.data.message, null);
                // if(friendshipsParam && friendshipsParam == "requests" && props.setVisibleAfterProcess) {
                //     props.setVisibleAfterProcess(false);
                // }
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
        logActivity(user.uuid, "lounge_friendship_requested", "Friendship requested with Creative: " + creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + creative.id + "'}");
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

    const cancelFriendshipAsync = async (friendshipRecord, creative) => {
        let result = await respondFriendship({
            "request_id": friendshipRecord.id,
            "response": "cancelled"
        });
        logActivity(user.uuid, "lounge_friendship_responded", "Friendship cancelled with Creative: " + creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + creative.id + "', status:'cancelled'}");
        setFriendshipRequestResult(result);
        getSingleFriendshipAsync();
    };

    const unfriendAsync = async (creative) => {
        let result = await unfriend({
            "friend_id": creative.user_id
        });
        setChangingFriendshipStatus(false);
        setIsOpenUnfriendDialog(false);
        showMessageModal("success", "Thanks!", result.data.message, null);
        logActivity(user.uuid, "lounge_friendship_responded", "Unfriended with Creative: " + creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + creative.id + "', status:'cancelled'}");
        getSingleFriendshipAsync();
        getSingleFriendRequestAsync();
    };

    const respondFriendshipAsync = async (creative, status) => {
        let result = await respondFriendship({
            "request_id": friendRequestRecord.id,
            "response": status
        });
        logActivity(user.uuid, "lounge_friendship_responded", "Friendship " + status + " with Creative: " + creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + creative.id + "', status:'" + status + "'}");
        setFriendshipRequestResult(result);
        getSingleFriendRequestAsync();
    };

    const handleCancelFriendship = (evt, friendshipRecord, creative) => {
        cancelFriendshipAsync(friendshipRecord, creative);
        sendFriendshipRespondedNotificationAsync(creative, "cancelled");
    };

    const handleUnfriend = (evt, creative) => {
        unfriendAsync(creative);
        sendFriendshipRespondedNotificationAsync(creative, "unfriended");
    };

    const sendFriendshipRequestedNotificationAsync = async (creative) => {
        let result = await saveNotification({
            "user_id": creative.user_id,
            "type": "lounge_friends_activity",
            "message": user.first_name + " " + user.last_name + " has sent friendship request.",
            "body": "{activity_key:'lounge_friendship_requested'}"
        });
    };

    const sendFriendshipRespondedNotificationAsync = async (creative, status) => {
        let result = await saveNotification({
            "user_id": creative.user_id ? creative.user_id : creative.user.uuid,
            "type": "lounge_friends_activity",
            "message": user.first_name + " " + user.last_name + " has " + status + (status == "cancelled" ? "" : " your") + " friendship request.",
            "body": "{activity_key:'lounge_friendship_responded'}"
        });
    };

    const handleCloseUnfriendDialog = () => {
        setChangingFriendshipStatus(false);
        setIsOpenUnfriendDialog(false);
    };

    const handleClickUnfriendDialog = () => {
        setChangingFriendshipStatus(!changingFriendshipStatus);
        handleUnfriend(null, props.creative);
    };

    return (
        <>
            {!isOwnProfile ? (
                <>
                    <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} size="xs" />
                    <Dialog
                        open={isOpenUnfriendDialog}
                        onClose={handleCloseUnfriendDialog}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        scroll="body"
                    >
                        <div className="auth-modal">
                            <div className="auth-header"></div>
                            <div className="auth-body">
                                <div className="job-apply-email-form-wrapper">
                                    <div className="inner">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                                                Change Friendship Status?
                                            </h3>
                                            <button
                                                className="border-0 bg-transparent text-primary"
                                                onClick={handleCloseUnfriendDialog}>
                                                <IoCloseOutline size={30} />
                                            </button>
                                        </div>
                                        <p>Once you click below, you will no longer have a friendship
                                            permissions with this creative. Profile permissions will be limited,
                                            and if your profile status is hidden, they will no longer be able to
                                            see you.</p>
                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                            <span>{changingFriendshipStatus && <CircularProgress size={50} />}</span>
                                            <button disabled={changingFriendshipStatus} style={{ cursor: changingFriendshipStatus ? 'not-allowed' : 'pointer' }} className="btn btn-gray btn-hover-primary p-3 px-5 ls-3 text-uppercase" onClick={handleClickUnfriendDialog}>
                                                Confirm Unfriend
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                    {loadingFriendshipRecord || loadingFriendRequestRecord ? (
                        <CircularProgress />
                    ) : (<>
                        {(hasFriendshipRecord && friendshipRecord?.status?.length > 0 && friendshipRecord?.status == "accepted") || (hasFriendRequestRecord && friendRequestRecord?.status?.length > 0 && friendRequestRecord.status == "accepted") ? (<>
                            {props?.header ? (<>
                                <div style={{ position: 'relative', cursor: 'pointer' }} className="friendship-request-status" onClick={(e) => setStatusClicked(!statusClicked)}>
                                    {friendship_statuses[(friendshipRecord ? friendshipRecord.status : (friendRequestRecord ? friendRequestRecord.status : ""))]}
                                    &nbsp;<IoChevronDownCircle style={{ fill: statusClicked ? '#000' : '#fff' }} />

                                    {statusClicked && (
                                        <button style={{ zIndex: 9999, position: 'absolute', width: '100%', height: '100%', left: '0px', top: '50px' }} className="btn btn-dark no-border" onClick={(e) => setIsOpenUnfriendDialog(true)}>
                                            Unfriend
                                        </button>
                                    )}
                                </div>
                            </>) : (<>
                                <Tooltip title="Friendship Status">
                                    <div className="friendship-request-status">
                                        {friendship_statuses[(friendshipRecord ? friendshipRecord.status : (friendRequestRecord ? friendRequestRecord.status : ""))]}
                                    </div>
                                </Tooltip>
                            </>)}
                        </>) : (<></>)}

                        {hasFriendshipRecord && friendshipRecord.status == "pending" ? (<>
                            <Tooltip title="Cancel Friendship">
                                <button style={{ position: 'relative' }} className="btn btn-dark no-border" onClick={(e) => handleCancelFriendship(e, friendshipRecord, props.creative)}>
                                    <IoPerson />
                                    <span style={{ position: 'absolute', top: '6px', right: '4px' }}><IoCloseSharp /></span>
                                </button>
                            </Tooltip>
                        </>) : (<></>)}

                        {(!hasFriendshipRecord || (hasFriendshipRecord && (friendshipRecord.status == "declined" || friendshipRecord.status == "cancelled" || friendshipRecord.status == "unfriended"))) && (!hasFriendRequestRecord || (hasFriendRequestRecord && friendRequestRecord.status == "unfriended")) ? (<>
                            <Tooltip title="Request Friendship">
                                <button className="btn btn-dark no-border" onClick={(e) => handleRequestFriendship(e, props.creative)}>
                                    <IoPersonAdd />
                                </button>
                            </Tooltip>
                        </>) : (<></>)}

                        {hasFriendRequestRecord && !(friendRequestRecord.status == "accepted" || friendRequestRecord.status == "declined" || friendRequestRecord.status == "unfriended") ? (<>
                            <Tooltip title="Add Friend">
                                <button className="btn btn-dark no-border" onClick={(e) => handleRespondFriendship(e, props.creative, "accepted")}>
                                    <IoPersonAdd />
                                </button>
                            </Tooltip>
                            <Tooltip title="Remove Friend">
                                <button className="btn btn-dark no-border" onClick={(e) => handleRespondFriendship(e, props.creative, "declined")}>
                                    <IoPersonRemove />
                                </button>
                            </Tooltip>
                        </>) : (<></>)}

                        {!props?.header && ((hasFriendshipRecord && friendshipRecord.status == "accepted") || (hasFriendRequestRecord && friendRequestRecord.status == "accepted")) ? (<>
                            <Tooltip title="Remove Friend">
                                <button className="btn btn-dark no-border" onClick={(e) => handleUnfriend(e, props.creative)}>
                                    <IoPersonRemove />
                                </button>
                            </Tooltip>
                        </>) : (<></>)}

                    </>)}
                    {/* <br />
            {user.uuid}<br />
            {props.creative.user_id} */}
                </>
            ) : (<></>)}
        </>
    );
};

export default FriendshipWidget;