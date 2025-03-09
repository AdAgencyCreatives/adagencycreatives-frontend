import { IoPaperPlane } from "react-icons/io5";
import { useContext, useState } from "react";
import { Context as AuthContext, logActivity } from "../../context/AuthContext";
import { sendGroupInvite } from "../../context/GroupMembersDataContext";
import MessageModal from "../MessageModal";

import { Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { saveNotification } from "../../context/NotificationsDataContext";
import { Context as AlertContext } from "../../context/AlertContext";

const InviteMemberWidget = (props) => {
    const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
    const [loadingGroupInviteRecord, setLoadingGroupInviteRecord] = useState(false);
    const [hasGroupInviteRecord, setHasGroupInviteRecord] = useState(false);
    const [groupInviteRecord, setGroupInviteRecord] = useState(null);
    const [invited, setIsInvited] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

    const {
        state: { message },
        showAlert,
    } = useContext(AlertContext);

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

    const handleGroupInviteMember = () => {
        sendGroupInviteAsync();
        sendGroupInviteRespondedNotificationAsync(props.creative);
    };

    const sendGroupInviteAsync = async () => {
        let result = await sendGroupInvite({
            receiver_id: props.creative.user_id,
            group_id: props.group.uuid,
            sent: 1
        });
        if (result) {
            if (result.error) {
                showAlert(result.message);
                return;
            }
            showAlert(`Invite successfully sent to ${props.creative.name}`);
            logActivity(user.uuid, "lounge_group_request_responded", "Group Request with Creative: " + props.creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + props.creative.id + "'}");
            setGroupInviteRecord(result);
            setIsInvited(true);
        }
    };

    const sendGroupInviteRespondedNotificationAsync = async (creative) => {
        let result1 = await saveNotification({
            "user_id": creative.user_id ? creative.user_id : creative.user.uuid,
            "type": "lounge_group_activity",
            "message": "Your are requested to join the group " + props.group.name,
            "body": "{activity_key:'lounge_group_request_responded'}",
            "sender_id": user.uuid,
        });

        let result2 = await saveNotification({
            "user_id": user.uuid,
            "type": "lounge_group_activity",
            "message": "You have requested " + creative.name + " to join your group: " + props.group.name + ".",
            "body": "{activity_key:'lounge_group_request_responded'}",
            "sender_id": user.uuid,
        });
    };

    return (
        <>
            {!isOwnProfile ? (
                <>
                    <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
                    {loadingGroupInviteRecord ? (
                        <CircularProgress />
                    ) : (<>
                        {invited ? (
                            <Tooltip title="Invited">
                                <button className="btn btn-dark no-border btn-selected">
                                    <IoPaperPlane />
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Invite">
                                <button className="btn btn-dark no-border" onClick={() => handleGroupInviteMember()}>
                                    <IoPaperPlane />
                                </button>
                            </Tooltip>
                        )}
                    </>)}
                </>
            ) : (<></>)}
        </>
    );
};

export default InviteMemberWidget;