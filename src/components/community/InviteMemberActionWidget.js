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
        respondGroupRequestAsync(creative, status);
        // sendGroupRequestRespondedNotificationAsync(creative, status);
    };

    const respondGroupRequestAsync = async (creative, status) => {
        let result = await respondGroupRequest(props.invite, {
            "status": status
        });
        if (result) {
            logActivity(user.uuid, "lounge_group_request_responded", "Group Request " + status + " with Creative: " + creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + creative.id + "', status:'" + status + "'}");
            setGroupRequestRecord(result);
            // getGroupRequestRecordAsync();

            navigate(window.location.pathname.split('#')[0]);
        }
    };

    const sendGroupRequestRespondedNotificationAsync = async (creative, status) => {
        // let result = await saveNotification({
        //     "user_id": creative.user_id ? creative.user_id : creative.user.uuid,
        //     "type": "lounge_group_request_responded",
        //     "message": user.first_name + " " + user.last_name + " has " + status + (status == "cancelled" ? "" : " your") + " your request to join group: " + single_group.name + ".",
        //     "body": "{}"
        // });
        let result1 = await saveNotification({
            "user_id": creative.user_id ? creative.user_id : creative.user.uuid,
            "type": "lounge_group_activity",
            "message": "Your request to join " + single_group.status + " " + single_group.name + " has been " + status + ".",
            "body": "{activity_key:'lounge_group_request_responded'}"
        });

        let result2 = await saveNotification({
            "user_id": user.uuid,
            "type": "lounge_group_activity",
            "message": "Your request to join " + status + " the " + creative.name + "'s request to join your " + single_group.status + " group: " + single_group.name + ".",
            "body": "{activity_key:'lounge_group_request_responded'}"
        });
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