import Dashboard from "./Dashboard";
import Sidebar from "../../../components/agency_dashboard/Sidebar";

const Agency = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Agency;
