import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Sidebar from "../../../components/agency/Sidebar";
import "../../../styles/AgencyDashboard/index.scss";
import { useParams } from "react-router-dom";

const Agency = () => {
  const { page } = useParams();
  const components = {
    dashboard: <Dashboard />,
    profile: <Profile />,
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
