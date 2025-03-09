import Placeholder from "../../assets/images/placeholder.png";
import { IoBanSharp, IoCloseCircleSharp, IoEyeOffOutline, IoEyeOutline, IoPencil, IoRemoveCircleSharp, IoTimeOutline, IoTrashOutline, IoTrashSharp } from "react-icons/io5";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import "../../styles/Groups.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import { joinGroup, leaveGroup, getGroupMembership, getGroupInvitation, leaveMembership } from "../../context/GroupMembersDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../TimeAgo";
import UtcToLocalDateTime from "../UtcToLocalDateTime";
import MessageModal from "../MessageModal";
import { FaEarthAmericas, FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import Nathan from "../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import EditGroup from "./EditGroup";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import ConfirmModal from "./Modals/ConfirmModal";
import { saveNotification } from "../../context/NotificationsDataContext";

const GroupWidget = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const [openConfirmLeaveModal, setOpenConfirmLeaveModal] = useState(false);
    const [memberRole, setMemberRole] = useState("");
    const [groupMembership, setGroupMembership] = useState(null);

    const group_statuses = {
        "public": "Public",
        "private": "Private",
        "hidden": "Hidden"
    };

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
        if (user && props.group) {
            getGroupMembershipAsync(props.group.uuid, user.uuid);
        }
    }, [user, props.group]);

    const getGroupMembershipAsync = async (group_id, user_id) => {
        const result = await getGroupMembership(group_id, user_id);
        if (result) {
            setMemberRole(result ? result.role : "");
            setGroupMembership(result)
            setIsLoading(false);
        } else if (props?.group?.status == 'private') {
            getGroupInvitationAsync(group_id, user_id);
        } else {
            setIsLoading(false);
        }
    };

    const getGroupInvitationAsync = async (group_id, user_id) => {
        const result = await getGroupInvitation(group_id, user_id);
        setMemberRole(result?.status || "");
        setGroupMembership(null);
        setIsLoading(false);
    };

    const sendGroupJoinRequestedNotificationAsync = async (group) => {
        let result1 = await saveNotification({
            "user_id": user.uuid,
            "type": "lounge_group_activity",
            "message": " You have requested to join the " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_join_requested'}",
            "sender_id": user.uuid,
        });

        let result2 = await saveNotification({
            "user_id": group.user.uuid,
            "type": "lounge_group_activity",
            "message": user.first_name + " " + user.last_name + " has requested to join your " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_join_requested'}",
            "sender_id": user.uuid,
        });
    };

    const sendGroupJoinedNotificationAsync = async (group) => {
        let result1 = await saveNotification({
            "user_id": user.uuid,
            "type": "lounge_group_activity",
            "message": "You have successfully joined the " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_joined'}",
            "sender_id": user.uuid,
        });

        let result2 = await saveNotification({
            "user_id": group.user.uuid,
            "type": "lounge_group_activity",
            "message": user.first_name + " " + user.last_name + " has joined your " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_joined'}",
            "sender_id": user.uuid,
        });
    };


    const handleJoinGroup = (e) => {
        (async () => {
            const result = await joinGroup({
                "user_id": user.uuid,
                "group_id": props.group.uuid,
                "role": "member"
            });
            if (result) {
                if (props.group.status == 'private') {
                    showMessageModal("success", "Thanks!", "Request Sent Successfully.", result);
                    setMemberRole("pending");
                    setGroupMembership(null);
                    sendGroupJoinRequestedNotificationAsync(props.group);
                } else {
                    showMessageModal("success", "Thanks!", "Group Joined Successfully.", result);
                    setMemberRole(result.role);
                    setGroupMembership(result);
                    sendGroupJoinedNotificationAsync(props.group);
                }
            } else {
                showMessageModal("error", "Oops!", "Unable to join group at the moment.", result);
            }
        })();
    };

    const handleDeleteGroup = () => {
        if (props.onDeleteGroup) {
            props.onDeleteGroup(props.group);
        }
    };

    // const handleLeaveGroup = () => {
    //     (async () => {
    //         const result = await leaveGroup(groupMembership.id);
    //         if (result) {
    //             showMessageModal("success", "Thanks!", "Group Left Successfully.", result);
    //             setMemberRole("");
    //             setGroupMembership(null);
    //         } else {
    //             showMessageModal("error", "Oops!", "Unable to leave group at the moment.", result);
    //         }
    //     })();
    // };

    const sendGroupWithdrawNotificationAsync = async (group) => {
        let result1 = await saveNotification({
            "user_id": user.uuid,
            "type": "lounge_group_activity",
            "message": "You have successfully withrawn your request to join the " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_left'}",
            "sender_id": user.uuid,
        });

        let result2 = await saveNotification({
            "user_id": group.user.uuid,
            "type": "lounge_group_activity",
            "message": user.first_name + " " + user.last_name + " has withdrawn request to join your " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_left'}",
            "sender_id": user.uuid,
        });
    };

    const sendGroupLeftNotificationAsync = async (group) => {
        let result1 = await saveNotification({
            "user_id": user.uuid,
            "type": "lounge_group_activity",
            "message": " You have successfully left the " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_left'}",
            "sender_id": user.uuid,
        });

        let result2 = await saveNotification({
            "user_id": group.user.uuid,
            "type": "lounge_group_activity",
            "message": user.first_name + " " + user.last_name + " has left your " + group.status + " group named: " + group.name + ".",
            "body": "{activity_key:'lounge_group_left'}",
            "sender_id": user.uuid,
        });
    };

    const handleLeaveMembership = () => {
        (async () => {
            const result = await leaveMembership(props.group.uuid, user.uuid);
            if (result) {
                if (!groupMembership && props.group.status == 'private') {
                    showMessageModal("success", "Thanks!", "Request Withdrawn Successfully.", result);
                    sendGroupWithdrawNotificationAsync(props.group);
                } else {
                    showMessageModal("success", "Thanks!", "Group Left Successfully.", result);
                    sendGroupLeftNotificationAsync(props.group);
                }
                setMemberRole("");
                setGroupMembership(null);
            } else {
                if (props.group.status == 'private') {
                    showMessageModal("error", "Oops!", "Unable to withdraw request at the moment.", result);
                } else {
                    showMessageModal("error", "Oops!", "Unable to leave group at the moment.", result);
                }
            }
        })();
    };

    return (
        <>
            <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
            <div className="col-md-4 col-sm-3 col-12">
                <div className="sliderContent">
                    <img
                        src={props.group.cover_image || Placeholder}
                        className="candidateLogo"
                        width={150}
                        height={150}
                        alt=""
                        onError={(e) => {
                            e.target.src = Placeholder; // Set the backup image source
                        }}
                    />
                    <div className="agencyName ">
                        <Link to={"/groups/" + props.group.uuid}>
                            {props.group.name}
                        </Link>
                    </div>
                    <div className="group-info">
                        <FaEarthAmericas color="#a4a4a4" /> {group_statuses[props.group.status]} Group
                    </div>
                    {isLoading ? (<CircularProgress />) : (
                        <div className="join-group">
                            {memberRole ? (
                                <>
                                    <Tooltip title="Membership Status">
                                        <div className="group-membership-status">
                                            {!groupMembership && props.group.status == 'private' ? (
                                                <>
                                                    Membership {memberRole}
                                                </>
                                            ) : (
                                                <>
                                                    Group {memberRole}
                                                </>
                                            )}

                                        </div>
                                    </Tooltip>
                                    {memberRole == "Admin" || memberRole == "Moderator" ? (<>
                                        <EditGroup group={props.group} />
                                    </>) : (<></>)}
                                    {memberRole == "Admin" ? (<>
                                        <Tooltip title="Delete Group" onClick={() => setOpenConfirmDeleteModal(true)}>
                                            <button className="btn btn-dark" >
                                                <IoTrashSharp />
                                            </button>
                                        </Tooltip>
                                        <ConfirmModal
                                            openModal={openConfirmDeleteModal}
                                            setOpenModal={setOpenConfirmDeleteModal}
                                            title="Confirm Delete Group?"
                                            message="Are you sure to delete this group?"
                                            onConfirm={handleDeleteGroup}
                                        />
                                    </>) : (<></>)}

                                    {memberRole != "Admin" ? (<>
                                        <Tooltip title="Leave Group">
                                            <button className="btn btn-dark" onClick={() => setOpenConfirmLeaveModal(true)}>
                                                <FaRightFromBracket />
                                            </button>
                                        </Tooltip>
                                        <ConfirmModal
                                            openModal={openConfirmLeaveModal}
                                            setOpenModal={setOpenConfirmLeaveModal}
                                            title="Confirm Leave Group?"
                                            message="Are you sure to leave this group?"
                                            onConfirm={handleLeaveMembership}
                                        />
                                    </>) : (<></>)}

                                </>
                            ) : (
                                <button className="btn btn-dark group-btn" onClick={(e) => handleJoinGroup(e)}>
                                    <FaRightToBracket /> Join Group
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default GroupWidget;