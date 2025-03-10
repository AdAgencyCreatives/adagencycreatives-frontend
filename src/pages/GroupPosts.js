import "../styles/Community.css";
import CreatePost from "../components/community/CreatePost";
import LeftSidebar from "../components/community/LeftSidebar";
import PostList from "../components/community/PostList";
import RightSidebarWidgets from "../components/RightSidebarWidgets";

import { useContext, useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as GroupsContext } from "../context/GroupsContext";
import { getGroupMembership, getGroupInvitationByUUID } from "../context/GroupMembersDataContext";
import InviteMemberActionWidget from '../components/community/InviteMemberActionWidget';

import RestrictedLounge from "../components/RestrictedLounge";
import { CircularProgress } from "@mui/material";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUserPlus } from "react-icons/hi2";

const GroupPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [invite, setInvite] = useState(null);
    const [isGroupMember, setIsGroupMember] = useState(false);

    const {
        state: { token, user, role },
    } = useContext(AuthContext);

    const {
        state: { single_group },
        getGroup,
    } = useContext(GroupsContext);

    const { group_uuid } = useParams();

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            (async () => {
                await getGroup(group_uuid);
            })();
            handleSetInvite();
        }
    }, [token, group_uuid]);

    const handleSetInvite = async () => {
        let params = new URLSearchParams(window.location.hash.replace("#", ""));
        let invite = params.get("invite")?.length > 0 ? params.get("invite") : null;
        if (invite) {
            invite = await getGroupInvitationByUUID(invite);
        
            if (user.uuid == invite.invited_to.user_id && invite.status === 'pending') {
                setInvite(invite);
            }
        }
    };

    useEffect(() => {
        if (token && single_group && single_group.uuid == group_uuid) {
            (async () => {
                let result = await getGroupMembership(group_uuid, user.uuid)
                if (result && result.creative.user_id == user.uuid) {
                    setIsGroupMember(true);
                }
                setIsLoading(false);
            })();
        }
    }, [token, single_group]);

    const isCurrentPage = (relativeUrl) => {
        return (window.location.pathname + (window.location.search && window.location.search.length > 1 ? window.location.search : '')) == relativeUrl;
    }

    return (
        <>
            {token && role && (role == "admin" || role == "creative") ? (
                <>
                    <div className="dark-container page-community mb-0 mt-0">
                        {isLoading ? (<>
                            <div className="center-page">
                                <CircularProgress />
                            </div>
                        </>) : (<>
                            <h1 className="community-title">{single_group?.name || ""}</h1>
                            <h2 className="community-subtitle" dangerouslySetInnerHTML={{ __html: single_group?.description || "" }}></h2>
                        </>)}

                        <div className="container-fluid mt-4 px-2 px-md-5">
                            <div className="row div_row">
                                <div className="col-md-2 mb-4 mb-md-0 menu_left">
                                    <LeftSidebar />
                                </div>
                                <div className="col-md-7 order-md-2 order-3 div_content_center">
                                    <div className="groups-header">
                                        <div className="post-form">
                                            <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/groups/' + group_uuid) ? ' btn-selected' : '')} to={'/groups/' + group_uuid}><HiOutlineUserGroup /> Group Posts</Link>
                                            <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/group-members/' + group_uuid) ? ' btn-selected' : '')} to={'/group-members/' + group_uuid}><HiOutlineUserGroup /> Group Members</Link>
                                            {user && single_group.user && single_group.user.id == user.id && single_group?.status == 'private' && (
                                                <>
                                                    <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/invite-members/' + group_uuid) ? ' btn-selected' : '')} to={'/invite-members/' + group_uuid}><HiOutlineUserPlus /> Invite Members</Link>
                                                    <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/group-requests/' + group_uuid) ? ' btn-selected' : '')} to={'/group-requests/' + group_uuid}><HiOutlineUserGroup /> Group Requests</Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {isLoading ? (<>
                                        <div className="center-page">
                                            <CircularProgress />
                                        </div>
                                    </>) : (<>
                                        {isGroupMember ? (<>
                                            <CreatePost feed_group={single_group.uuid} />
                                            <PostList feed_group={single_group.uuid} />
                                        </>) : (<>
                                            {invite && single_group ? (
                                                <InviteMemberActionWidget invite={invite} creative={user} group={single_group} />
                                            ) : (
                                                <div className="center-page">Sorry, your are not a member of this group.</div>
                                            )}
                                        </>)}                                            
                                    </>)}
                                </div>
                                <div className="col-md-3 order-md-3 order-2 sidebar_right">
                                    <RightSidebarWidgets />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <RestrictedLounge />
            )}
        </>
    );
};

export default GroupPosts;
