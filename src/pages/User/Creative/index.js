import Dashboard from "./Dashboard";
import Profile from "./Profile";
import MyJobs from "./MyJobs";
import Sidebar from "../../../components/creative/Sidebar";
import "../../../styles/AgencyDashboard/index.scss";
import { useParams } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";
import AgencyShortlist from "./AgencyShortlist";
import Packages from "./Packages";
import MyResume from "./MyResume";
import JobMessages from "../JobMessages";

import { useContext } from "react";
import { Context } from "../../../context/AuthContext";
import MyOpportunities from "./MyOpportunities";

const Creative = () => {
  const {
    hideMessageAlert
  } = useContext(Context);

  const { page } = useParams();
  const components = {
    "dashboard": <Dashboard />,
    "profile": <Profile />,
    "my-resume": <MyResume />,
    "my-jobs": <MyJobs />,
    "change-password": <ChangePassword />,
    "delete-profile": <DeleteProfile />,
    "agencies-shortlist": <AgencyShortlist />,
    "job-messages": <JobMessages />,
    "my-applied": <MyOpportunities />,
  };

  // hideMessageAlert();

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

export default Creative;
