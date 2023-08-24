import "../styles/Community.css";
import CreatePost from "../components/community/CreatePost";
import LeftSidebar from "../components/community/LeftSidebar";
import PostList from "../components/community/PostList";

const Community = () => {
  return (
    <div className="dark-container page-community mb-0 mt-4">
      <h1 className="community-title">The Creative Lounge</h1>
      <h2 className="community-subtitle">
        Creatives only. Ask for help. Offer or solicit advice. Share. Chat.
        Inspire. Tell jokes.
      </h2>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2">
            <LeftSidebar />
          </div>
          <div className="col-8">
            <CreatePost />
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
