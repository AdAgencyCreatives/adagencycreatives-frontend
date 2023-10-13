import "../styles/Community.css";
import CreatePost from "../components/community/CreatePost";
import LeftSidebar from "../components/community/LeftSidebar";
import PostList from "../components/community/PostList";
import RightSidebarWidgets from "../components/RightSidebarWidgets";
import { useContext } from "react";
import { Context as CommunityContext } from "../context/CommunityContext";

const Community = () => {
  const { state } = useContext(CommunityContext);
  return (
    <div className="dark-container page-community mb-0 mt-4">
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
            <CreatePost />
            <PostList />
          </div>
          <div className="col-md-3 order-md-3 order-2">
            <RightSidebarWidgets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
