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
  IoEyeOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import moment from "moment";
import { Context as AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/Loader";
import { TfiNotepad } from "react-icons/tfi";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";
import Paginate from "../../../components/Paginate";

const MyOpportunities = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const {
    state: { applied_jobs, applied_jobsNextPage, applied_jobsMeta, loading },
    getAppliedJobs,
    deleteApplication
  } = useContext(CreativesContext);


  const {
    state: { user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (token) getAppliedJobs();
  }, [token]);

  const paginate = (page) => {
    getAppliedJobs(page);
  };

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Applied Jobs</h3>
      <AddNotesModal
        open={open}
        handleClose={handleClose}
        resource_id={appId}
        type="applications"
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="card">
          {applied_jobsMeta?.total > 10 && <Paginate meta={applied_jobsMeta} paginate={paginate} />}
          <div className="table-responsive">
            <table className="job-table">
              <thead>
                <tr>
                  <th className="title">Job Title</th>
                  <th className="date">Status</th>
                  <th className="status">Status</th>
                  <th className="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applied_jobs?.length > 0 &&
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
                              <div className="ms-3">
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
                                      <IoBriefcaseOutline className="me-2"/>
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
                                        to={`/job-location-state/${job.location.state}`}
                                      >
                                        {job.location.state},
                                      </Link>
                                      <Link
                                        to={`/job-location-city/${job.location.city}`}
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
                          <div className="job-table-actions-inner" style={{ textTransform: 'capitalize' }}>
                            {job?.apply_type.toLowerCase() != "external" ? item.status : "Interested"}
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
                                <IoEyeOutline className="icon-rounded" />
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
          {applied_jobsMeta?.total > 10 && <Paginate meta={applied_jobsMeta} paginate={paginate} />}
        </div>
      )}
    </div>
  );
};

export default MyOpportunities;
