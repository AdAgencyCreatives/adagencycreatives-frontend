import "../styles/CommunityMembers.css";
import LeftSidebar from "../components/community/LeftSidebar";

import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useScrollLoader } from "../hooks/useScrollLoader";

import RestrictedLounge from "../components/RestrictedLounge";
import { CircularProgress } from "@mui/material";
import SearchBar from "../components/SearchBar";

import { Link, useParams } from "react-router-dom";
import { Context as GroupsContext } from "../context/GroupsContext";
import { HiOutlineUserGroup, HiOutlineUserPlus } from "react-icons/hi2";
import { useHistoryState } from "../hooks/useHistoryState";
import CommunityMemberWidget from "../components/community/CommunityMemberWidget";

const InviteMembers = () => {
    const [input, setInput] = useHistoryState("input", "");

    const { group_invite_members, loading, loadMore, getGroupInviteMembers, searchGroupInviteMember } = useCreatives('invite-members');
    const [isLoading, setIsLoading] = useState(true);

    const { group_uuid } = useParams();

    const {
        state: { role, user, token },
    } = useContext(AuthContext);

    useScrollLoader(loading, loadMore);

    const {
        state: { single_group },
        getGroup
    } = useContext(GroupsContext);

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            getGroup(group_uuid);
        }
    }, [token, group_uuid]);

    const isCurrentPage = (relativeUrl) => {
        return (window.location.pathname + (window.location.search && window.location.search.length > 1 ? window.location.search : '')) == relativeUrl;
    }

    const searchUser = (value) => {

        if (!value || value.length == 0) {
            getGroupInviteMembers(single_group?.id);
        return;
        }
        
        setIsLoading(true);
        let terms = value.split(',');
        let search = terms && terms.length && terms.length > 1 ? terms[0] : value;
        searchGroupInviteMember("search2", search, role);
    };

    useEffect(() => {
        if (group_invite_members?.length >= 0) setIsLoading(false);
    }, [group_invite_members]);

    useEffect(() => {
        if (role && input?.length > 0) {
            searchUser(input);
        } else {
            if (single_group?.id) getGroupInviteMembers(single_group?.id);
        }
    }, [role, single_group]);

    return (
        <>
            {token && role && (role == "admin" || role == "creative") ? (
                <div className="dark-container page-community-members">
                    <div className="container-fluid mt-4 px-2 px-md-5">
                        {isLoading ? (<>
                            <div className="center-page">
                                <CircularProgress />
                            </div>
                        </>) : (<>
                            <h1 className="community-title">
                                {single_group?.name || ""} Group Members
                            </h1>
                        </>)}
                        <div className="row div_row mt-4">
                            <div className="col-md-2 mb-3 menu_left">
                                <LeftSidebar />
                            </div>
                            <div className="col-md-10 div_content-right">
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
                                {isLoading ? (
                                    <div className="center-page">
                                        <CircularProgress />
                                        <span>Loading ...</span>
                                    </div>
                                ) : (
                                    <>
                                    <SearchBar input={input} setInput={setInput} onSearch={searchUser} placeholder="Search by member name" />

                                    {group_invite_members?.length > 0 ? (
                                    <div className="row g-4 px-1">
                                        {group_invite_members && single_group &&
                                        group_invite_members.map((creative, index) => {
                                            return (
                                            <CommunityMemberWidget
                                                key={"invite-member" + creative.id}
                                                creative={creative}
                                                group={single_group}
                                            />
                                            );
                                        })}
                                        <div className="load-more text-center">
                                        {loading && (
                                            <div
                                            className="spinner-border text-light"
                                            role="status"
                                            >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    ) : (
                                    <div className="no_result">
                                        <p>Please try again. No exact results found.</p>
                                    </div>
                                    )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <RestrictedLounge />
            )}
        </>
    );
};

export default InviteMembers;
