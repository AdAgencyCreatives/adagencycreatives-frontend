import "../../styles/AgencyDashboard/JobApplicants.scss";
import AddNotesModal from "./Modals/AddNotesModal";
import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import Paginate from "../../components/Paginate";
import { CircularProgress } from "@mui/material";
import MyJobApplicantsWidget from "../job/MyJobApplicantsWidget";

const TabularApplicantJobs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const [data, setData] = useState([]);
  const [tab, setTab] = useState({});
  const [statusApplication, setStatusApplication] = useState(false);

  const {
    state: { applications, isLoadingApp, applicationMeta },
    getApplicationsAllStatus,
    updateApplication,
    deleteApplication,
  } = useContext(JobsContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    // if (user.role === "agency") {
    //   setStatusApplication("shortlisted");
    //   getApplicationsAllStatus(user.uuid, 0, 0, "shortlisted");
    // } else {
    //   getApplicationsAllStatus(user.uuid, 0, 0, statusApplication);
    // }
    getApplicationsAllStatus(user.uuid, 0, 0, statusApplication);
  }, []);

  useEffect(() => {
    setData(applications);
  }, [applications]);

  const switchTab = (id, tab) => {
    let jobIndex = applications.findIndex((job) => job.id == id);
    let updatedJob = { ...applications[jobIndex] };
    updatedJob.applications = updatedJob.applications.filter((application) => {
      if (tab == "pending") return true;
      return application.status == tab;
    });
    let updatedApplications = [...data];
    updatedApplications[jobIndex] = updatedJob;
    setData(updatedApplications);
    setTab((prev) => ({ ...prev, [id]: tab }));
  };

  const setApplicationStatus = (job_id, app_id, status, cb = () => {}) => {
    updateApplication(app_id, { status }, () => {
      let jobIndex = applications.findIndex((job) => job.id == job_id);
      const updatedJob = { ...applications[jobIndex] };
      let updatedApplications = updatedJob.applications;
      let appIndex = updatedApplications.findIndex((app) => app.id == app_id);
      let updatedApp = { ...updatedApplications[appIndex] };
      updatedApp.status = status;
      updatedApplications[appIndex] = updatedApp;
      updatedJob.applications = updatedApplications;
      const updatedData = [...applications];
      updatedData[jobIndex] = { ...updatedJob };
      setData(updatedData);
      // getApplicationsAllStatus(user.uuid, 0, 0, statusApplication);
      showAlert("Creative status change successful");
      cb();
    });
  };

  const paginate = (page) => {
    getApplicationsAllStatus(user.uuid, 0, page, statusApplication);
  };

  return (
    <div className="agency-page-myjobs tabular">
      <AddNotesModal
        open={open}
        handleClose={handleClose}
        resource_id={appId}
        type="creatives"
      />
      <h3 className="page-title">All Applicants</h3>
      {isLoadingApp ? (
        <div className="center-page">
          <CircularProgress />
          <span>Loading ...</span>
        </div>
      ) : (
        <div className="card">
          {applicationMeta?.total > 10 && (
            <Paginate
              meta={applicationMeta}
              paginate={paginate}
              title={"jobs"}
            />
          )}
          <div className="table-responsive">
            <table className="job-table">
              <thead>
                <tr>
                  {(user?.role == "advisor" || user?.role == "recruiter") && (
                    <th className="title">Agency</th>
                  )}
                  <th className="title">Title</th>
                  <th className="applicants">Applicants</th>
                  <th className="date">Created &amp; Expired</th>
                  <th className="status">Status</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => (
                    <MyJobApplicantsWidget
                      job={item}
                      setApplicationStatus={setApplicationStatus}
                      setAppId={setAppId}
                      setOpen={setOpen}
                      isJobExpired={
                        item?.expired_at &&
                        new Date(item?.expired_at) <
                          Date.parse(new Date().toISOString())
                      }
                      isJobDeleted={
                        item?.deleted_at &&
                        new Date(item?.deleted_at) <
                          Date.parse(new Date().toISOString())
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {applicationMeta?.total > 10 && (
            <Paginate
              meta={applicationMeta}
              paginate={paginate}
              title={"jobs"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TabularApplicantJobs;
