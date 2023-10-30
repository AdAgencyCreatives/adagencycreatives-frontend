import "../styles/Community.css";
import CreatePost from "../components/community/CreatePost";
import LeftSidebar from "../components/community/LeftSidebar";
import PostList from "../components/community/PostList";
import RightSidebarWidgets from "../components/RightSidebarWidgets";

import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const Community = () => {
  const {
    state: { token, role },
  } = useContext(AuthContext);

  return (
    <div className="dark-container page-community mb-0 mt-4">
      <h1 className="community-title">The Lounge</h1>
      <h2 className="community-subtitle">
        Creatives only. Ask for help. Offer or solicit advice. Share. Chat.
        Inspire. Tell jokes.
      </h2>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-2 mb-4 mb-md-0">
              <LeftSidebar />
            </div>
            <div className="col-md-7 order-md-2 order-3">
              <CreatePost />
              <PostList />
            </div>
            <div className="col-md-3 order-md-3 order-2">
              <RightSidebarWidgets />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-12 mb-4 mb-md-0">
              <div className="restricted-creatives-only">
                <div className="restricted-message">
                  <h4>The Lounge is restricted for creatives only.</h4>
                  <h5>Please login as creative to access the lounge.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
