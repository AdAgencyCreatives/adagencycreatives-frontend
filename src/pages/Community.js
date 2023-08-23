import '../styles/Community.css';
import CreatePost from '../components/community/CreatePost';

const Community = () => {
  return (
    <div className="dark-container page-community mb-0 mt-4">
      <h1 className="community-title">The Creative Lounge</h1>
      <h2 className="community-subtitle">
        Creatives only. Ask for help. Offer or solicit advice. Share. Chat.
        Inspire. Tell jokes.
      </h2>
      <div className="container">
        <CreatePost />
      </div>
    </div>
  );
};

export default Community;
