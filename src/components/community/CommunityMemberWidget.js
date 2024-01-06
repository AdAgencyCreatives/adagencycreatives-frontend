import Placeholder from "../../assets/images/placeholder.jpeg";
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
    const [visibleAfterProcess, setVisibleAfterProcess] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    const {
        state: { role, user, token },
    } = useContext(AuthContext);

    const isAdmin = role == "admin";
    const isAdvisor = role == "advisor";
    const isAgency = role == "agency";

    const isOwnProfile = user?.uuid == props.creative?.user_id;

    return (
        <>
            {visibleAfterProcess && (
                <div className="col-lg-4 col-md-6 col-12" style={{ "marginBottom": "10px" }}>
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
                                    <Link to={`/creatives/search/state/${props.creative.location.state}`}>
                                        {props.creative.location.state}
                                    </Link>
                                    {props.creative.location && props.creative.location.state && props.creative.location.city ? (
                                        <span>,&nbsp;</span>
                                    ) : (
                                        <></>
                                    )}
                                    <Link to={`/creatives/search/city/${props.creative.location.city}`}>
                                        {props.creative.location.city}
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="user-actions">
                            <FriendshipWidget creative={props.creative} visibleAfterProcess={visibleAfterProcess} setVisibleAfterProcess={setVisibleAfterProcess} />
                            {!isOwnProfile && (
                                <Tooltip title="View Messages">
                                    <Link className="btn btn-dark no-border" to={"/messages/" + props.creative.user_id}>
                                        <IoMailOpen />
                                    </Link>
                                </Tooltip>
                            )}

                            {isOwnProfile && (
                                <div className="friendship-request-status">
                                    Your Profile
                                </div>
                            )}

                        </div>
                    </div>
                </div >
            )}
        </>
    );
};

export default CommunityMemberWidget;