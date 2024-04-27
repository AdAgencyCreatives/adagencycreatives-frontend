import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Tooltip } from "@mui/material";
import AddNotesModal from "./Modals/AddNotesModal";
import { IoCloseCircleSharp, IoTimeOutline } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import {
  TfiDownload,
  TfiNotepad,
  TfiClose,
  TfiCheck,
  TfiLoop,
  TfiPlus,
  TfiBackRight,
} from "react-icons/tfi";
import { Link } from "react-router-dom";
import moment from "moment";
import Paginate from "../../components/Paginate";

const Applicants = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const [data, setData] = useState([]);
  const {
    state: { applications, isLoading, applicationMeta },
    getApplications,
    updateApplication,
    deleteApplication,
    application_remove_from_recent,
  } = useContext(JobsContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const paginate = (page) => {
    getApplications(user.uuid, 1, page);
  };

  useEffect(() => {
    getApplications(user.uuid, 1);
  }, []);

  useEffect(() => {
    if (applications?.length > 0) {
      let updatedJobs = [];

      for (let index = 0; index < applications.length; index++) {
        const job = applications[index];
        const updatedApplications = [];
        for (let appIndex = 0; appIndex < job.applications.length; appIndex++) {
          const appl = job.applications[appIndex];
          if (!appl?.removed_from_recent) {
            updatedApplications.push(appl);
          }
        }

        const updatedJob = { ...job, applications: updatedApplications };
        updatedJobs.push(updatedJob);
      }
      setData(updatedJobs);
    }
  }, [applications]);

  const setApplicationStatus = (job_id, app_id, status) => {
    updateApplication(app_id, { status }, () => {
      let jobIndex = applications.findIndex((job) => job.id == job_id);
      const updatedJob = { ...applications[jobIndex] };
      let updatedApplications = updatedJob.applications;
      let appIndex = updatedApplications.findIndex((app) => app.id == app_id);
      let updatedApp = { ...updatedApplications[appIndex] };
      updatedApp.status = status;
      updatedApplications[appIndex] = updatedApp;
      const updatedData = [...applications];
      updatedData[jobIndex] = { ...updatedJob };
      setData(updatedData);
    });
  };

  const onRemoveFromRecent = async (e, application) => {
    e.preventDefault();
    application_remove_from_recent(application.id, () => {
      let updatedJobs = [];

      for (let index = 0; index < data.length; index++) {
        const job = data[index];
        const updatedApplications = [];
        for (let appIndex = 0; appIndex < job.applications.length; appIndex++) {
          const appl = job.applications[appIndex];
          if (appl.id != application.id) {
            updatedApplications.push(appl);
          }
        }

        const updatedJob = { ...job, applications: updatedApplications };
        updatedJobs.push(updatedJob);
      }
      setData(updatedJobs);
    });
    return false;
  };

  return (
    <div className="agency-page-jobapplicants">
      <div className="card">
        <div className="card-title">Recent Applicants</div>
        <AddNotesModal
          open={open}
          handleClose={handleClose}
          resource_id={appId}
          type="applications"
        />
        <div className="card-body">
          {isLoading ? (
            <div className="center-page">
              <CircularProgress />
              <span>Loading ...</span>
            </div>
          ) : (
            <>
              {data.map((item, index) => (
                <div className="applicants-inner" key={index}>
                  {item?.applications?.length > 0 && item?.applications.map((application) => (
                    <div className="applicant-item" key={application.id}>
                      <div className="remove-recent">
                        <Tooltip title="Remove from Recent">
                          <Link to={"javascript:void(0)"} onClick={(e) => onRemoveFromRecent(e, application)}>
                            <IoCloseCircleSharp className="icon" />
                          </Link>
                        </Tooltip>
                      </div>
                      <div className="candidate-list candidate-archive-layout d-flex align-items-center">
                        <div className="candidate-info col-sm-8">
                          <p className="mb-0">{item.location && (item.location.city + ", " + item.location.state)}</p>
                          <div className="d-flex align-items-center">
                            <div className="candidate-info-content">
                              <div className="title-wrapper d-flex align-items-center">
                                <h2 className="candidate-title">
                                  <Link to={"/creative/" + application.slug}>
                                    {application.user}
                                  </Link>
                                </h2>
                                <span
                                  className={
                                    "badge " +
                                    application.status +
                                    " bg-" +
                                    (application.status == "pending"
                                      ? "info"
                                      : application.status == "accepted"
                                        ? "success"
                                        : "danger")
                                  }
                                >
                                  {application.status == "pending"
                                    ? "Pending"
                                    : application.status == "accepted"
                                      ? "Approved"
                                      : "Not Aligned"}
                                </span>
                              </div>
                              <div className="job-metas">
                                <h4 className="job-title">
                                  <Link
                                    to={"/job/" + item.slug}
                                    className="text-theme"
                                  >
                                    {item.title}
                                  </Link>
                                </h4>
                                <div className="date">
                                  <IoTimeOutline />
                                  Applied date:{" "}
                                  {moment(application.created_at).format(
                                    "MMMM D, YYYY"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ali-right col-sm-4">
                          <div className="applicant-action-button action-button">
                            <Tooltip title="Add Notes">
                              <button
                                className="btn p-0 border-0 btn-hover-primary"
                                onClick={() => {
                                  setAppId(application.id);
                                  setOpen(true);
                                }}
                              >
                                <TfiNotepad />
                              </button>
                            </Tooltip>
                            {application.status == "pending" ? (
                              <>
                                <Tooltip
                                  title="Interested"
                                  onClick={() =>
                                    setApplicationStatus(
                                      item.id,
                                      application.id,
                                      "accepted"
                                    )
                                  }
                                >
                                  <button className="btn p-0 border-0 btn-hover-primary">
                                    <TfiCheck className="icon-rounded" />
                                  </button>
                                </Tooltip>
                              </>
                            ) : (
                              <Tooltip
                                title="Undo"
                                onClick={() =>
                                  setApplicationStatus(
                                    item.id,
                                    application.id,
                                    "pending"
                                  )
                                }
                              >
                                <button className="btn p-0 border-0 btn-hover-primary">
                                  <TfiBackRight
                                    className="icon-rounded"
                                    style={{ transform: "rotateY(180deg)" }}
                                  />
                                </button>
                              </Tooltip>
                            )}

                            <Tooltip title="Download CV">
                              <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                to={application.resume_url || "#"}
                              >
                                <TfiDownload className="icon-rounded" />
                              </Link>
                            </Tooltip>

                            {application?.status == "pending" && (
                              <Tooltip
                                title="Not Aligned"
                                /* onClick={() =>
                                  deleteApplication(application.id)
                                } */
                                onClick={() =>
                                  setApplicationStatus(
                                    item.id,
                                    application.id,
                                    "rejected"
                                  )
                                }
                              >
                                <button className="btn p-0 border-0 btn-hover-primary">
                                  <TfiClose className="icon-rounded" />
                                </button>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {applicationMeta.total > 10 && <Paginate meta={applicationMeta} paginate={paginate} title={"recent applicants"} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
