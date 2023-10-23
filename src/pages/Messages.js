import Chat from "../components/Chat";
import LeftSidebar from "../components/community/LeftSidebar";

const Messages = () => {
  return (
    <div className="dark-container page-messages mb-0 mt-4">
      <div className="container-fluid mt-4">
        <div className="row gy-3">
          <div className="col-lg-2">
            <LeftSidebar />
          </div>
          <div className="col-lg-10">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
