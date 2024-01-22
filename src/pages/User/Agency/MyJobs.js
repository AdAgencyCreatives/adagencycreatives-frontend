import "../../../styles/AgencyDashboard/MyJobs.scss";
import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";

import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as JobsContext } from "../../../context/JobsContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import MyJobWidget from "../../../components/job/MyJobWidget";

const MyJobs = () => {

  const { showAlert } = useContext(AlertContext)

  const {
    state: { open_positions, loading, meta },
    getOpenPositions,
  } = useContext(AgenciesContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const paginate = (page) => {
    getOpenPositions(user.uuid, page);
  };

  useEffect(() => {
    if (user) getOpenPositions(user.uuid);
  }, [user]);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Manage Jobs</h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="job-table">
              <thead>
                <tr>
                  {(user?.role == 'advisor' || user?.role == 'recruiter') && (
                    <th className="title">Agency</th>
                  )}
                  <th className="title">Title</th>
                  <th className="applicants">Applicants</th>
                  <th className="date">Created &amp; Expired</th>
                  <th className="status">Status</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {open_positions &&
                  open_positions.map((job) => (
                    <MyJobWidget job={job} />
                  ))}
              </tbody>
            </table>
          </div>
          {open_positions && meta.total > 10 && <Paginate meta={meta} paginate={paginate} />}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
