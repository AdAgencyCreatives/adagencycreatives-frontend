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
        }

    };

    const getGroupInvitationAsync = async (group_id, user_id) => {
        const result = await getGroupInvitation(group_id, user_id);
        setMemberRole(result?.status || "");
        setGroupMembership(null);
        setIsLoading(false);
    };

    const handleJoinGroup = (e, group) => {
        (async () => {
            const result = await joinGroup({
                "user_id": user.uuid,
                "group_id": group.uuid,
                "role": "member"
            });
            if (result) {
                if (result.invited_by && result.invited_to) {
                    showMessageModal("success", "Thanks!", "Request Sent Successfully.", result);
                    setMemberRole("pending");
                    setGroupMembership(null);
                } else {
                    showMessageModal("success", "Thanks!", "Group Joined Successfully.", result);
                    setMemberRole(result.role);
                    setGroupMembership(result);
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

    const handleLeaveGroup = () => {
        (async () => {
            const result = await leaveGroup(groupMembership.id);
            if (result) {
                showMessageModal("success", "Thanks!", "Group Left Successfully.", result);
                setMemberRole("");
                setGroupMembership(null);
            } else {
                showMessageModal("error", "Oops!", "Unable to leave group at the moment.", result);
            }
        })();
    };

    const handleLeaveMembership = () => {
        (async () => {
            const result = await leaveMembership(props.group.uuid, user.uuid);
            if (result) {
                showMessageModal("success", "Thanks!", "Request Withdrawn Successfully.", result);
                setMemberRole("");
                setGroupMembership(null);
            } else {
                showMessageModal("error", "Oops!", "Unable to withdraw request at the moment.", result);
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
                                <button className="btn btn-dark group-btn" onClick={(e) => handleJoinGroup(e, props.group)}>
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