import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";
import Sidebar from "../../../components/dashboard/Sidebar";
import "../../../styles/AgencyDashboard/index.scss";
import { useMatch, useParams } from "react-router-dom";
import ApplicantJobs from "../../../components/dashboard/ApplicantJobs";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";
import CreativeShortlist from "./CreativeShortlist";
import Packages from "./Packages";
import JobPost from "../../Jobs/JobPostForm";
import useToken from "../../../hooks/useToken";
import Loader from "../../../components/Loader";
import JobMessages from "../JobMessages";
import HireAdvisor from "./HireAdvisor";
import { agencyNav } from "../../../nav/DashboardNav";
import { Context } from "../../../context/AuthContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import { useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";

const Agency = () => {
  const {
    hideMessageAlert,
    state: { user },
  } = useContext(Context);

  const {
    state: { single_agency },
    getAgencyById,
  } = useContext(AgenciesContext);

  useEffect(() => {
    if (user) {
      getAgencyById(user, true);
    }
  }, [user]);

  const { page } = useParams();
  const token = useToken();
  const components = {
    dashboard: <Dashboard />,
    profile: <Profile />,
    "post-a-job": <PostJob />,
    "my-jobs": <MyJobs />,
    "applicant-jobs": <ApplicantJobs />,
    "change-password": <ChangePassword />,
    "delete-profile": <DeleteProfile />,
    "shortlist-creatives": <CreativeShortlist />,
    "job-messages": <JobMessages />,
    "hire-an-advisor": <HireAdvisor />,
    packages: <Packages />,
  };

  let component = components[page];
  const match = useMatch("job/edit/:id");
  if (match) {
    component = <PostJob id={match.params.id} />;
  }

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="agency-dashboard-container">
      <div className="container-fluid">
        <div className="row div_row">
          <div className="col-md-3 pt-3 menu_left">
            <Sidebar
              nav={agencyNav}
              user={single_agency}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          </div>
          <div className="col-md-9 pt-5 div_content-right">
            <div className="sidebar-toggle d-md-none d-inline-block">
              <IoMenu
                onClick={() => setMobileOpen((prevState) => !prevState)}
              />
            </div>
            {token ? component : <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agency;
