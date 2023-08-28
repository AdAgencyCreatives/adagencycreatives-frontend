import { useParams } from "react-router-dom";
import Header from "../../components/user/Header";
import '../../styles/User.css';

const Friends = () => {
  const { username } = useParams();
  return (
    <div className="dark-container page-community-members">
      <div className="container p-md-0 px-5">
        <Header username={username} />
      </div>
    </div>
  );
};

export default Friends;
