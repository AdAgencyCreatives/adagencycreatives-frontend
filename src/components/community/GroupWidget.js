import Placeholder from "../../assets/images/placeholder.png";
import { IoBanSharp, IoCloseCircleSharp, IoEyeOffOutline, IoEyeOutline, IoPencil, IoRemoveCircleSharp, IoTimeOutline, IoTrashOutline, IoTrashSharp } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../../styles/Groups.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import { joinGroup, leaveGroup, getGroupMembership } from "../../context/GroupMembersDataContext";
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

    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const [openConfirmLeaveModal, setOpenConfirmLeaveModal] = useState(false);
    const [memberRole, setMemberRole] = useState("");

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
        if (user) {
            getGroupMembershipAsync(props.group.uuid, user.uuid);
        }
    }, [user, props.group]);

    const getGroupMembershipAsync = async (group_id, user_id) => {
        const result = await getGroupMembership(group_id, user_id);
        setMemberRole(result ? result.role : "");
    };

    const handleJoinGroup = (e, group) => {
        (async () => {
            const result = await joinGroup({
                "user_id": user.uuid,
                "group_id": group.uuid,
                "role": "member"
            });
            if (result) {
                showMessageModal("success", "Thanks!", "Group Joined Successfully.", result);
            } else {
                showMessageModal("error", "Oops!", "Unable to join group at the moment.", result);
            }
            getGroupMembershipAsync();
        })();
    };

    const handleDeleteGroup = () => {
        if (props.onDeleteGroup) {
            props.onDeleteGroup(props.group);
        }
    };

    const handleLeaveGroup = () => {
        (async () => {
            const result = await leaveGroup(user.uuid, {
                "group_id": props.group.uuid,
            });
            if (result) {
                showMessageModal("success", "Thanks!", "Group Left Successfully.", result);
            } else {
                showMessageModal("error", "Oops!", "Unable to leave group at the moment.", result);
            }
            getGroupMembershipAsync();
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
                    <div className="agencyName ">{props.group.name}</div>
                    <div className="group-info">
                        <FaEarthAmericas color="#a4a4a4" /> {group_statuses[props.group.status]} Group
                    </div>
                    <div className="join-group">
                        {memberRole ? (
                            <>
                                <Tooltip title="Membership Status">
                                    <div className="group-membership-status">
                                        Group {memberRole}
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
                                        onConfirm={handleLeaveGroup}
                                    />
                                </>) : (<></>)}

                            </>
                        ) : (
                            <button className="btn btn-dark group-btn" onClick={(e) => handleJoinGroup(e, props.group)}>
                                <FaRightToBracket /> Join Group
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupWidget;