import Placeholder from "../../assets/images/placeholder.png";
import { IoEarth, IoBookmarkOutline, IoLocationOutline, IoMailOpen, IoPersonAdd, IoClose, IoCloseSharp, IoCheckmarkCircleSharp, IoBandageOutline, IoBanSharp, IoTrash } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext, logActivity } from "../../context/AuthContext";
import { getGroupInvitation, respondGroupRequest } from "../../context/GroupMembersDataContext";
import MessageModal from "../MessageModal";

import SlidingMessage from "../../components/SlidingMessage";
import { Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { saveNotification } from "../../context/NotificationsDataContext";
import { Context as GroupsContext } from "../../context/GroupsContext";

const GroupRequestWidget = (props) => {

    const { group_uuid } = useParams();

    const {
        state: { single_group, },
        getGroup,
    } = useContext(GroupsContext);

    const [messageModalOptions, setMessageModalOptions] = useState({ "open": false, "type": "message", "title": "Message", "message": "Thanks.", "data": {}, "onClose": null });
    const [loadingGroupRequestRecord, setLoadingGroupRequestRecord] = useState(false);
    const [hasGroupRequestRecord, setHasGroupRequestRecord] = useState(false);
    const [groupRequestRecord, setGroupRequestRecord] = useState(null);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        (async () => {
            await getGroup(group_uuid);
        })();

        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

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

    useEffect(() => {
        if (user) {
            getGroupRequestRecordAsync();
        }
    }, [user]);

    const getGroupRequestRecordAsync = async () => {
        setLoadingGroupRequestRecord(true);
        let result = await getGroupInvitation(group_uuid, props.creative?.user_id);
        setLoadingGroupRequestRecord(false);
        setGroupRequestRecord(result);
        setHasGroupRequestRecord(result ? true : false);
    };

    const handleRespondGroupRequest = (evt, creative, status) => {
        respondGroupRequestAsync(creative, status);
        sendGroupRequestRespondedNotificationAsync(creative, status);
    };

    const respondGroupRequestAsync = async (creative, status) => {
        let result = await respondGroupRequest(groupRequestRecord.id, {
            "status": status
        });
        if (result) {
            
            logActivity(user.uuid, "lounge_group_request_responded", "Group Request " + status + " with Creative: " + creative.name, "{user_id:'" + user.uuid + "', creative_id:'" + creative.id + "', status:'" + status + "'}");
            setGroupRequestRecord(result);
            getGroupRequestRecordAsync();
        } else {

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
            "message": "You have " + status + " the " + creative.name + "'s request to join your " + single_group.status + " group: " + single_group.name + ".",
            "body": "{activity_key:'lounge_group_request_responded'}"
        });
    };

    return (
        <>
            {!isOwnProfile ? (
                <>
                    <MessageModal options={messageModalOptions} setOptions={setMessageModalOptions} />
                    {loadingGroupRequestRecord || loadingGroupRequestRecord ? (
                        <CircularProgress />
                    ) : (<>
                        {(hasGroupRequestRecord && groupRequestRecord && groupRequestRecord.status) ? (<>
                            <Tooltip title="Membership Status">
                                <div className="friendship-request-status">
                                    {group_request_statuses[(groupRequestRecord ? groupRequestRecord.status : (groupRequestRecord ? groupRequestRecord.status : ""))]}
                                </div>
                            </Tooltip>
                        </>) : (<></>)}

                        {hasGroupRequestRecord && !(groupRequestRecord.status == "accepted" || groupRequestRecord.status == "rejected" || groupRequestRecord.status == "unfriended") ? (<>
                            <Tooltip title="Accept Member">
                                <button className="btn btn-dark no-border" onClick={(e) => handleRespondGroupRequest(e, props.creative, "accepted")}>
                                    <IoCheckmarkCircleSharp />
                                </button>
                            </Tooltip>
                            <Tooltip title="Reject Member">
                                <button className="btn btn-dark no-border" onClick={(e) => handleRespondGroupRequest(e, props.creative, "rejected")}>
                                    <IoBanSharp />
                                </button>
                            </Tooltip>
                        </>) : (<></>)}
                    </>)}
                </>
            ) : (<></>)}
        </>
    );
};

export default GroupRequestWidget;