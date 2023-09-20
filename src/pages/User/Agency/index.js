import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";
import Sidebar from "../../../components/agency/Sidebar";
import "../../../styles/AgencyDashboard/index.scss";
import { useParams } from "react-router-dom";
import ApplicantJobs from "../../../components/agency/dashboard/ApplicantJobs";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";

const Agency = () => {
  const { page } = useParams();
  const components = {
    "dashboard": <Dashboard />,
    "profile": <Profile />,
    "post-a-job": <PostJob />,
    "my-jobs": <MyJobs />,
    "applicant-jobs": <ApplicantJobs />,
    "change-password": <ChangePassword />,
    "delete-profile": <DeleteProfile />,
  };

  return (
    <div className="agency-dashboard-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pt-5">{components[page]}</div>
        </div>
      </div>
    </div>
  );
};

export default Agency;
