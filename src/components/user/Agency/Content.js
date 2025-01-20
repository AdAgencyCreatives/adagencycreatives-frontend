import "../../../styles/User/ProfileContent.scss";
import Reviews from "../Reviews";
import AuthModal from "../../modals/AuthModal";
import { useState } from "react";
import JobContent from "./JobContent";

const Content = ({ user, data, jobs }) => {

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const handleAuthClose = () => setAuthModalOpen(false);

  return (
    <>
      <div className="content-section">
        <h1 className="content-title">Open Positions</h1>
        <div className="jobs-list-container">
          {jobs && jobs.map((item) => (
            <JobContent user={user} data={data} item={item} setAuthModalOpen={setAuthModalOpen} />
          ))}
        </div>
      </div>
      {user && (user?.role == "creative" || user?.role == "agency" || user?.role == "admin") && data && <Reviews user={user} data={data} />}
      <AuthModal open={authModalOpen} handleClose={handleAuthClose} />
    </>
  );
};

export default Content;
