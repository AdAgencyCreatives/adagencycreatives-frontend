import "../styles/Community.css";
import CreatePost from "../components/community/CreatePost";
import LeftSidebar from "../components/community/LeftSidebar";
import PostList from "../components/community/PostList";
import RightSidebarWidgets from "../components/RightSidebarWidgets";

import { useContext, useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as GroupsContext } from "../context/GroupsContext";

import RestrictedLounge from "../components/RestrictedLounge";
import { CircularProgress } from "@mui/material";

const GroupPosts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {
        state: { token, role },
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
        }
    }, [token, group_uuid]);

    useEffect(() => {
        if (token && single_group && single_group.uuid) {
            setIsLoading(false);
        }
    }, [token, single_group]);

    return (
        <>
            {token && role && (role == "admin" || role == "creative") ? (
                <>
                    <div className="dark-container page-community mb-0 mt-0">
                        {isLoading ? (<>
                            <div className="center-page mx-3">
                                <CircularProgress />
                            </div>
                        </>) : (<>
                            <h1 className="community-title">{single_group?.name || ""}</h1>
                            <h2 className="community-subtitle">
                                {single_group?.description || ""}
                            </h2>
                        </>)}

                        <div className="container-fluid mt-4">
                            <div className="row">
                                <div className="col-md-2 mb-4 mb-md-0">
                                    <LeftSidebar />
                                </div>
                                <div className="col-md-7 order-md-2 order-3">
                                    {isLoading ? (<>
                                        <div className="center-page">
                                            <CircularProgress />
                                        </div>
                                    </>) : (<>
                                        <CreatePost feed_group={single_group.uuid} />
                                        <PostList feed_group={single_group.uuid} />
                                    </>)}
                                </div>
                                <div className="col-md-3 order-md-3 order-2">
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
