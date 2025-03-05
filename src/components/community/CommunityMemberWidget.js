import Placeholder from "../../assets/images/placeholder.png";
import { IoMailOpen, IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../../context/AuthContext";

import { Tooltip } from "@mui/material";

import FriendshipWidget from "./FriendshipWidget";
import GroupRequestWidget from "./GroupRequestWidget";
import InviteMemberWidget from "./InviteMemberWidget";
import UserLocation from "../UserLocation";
import CreativeImageLoader from "../CreativeImageLoader";

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
    const isInviteMemberPage = window.location.href.indexOf("/invite-members/") > 0;

    return (
        <>
            {visibleAfterProcess && (
                <div className="col-lg-4 col-md-6 col-12" style={{ "marginBottom": "10px" }}>
                    <div className="sliderContent members-list">
                        <CreativeImageLoader creative={props?.creative} />
                        <div className="member-data">
                            <div className="agencyName">
                                <Link className="text-dark" to={`/creative/${props.creative.slug}`}>
                                    {props.creative.name}
                                </Link></div>
                            <div className="position">{props.creative.category}</div>
                            <UserLocation location={props.creative?.location} />
                        </div>
                        <div className="user-actions">
                            {isInviteMemberPage ? (
                                <InviteMemberWidget creative={props.creative} group={props.group} visibleAfterProcess={visibleAfterProcess} setVisibleAfterProcess={setVisibleAfterProcess} />
                            ) : (
                                <>
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
                                </>    
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