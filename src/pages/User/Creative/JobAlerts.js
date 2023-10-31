import "../../../styles/AgencyDashboard/MyJobs.scss";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Placeholder from "../../../assets/images/placeholder.png";
import {
  IoClose,
  IoArrowForward,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoPencil,
  IoLockOpen,
  IoBriefcaseOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as JobsContext } from "../../../context/JobsContext";
import moment from "moment";
import { Context as AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/Loader";
import { TfiNotepad } from "react-icons/tfi";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";

const MyOpportunities = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const {
    state: { applied_jobs, loading },
    getAppliedJobs,
  } = useContext(CreativesContext);

  const { deleteApplication } = useContext(JobsContext);

  const {
    state: { user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (token) getAppliedJobs();
  }, [token]);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Applied Jobs</h3>
      <AddNotesModal
        open={open}
        handleClose={handleClose}
        app_id={appId}
        uid={user.uuid}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="job-table">
              <thead>
                <tr>
                  <th className="title">Title</th>
                  <th className="jobs">Number Jobs</th>
                  <th className="frequency">Times</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applied_jobs.length &&
                  applied_jobs.map((item) => {
                    let job = item.job;
                    return (
                      <tr>
                        <td className="job-table-info">
                          <div className="job-table-info-content">
                            <div className="d-flex">
                              <div className="avatar employer">
                                <img
                                  src={job.agency.logo || Placeholder}
                                  height={100}
                                  width={100}
                                />
                              </div>
                              <div class="">
                                <div className="title-wrapper">
                                  <h3 className="job-table-info-content-title">
                                    <Link to={"/job/" + job.slug}>
                                      {job.title}
                                    </Link>
                                  </h3>
                                  {job.priority.is_featured ? (
                                    <IoCheckmarkCircle
                                      color="#34A853"
                                      size={30}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="job-metas">
                                  {job.category && (
                                    <div className="position">
                                      <IoBriefcaseOutline />
                                      <Link
                                        to={"/job-category/" + job.category}
                                        className="link-gray"
                                      >
                                        {job.category}
                                      </Link>
                                    </div>
                                  )}
                                  {job.location && (
                                    <div className="job-location location">
                                      <IoLocationOutline />
                                      <Link
                                        to={`/job-location/${job.location.state}`}
                                      >
                                        {job.location.state},
                                      </Link>
                                      <Link
                                        to={`/job-location/${job.location.city}`}
                                      >
                                        {job.location.city}
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="job-table-info-content-date-expiry">
                            <div className="created">
                              {moment(item.created_at).format("MMMM D, YYYY")}
                            </div>
                          </div>
                        </td>

                        <td className="job-table-status nowrap">
                          <div className="job-table-actions-inner pending_payment">
                            {item.status}
                          </div>
                        </td>

                        <td className="job-table-actions nowrap">
                          <div className="action-button">
                            <Tooltip title="Add Notes">
                              <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                onClick={() => {
                                  setAppId(item.id);
                                  setOpen(true);
                                }}
                              >
                                <TfiNotepad />
                              </Link>
                            </Tooltip>
                            <Tooltip title="Remove">
                              <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                onClick={() => deleteApplication(item.id)}
                              >
                                <IoClose className="icon-rounded" />
                              </Link>
                            </Tooltip>
                            <Tooltip title="View Job">
                              <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                to={"/job/" + job.slug}
                              >
                                <IoClose className="icon-rounded" />
                              </Link>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOpportunities;
