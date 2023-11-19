import "../styles/Community.css";
import CreatePost from "../components/community/CreatePost";
import LeftSidebar from "../components/community/LeftSidebar";
import PostList from "../components/community/PostList";
import RightSidebarWidgets from "../components/RightSidebarWidgets";

import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

import RestrictedLounge from "../components/RestrictedLounge";

const Community = () => {
  const feed_group = "715bfe90-833e-3459-9700-036ac28d3fd4";
  const {
    state: { token, role },
  } = useContext(AuthContext);

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <>
          <div className="dark-container page-community mb-0 mt-0">
            <h1 className="community-title">The Lounge</h1>
            <h2 className="community-subtitle">
              Creatives only. Ask for help. Offer or solicit advice. Share. Chat.
              Inspire. Tell jokes.
            </h2>
            <div className="container-fluid mt-4">
              <div className="row">
                <div className="col-md-2 mb-4 mb-md-0">
                  <LeftSidebar />
                </div>
                <div className="col-md-7 order-md-2 order-3">
                  <CreatePost feed_group={feed_group} />
                  <PostList feed_group={feed_group} />
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

export default Community;
