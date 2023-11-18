import Placeholder from "../../assets/images/placeholder.png";
import { IoEarth, IoBookmarkOutline, IoLocationOutline, IoMailOpen, IoPersonAdd, IoClose, IoCloseSharp, IoCheckmarkCircleSharp, IoBandageOutline, IoBanSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext, logActivity } from "../../context/AuthContext";
import { getSingleFriendship, requestFriendship, respondFriendship } from "../../context/FriendsDataContext";
import MessageModal from "../MessageModal";

import SlidingMessage from "../../components/SlidingMessage";
import { Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { saveNotification } from "../../context/NotificationsDataContext";

import FriendshipWidget from "./FriendshipWidget";

const CommunityMemberWidget = (props) => {

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    const {
        state: { role, user, token },
    } = useContext(AuthContext);

    return (
        <>
            <div className="col-md-4 col-sm-6 col-12">
                <div className="sliderContent members-list">
                    <img
                        src={props.creative.profile_image || Placeholder}
                        className="candidateLogo"
                        width={150}
                        height={150}
                        alt=""
                    />
                    <div className="member-data">
                        <div className="agencyName">
                            <Link className="text-dark" to={`/creative/${props.creative.slug}`}>
                                {props.creative.name}
                            </Link></div>
                        <div className="position">{props.creative.title}</div>
                        {props.creative.location && (
                            <div className="job-location location">
                                {props.creative.location && (props.creative.location.state || props.creative.location.city) ? (
                                    <IoLocationOutline />
                                ) : (
                                    <></>
                                )}
                                <Link to={`/creative-location/${props.creative.location.state}`}>
                                    {props.creative.location.state}
                                </Link>
                                {props.creative.location && props.creative.location.state && props.creative.location.city ? (
                                    <span>,&nbsp;</span>
                                ) : (
                                    <></>
                                )}
                                <Link to={`/creative-location/${props.creative.location.city}`}>
                                    {props.creative.location.city}
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="user-actions">
                        <FriendshipWidget creative={props.creative} />
                        <Tooltip title="View Messages">
                            <Link className="btn btn-dark no-border" to={"/messages/"}>
                                <IoMailOpen />
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CommunityMemberWidget;