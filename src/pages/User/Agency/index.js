import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";
import Sidebar from "../../../components/agency/Sidebar";
import "../../../styles/AgencyDashboard/index.scss";
import { useMatch, useParams } from "react-router-dom";
import ApplicantJobs from "../../../components/agency/dashboard/ApplicantJobs";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";
import CreativeShortlist from "./CreativeShortlist";
import Packages from "./Packages";
import MyResume from "./MyResume";
import JobPost from "../../Jobs/JobPostForm";
import useToken from "../../../hooks/useToken";
import Loader from "../../../components/Loader";

const Agency = () => {
  const { page } = useParams();
  const token = useToken();
  const components = {
    dashboard: <Dashboard />,
    profile: <Profile />,
    "my-resume": <MyResume />,
    "post-a-job": <PostJob />,
    "my-jobs": <MyJobs />,
    "applicant-jobs": <ApplicantJobs />,
    "change-password": <ChangePassword />,
    "delete-profile": <DeleteProfile />,
    "shortlist-creatives": <CreativeShortlist />,
    packages: <Packages />,
  };

  let component = components[page];
  const match = useMatch("job/edit/:id");
  if (match) {
    component = <JobPost id={match.params.id} />;
  }

  return (
    <div className="agency-dashboard-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pt-5">{token ? component : <Loader />}</div>
        </div>
      </div>
    </div>
  );
};

export default Agency;
