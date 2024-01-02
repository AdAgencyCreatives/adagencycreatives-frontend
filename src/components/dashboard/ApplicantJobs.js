import "../../styles/AgencyDashboard/JobApplicants.scss";
import { Tooltip } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";
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
import AddNotesModal from "./Modals/AddNotesModal";
import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import moment from "moment";

const ApplicantJobs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const [data, setData] = useState([]);
  const [tab, setTab] = useState({});

  const {
    state: { applications },
    getApplications,
    updateApplication,
    deleteApplication,
  } = useContext(JobsContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    getApplications(user.uuid);
  }, []);

  useEffect(() => {
    setData(applications);
    console.log(applications);
  }, [applications]);

  const switchTab = (id, tab) => {
    let jobIndex = applications.findIndex((job) => job.id == id);
    const updatedJob = { ...applications[jobIndex] };
    updatedJob.applications = updatedJob.applications.filter((application) => {
      if (tab == "pending") return true;
      return application.status == tab;
    });
    const updatedApplications = [...applications];
    updatedApplications[jobIndex] = updatedJob;
    setData(updatedApplications);
    setTab((prev) => ({ ...prev, [id]: tab }));
  };

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

  return (
    <div className="agency-page-jobapplicants">
      <AddNotesModal
        open={open}
        handleClose={handleClose}
        resource_id={appId}
        type="creatives"
      />
      <h3 className="page-title">All Applicants</h3>
      <div className="card">
        {data.map((item) => (
          <div className="job-applicants" key={item.id}>
            <div className="heading row d-flex align-items-center">
              <div className="col-sm-8 col-xs-12">
                <h3 className="job-title">{item.title}</h3>
              </div>
              <div className="col-sm-4 col-xs-12">
                <div className="inner-result d-flex align-items-center">
                  <div
                    className={
                      "total-applicants show-total-applicants" +
                      (tab[item.id] == "pending" || !tab[item.id]
                        ? " active"
                        : "")
                    }
                    onClick={() => switchTab(item.id, "pending")}
                  >
                    Total(s):
                    <span className="number">{item.applications_count}</span>
                  </div>
                  <div
                    className={
                      "approved-applicants show-approved-applicants" +
                      (tab[item.id] == "accepted" ? " active" : "")
                    }
                    onClick={() => switchTab(item.id, "accepted")}
                  >
                    Approved:
                    <span className="number">
                      {
                        item.applications.filter(
                          (application) => application.status == "accepted"
                        ).length
                      }
                    </span>
                  </div>
                  <div
                    className={
                      "rejected-applicants show-rejected-applicants" +
                      (tab[item.id] == "rejected" ? " active" : "")
                    }
                    onClick={() => switchTab(item.id, "rejected")}
                  >
                    Rejected(s):
                    <span className="number">
                      {
                        item.applications.filter(
                          (application) => application.status == "rejected"
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="applicants-wrapper">
              <div className="applicants-inner">
                {item.applications.length ? (
                  item.applications.map((application) => (
                    <article
                      className="applicants-job job-applicant-wrapper job_applicant"
                      key={application.id}
                    >
                      <div className="candidate-list candidate-archive-layout row align-items-center gy-3">
                        <div className="candidate-info col-sm-8">
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
                                    : "Rejected"}
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
                                  Applied date:
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
                                  setAppId(application.creative_id);
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

                                <Tooltip
                                  title="Not Aligned"
                                  onClick={() =>
                                    setApplicationStatus(
                                      item.id,
                                      application.id,
                                      "rejected"
                                    )
                                  }
                                >
                                  <button className="btn p-0 border-0 btn-hover-primary">
                                    <TfiLoop className="icon-rounded" />
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

                            <Tooltip
                              title="Remove From Job"
                              // onClick={() => deleteApplication(application.id)}
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
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>No applicants found</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantJobs;
