import Placeholder from "../../assets/images/placeholder.png";
import { IoEyeOffOutline, IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../../styles/Groups.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import { deleteGroup, getGroups, updateGroup } from "../../context/GroupsDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../TimeAgo";
import UtcToLocalDateTime from "../UtcToLocalDateTime";
import MessageModal from "../MessageModal";
import { FaEarthAmericas, FaRightToBracket } from "react-icons/fa6";
import Nathan from "../../assets/images/NathanWalker_ProfilePic-150x150.jpg";

const GroupWidget = (props) => {

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
        }
    }, [user]);

    const handleJoinGroup = (e, group) => {
        //alert(group.name);
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
                        <button className="group-btn" onClick={(e)=> handleJoinGroup(e, props.group)}>
                            <FaRightToBracket /> Join Group
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupWidget;