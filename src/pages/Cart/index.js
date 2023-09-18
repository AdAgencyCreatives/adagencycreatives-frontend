import Sidebar from "../../components/agency/Sidebar";

export default function ({ children }) {
  return (
    <div className="agency-dashboard-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
