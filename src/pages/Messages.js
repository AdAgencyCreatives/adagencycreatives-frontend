import { useContext } from "react";
import Chat from "../components/community/Chat";
import LeftSidebar from "../components/community/LeftSidebar";
import { Context } from "../context/AuthContext";
import Loader from "../components/Loader";

const Messages = () => {
  const {
    state: { token },
  } = useContext(Context);
  return (
    <div className="dark-container page-messages mb-0 mt-4">
      <div className="container-fluid mt-4">
        <div className="row gy-3">
          <div className="col-lg-2">
            <LeftSidebar />
          </div>
          <div className="col-lg-10">{token ? <Chat /> : <Loader />}</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
