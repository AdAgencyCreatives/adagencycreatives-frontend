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
import GroupRequestWidget from "./GroupRequestWidget";
import UserLocation from "../UserLocation";

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
    const isGroupRequestsPage = window.location.href.indexOf("/group-requests/") > 0;

    return (
        <>
            {visibleAfterProcess && (
                <div className="col-lg-4 col-md-6 col-12" style={{ "marginBottom": "10px" }}>
                    <div className="sliderContent members-list">
                        <img
                            src={props.creative?.user_thumbnail || props.creative.profile_image || Placeholder}
                            className="candidateLogo"
                            width={150}
                            height={150}
                            alt=""
                            onError={(e) => {
                                e.target.src = Placeholder; // Set the backup image source
                            }}
                        />
                        <div className="member-data">
                            <div className="agencyName">
                                <Link className="text-dark" to={`/creative/${props.creative.slug}`}>
                                    {props.creative.name}
                                </Link></div>
                            <div className="position">{props.creative.category}</div>
                            <UserLocation location={props.creative?.location} />
                        </div>
                        <div className="user-actions">
                            {isGroupRequestsPage ? (
                                <GroupRequestWidget creative={props.creative} visibleAfterProcess={visibleAfterProcess} setVisibleAfterProcess={setVisibleAfterProcess} />
                            ) : (
                                <FriendshipWidget creative={props.creative} visibleAfterProcess={visibleAfterProcess} setVisibleAfterProcess={setVisibleAfterProcess} />
                            )}
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