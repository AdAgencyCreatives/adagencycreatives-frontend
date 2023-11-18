import Placeholder from "../../assets/images/placeholder.png";
import { IoBanSharp, IoCloseCircleSharp, IoEyeOffOutline, IoEyeOutline, IoPencil, IoRemoveCircleSharp, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../../styles/Groups.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import { joinGroup, leaveGroup, getGroupMembership } from "../../context/GroupMembersDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../TimeAgo";
import UtcToLocalDateTime from "../UtcToLocalDateTime";
import MessageModal from "../MessageModal";
import { FaEarthAmericas, FaRightToBracket } from "react-icons/fa6";
import Nathan from "../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import EditGroup from "./EditGroup";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import ConfirmDeleteGroupModal from "./Modals/ConfirmDeleteGroupModal";

const GroupWidget = (props) => {

    const [isAdmin, setIsAdmin] = useState(false);
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
            setIsAdmin(props.group.user.id == user.id);
        }
    }, [user, props.group]);

    const handleJoinGroup = (e, group) => {
        (async () => {
            const result = await joinGroup({
                "user_id": user.uuid,
                "group_id": group.uuid,
                "role": "member"
            });
            if(result) {
                showMessageModal("success", "Thanks!", "Group Joined Successfully.", result);
            } else {
                showMessageModal("error", "Oops!", "Unable to join group for the moment.", result);
            }
        })();
    };

    const handleDeleteGroup = () => {
        if (props.onDeleteGroup) {
            props.onDeleteGroup(props.group);
        }
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
                        {isAdmin ? (
                            <>
                                <Tooltip title="Membership Status">
                                    <div className="group-membership-status">
                                        Group Admin
                                    </div>
                                </Tooltip>
                                <EditGroup group={props.group} />
                                <ConfirmDeleteGroupModal title="Confirm Delete Group?" message="Are you sure to delete this group?" onConfirm={handleDeleteGroup} />

                            </>
                        ) : (
                            <button className="group-btn" onClick={(e) => handleJoinGroup(e, props.group)}>
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