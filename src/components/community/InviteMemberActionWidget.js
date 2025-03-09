import Placeholder from "../../assets/images/placeholder.png";
import { IoCheckmarkCircleSharp, IoBanSharp } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext, logActivity } from "../../context/AuthContext";
import { getGroupInvitation, respondGroupRequest } from "../../context/GroupMembersDataContext";
import MessageModal from "../MessageModal";

import SlidingMessage from "../../components/SlidingMessage";
import { Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { saveNotification } from "../../context/NotificationsDataContext";
import { Context as GroupsContext } from "../../context/GroupsContext";

const InviteMemberActionWidget = (props) => {
    const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
    const [loadingGroupRequestRecord, setLoadingGroupRequestRecord] = useState(false);
    const [hasGroupRequestRecord, setHasGroupRequestRecord] = useState(false);
    const [groupRequestRecord, setGroupRequestRecord] = useState(null);

    const [isMounted, setIsMounted] = useState(false);

    const navigate = useNavigate();

    const group_request_statuses = {
        "pending": "Pending",
        "accepted": "Accepted",
        "rejected": "Rejected",
    };

    const showMessageModal = (type, title, message, data) => {
        setMessageModalOptions({ "open": true, "type": type, "title": title, "message": message, "data": data });
    };

    const {
        state: { role, user, token },
    } = useContext(AuthContext);

    const isOwnProfile = user?.uuid == props.creative?.user_id;

    const handleRespondGroupRequest = (evt, creative, status) => {
        respondGroupRequestAsync(creative, status, () => {
            sendGroupRequestRespondedNotificationAsync(creative, status, () => {
                window.location.reload();
            });
        });
    };

    const respondGroupRequestAsync = async (creative, status, cb = () => { }) => {
        let result = await respondGroupRequest(props.invite.id, {
            "status": status
        });
        if (result) {
            logActivity(user.uuid, "lounge_group_request_responded", "Group Request " + status + " with Creative: " + creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + creative.id + "', status:'" + status + "'}");
            setGroupRequestRecord(result);
            cb();
        }
    };

    const sendGroupRequestRespondedNotificationAsync = async (creative, status, cb = () => { }) => {
        let result1 = await saveNotification({
            "user_id": props.invite.invited_by.user_id,
            "type": "lounge_group_activity",
            "message": props.invite.invited_to.name + " " + status + " your invitation request to join your " + props.group.status + " group: " + props.group.name + ".",
            "body": "{activity_key:'lounge_group_request_responded'}",
            "sender_id": props.invite.invited_to.user_id,
        });

        let result2 = await saveNotification({
            "user_id": props.invite.invited_to.user_id,
            "type": "lounge_group_activity",
            "message": "You " + status + " " + props.invite.invited_by.name + "'s invitation request to join " + props.group.status + " group: " + props.group.name + ".",
            "body": "{activity_key:'lounge_group_request_responded'}",
            "sender_id": props.invite.invited_to.user_id,
        });

        cb();
    };

    return (
        <>
            {!isOwnProfile ? (
                <>
                    <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />

                    <div className="center-page">
                        <p>You're invited to join {props.group.name} group.</p>
                        <div className="d-flex gap-2">
                            <Tooltip title="Accept Invitation">
                                <button className="btn btn-dark no-border" onClick={(e) => handleRespondGroupRequest(e, props.creative, "accepted")}>
                                    <IoCheckmarkCircleSharp />
                                </button>
                            </Tooltip>
                            <Tooltip title="Reject Invitation">
                                <button className="btn btn-dark no-border" onClick={(e) => handleRespondGroupRequest(e, props.creative, "rejected")}>
                                    <IoBanSharp />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </>
            ) : (<></>)}
        </>
    );
};

export default InviteMemberActionWidget;