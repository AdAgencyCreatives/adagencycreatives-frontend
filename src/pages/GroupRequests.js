import "../styles/CommunityMembers.css";
import LeftSidebar from "../components/community/LeftSidebar";
import MembersSearchBar from "../components/MembersSearchBar";

import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import CommunityMemberWidget from "../components/community/CommunityMemberWidget";

import RestrictedLounge from "../components/RestrictedLounge";
import { CircularProgress } from "@mui/material";
import SearchBar from "../components/SearchBar";

import { Link, useParams } from "react-router-dom";
import { Context as GroupsContext } from "../context/GroupsContext";
import { getGroupRequests } from "../context/GroupMembersDataContext";
import { HiOutlineUserGroup } from "react-icons/hi2";
import GroupRequestWidget from "../components/community/GroupRequestWidget";

const GroupRequests = () => {
    const { creatives, loading, loadMore, searchCreatives } = useCreatives();
    const [isLoading, setIsLoading] = useState(true);
    const [groupRequests, setGroupRequests] = useState(null);

    const {
        state: { single_group, },
        getGroup,
    } = useContext(GroupsContext);

    const { group_uuid } = useParams();

    const {
        state: { token, role, user },
    } = useContext(AuthContext);

    useScrollLoader(loading, loadMore);

    const searchUser = (value) => {
        console.log("searching");
        setIsLoading(true);
        searchCreatives(value);
    };

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            getGroup(group_uuid);
        }
    }, [token, group_uuid]);

    useEffect(() => {
        if (token && user && single_group && single_group.uuid == group_uuid) {
            setIsLoading(false);
            if(user && single_group.user && single_group.user.id == user.id) {
                (async () => {
                    let result = await getGroupRequests(group_uuid);
                    setGroupRequests(result || [])
                })();
            }
        }
    }, [token, single_group]);

    useEffect(() => {
        if (token && groupRequests) {
            setIsLoading(false);
        }
    }, [token, groupRequests]);

    const isCurrentPage = (relativeUrl) => {
        return (window.location.pathname + (window.location.search && window.location.search.length > 1 ? window.location.search : '')) == relativeUrl;
    }

    return (
        <>
            {user && role && (role == "admin" || role == "creative") ? (
                <div className="dark-container page-community-members">
                    <div className="container-fluid">
                        {isLoading ? (<>
                            <div className="center-page mx-3">
                                <CircularProgress />
                            </div>
                        </>) : (<>
                            <h1 className="community-title">
                                {single_group?.name || ""} Group Members
                            </h1>
                        </>)}
                        <div className="row">
                            <div className="col-md-2 mb-3">
                                <LeftSidebar />
                            </div>
                            <div className="col-md-10">
                                <div className="groups-header">
                                    <div className="post-form">
                                        <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/groups/' + group_uuid) ? ' btn-selected' : '')} to={'/groups/' + group_uuid}><HiOutlineUserGroup /> Group Posts</Link>
                                        <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/group-members/' + group_uuid) ? ' btn-selected' : '')} to={'/group-members/' + group_uuid}><HiOutlineUserGroup /> Group Members</Link>
                                        {user && single_group.user && single_group.user.id == user.id && single_group?.status == 'private' && (
                                            <Link className={"btn btn-dark btn-outline" + (isCurrentPage('/group-requests/' + group_uuid) ? ' btn-selected' : '')} to={'/group-requests/' + group_uuid}><HiOutlineUserGroup /> Group Requests</Link>
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
                                        {groupRequests && groupRequests.length ? (
                                            <div className="row g-4 px-1">
                                                {groupRequests.map((group_request, index) => {
                                                    return (
                                                        <CommunityMemberWidget
                                                            key={"group-request-creative-" + group_request.invited_to.id}
                                                            creative={group_request.invited_to}
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
                                            <>
                                                {user ? (<>
                                                    <div className="center-page">Sorry, your are not a member of this group.</div>
                                                </>) : (<>
                                                    <div className="center-page">Sorry, nothing here.</div>
                                                </>)}
                                            </>
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

export default GroupRequests;
