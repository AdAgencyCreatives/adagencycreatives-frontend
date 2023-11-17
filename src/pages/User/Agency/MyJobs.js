import "../../../styles/AgencyDashboard/MyJobs.scss";
import { Tooltip } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  IoClose,
  IoArrowForward,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoPencil,
  IoLockOpen,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import moment from "moment";
import { Context as AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/Loader";

const MyJobs = () => {
  const {
    state: { open_positions, loading },
    getOpenPositions,
    deleteJob,
  } = useContext(AgenciesContext);

  const {
    state: { user },
  } = useContext(AuthContext);

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
                    <tr key={job.id}>
                      <td className="job-table-info">
                        <div className="job-table-info-content">
                          <div className="title-wrapper">
                            <h3 className="job-table-info-content-title">
                              <Link to={"/job/" + job.slug}>{job.title}</Link>
                            </h3>
                            {job.priority.is_featured ? (
                              <IoCheckmarkCircle color="#34A853" size={30} />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="job-metas">
                            {job.location && (
                              <div className="job-location location">
                                <IoLocationOutline />
                                <Link
                                  to={`/job-location/${job.location.state}`}
                                >
                                  {job.location.state},
                                </Link>
                                <Link to={`/job-location/${job.location.city}`}>
                                  {job.location.city}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="job-table-applicants text-theme nowrap">
                        <span className="number">{job.applications_count}</span>{" "}
                        Applicant(s)
                      </td>

                      <td>
                        <div className="job-table-info-content-date-expiry">
                          <div className="created">
                            <strong>Created: </strong>
                            {moment(job.created_at).format("MMMM D, YYYY")}
                          </div>
                          <div className="expiry-date">
                            <strong>Expiration date: </strong>
                            <span className="text-danger">
                              {moment(job.expired_at).format("MMMM D, YYYY")}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="job-table-status nowrap">
                        <div className="job-table-actions-inner pending_payment">
                          {job.status}
                        </div>
                      </td>

                      <td className="job-table-actions nowrap">
                        <div className="action-button">
                          <Tooltip title="Mark filled">
                            <Link className="btn p-0 border-0 btn-hover-primary">
                              <IoLockOpen className="icon-rounded" />
                            </Link>
                          </Tooltip>

                          <Tooltip title="Edit">
                            <Link
                              className="btn p-0 border-0 btn-hover-primary"
                              to={"/job/edit/" + job.id}
                            >
                              <IoPencil className="icon-rounded" />
                            </Link>
                          </Tooltip>

                          <Tooltip title="Remove">
                            <Link
                              className="btn p-0 border-0 btn-hover-primary"
                              onClick={() => deleteJob(job.id)}
                            >
                              <IoClose className="icon-rounded" />
                            </Link>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
