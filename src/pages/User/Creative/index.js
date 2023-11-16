import Dashboard from "./Dashboard";
import Profile from "./Profile";
import MyJobs from "./MyJobs";
import Sidebar from "../../../components/dashboard/Sidebar";
import "../../../styles/AgencyDashboard/index.scss";
import { useParams } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";
import AgencyShortlist from "./AgencyShortlist";
import Packages from "./Packages";
import MyResume from "./MyResume";
import JobMessages from "../JobMessages";
import PostJob from "./PostJob";

import { useContext } from "react";
import { Context } from "../../../context/AuthContext";
import { Context as CreativeContext } from "../../../context/CreativesContext";
import MyOpportunities from "./MyOpportunities";
import { creativeNav } from "../../../nav/DashboardNav";
import { useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import JobAlerts from "./JobAlerts";

const Creative = () => {
  const {
    hideMessageAlert,
    state: { user },
  } = useContext(Context);

  const {
    state: { single_creative },
    getCreativeById,
  } = useContext(CreativeContext);

  useEffect(() => {
    if (user) {
      getCreativeById(user.uuid);
    }
  }, [user]);

  const { page } = useParams();
  const components = {
    dashboard: <Dashboard />,
    profile: <Profile />,
    "my-resume": <MyResume />,
    "my-jobs": <MyJobs />,
    "change-password": <ChangePassword />,
    "delete-profile": <DeleteProfile />,
    "agencies-shortlist": <AgencyShortlist />,
    "job-messages": <JobMessages />,
    "my-applied": <MyOpportunities />,
    "post-a-job": <PostJob />,
    "job-alerts": <JobAlerts />
  };

  // hideMessageAlert();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="agency-dashboard-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-3">
            <Sidebar
              nav={creativeNav}
              user={single_creative}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          </div>
          <div className="col-md-9 pt-5">
            <div className="sidebar-toggle d-md-none d-inline-block">
              <IoMenu
                onClick={() => setMobileOpen((prevState) => !prevState)}
              />
            </div>
            {components[page]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creative;
