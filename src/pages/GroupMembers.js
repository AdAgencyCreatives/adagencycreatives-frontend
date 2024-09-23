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
import { getGroupMembership } from "../context/GroupMembersDataContext";
import { HiOutlineUserGroup } from "react-icons/hi2";

const GroupMembers = () => {
    const { creatives, loading, loadMore, searchCreatives } = useCreatives();
    const [isLoading, setIsLoading] = useState(true);
    const [isGroupMember, setIsGroupMember] = useState(false);

    const {
        state: { single_group, group_members },
        getGroup, getGroupMembers,
    } = useContext(GroupsContext);

    const { group_uuid } = useParams();

    const {
        state: { role, user, token },
    } = useContext(AuthContext);

    useScrollLoader(loading, loadMore);

    const searchUser = (value) => {
        console.log("searching");
        setIsLoading(true);
        searchCreatives(value);
    };

    useEffect(() => {
        setIsLoading(false);
    }, [group_members]);

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            getGroup(group_uuid);
        }
    }, [token, group_uuid]);

    useEffect(() => {
        if (token && user && single_group && single_group.uuid == group_uuid) {
            (async () => {
                let result = await getGroupMembership(group_uuid, user.uuid)
                if (result && result.creative.user_id == user.uuid) {
                    getGroupMembers(group_uuid, (response) => {
                        setIsLoading(false);
                    });
                    setIsGroupMember(true);
                }
            })();
        }
    }, [token, single_group]);

    // useEffect(() => {
    //     if (token && group_members) {
    //         setIsLoading(false);
    //     }
    // }, [token, group_members]);

    const isCurrentPage = (relativeUrl) => {
        return (window.location.pathname + (window.location.search && window.location.search.length > 1 ? window.location.search : '')) == relativeUrl;
    }

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
                                        {isGroupMember && group_members?.length > 0 ? (
                                            <div className="row g-4 px-1">
                                                {group_members &&
                                                    group_members.map((group_member, index) => {
                                                        return (
                                                            <CommunityMemberWidget
                                                                key={"community-member-creative-" + group_member.creative.id}
                                                                creative={group_member.creative}
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
                                                {!isGroupMember ? (<>
                                                    <div className="center-page">Sorry, your are not a member of this group.</div>
                                                </>) : (<>
                                                    <div className="no_result">
                                                        <p>Please try again. No exact results found.</p>
                                                    </div>
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

export default GroupMembers;
