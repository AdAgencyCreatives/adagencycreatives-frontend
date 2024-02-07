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
  TfiCheckBox
} from "react-icons/tfi";
import { Link } from "react-router-dom";
import AddNotesModal from "./Modals/AddNotesModal";
import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Paginate from "../../components/Paginate";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import TimeAgo from "../TimeAgo";
import JobApplications from "../job/JobApplications";

const ApplicantJobs = () => {
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

  useEffect(() => {
    if (user.role === 'agency') {
      setStatusApplication('shortlisted');
      getApplicationsAllStatus(user.uuid, 0, 0, 'shortlisted');
    } else {
      getApplicationsAllStatus(user.uuid, 0, 0, statusApplication);
    }
  }, []);

  useEffect(() => {
    setData(applications);
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

  const paginate = (page) => {
    getApplicationsAllStatus(user.uuid, 0, page, statusApplication);
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
      {isLoadingApp ? (
        <div className="center-page">
          <CircularProgress />
          <span>Loading ...</span>
        </div>
      ) : (
        <div className="card">
          {data && data.length > 0 ? data.map((item, index) => (
            <div className="job-applicants" key={index}>
              <div className="heading row d-flex align-items-center">
                <div className="col-sm-8 col-xs-12">
                  <h3 className="job-title">{item.agency.name} - {item.title} {item.location && (<span className="location-name">{"(" + item.location.city + ", " + item.location.state + ")"}</span>)}</h3>
                  {item?.expired_at && ((new Date(item?.expired_at) < (Date.parse(new Date().toISOString())))) && (<span className="badge" style={{ backgroundColor: 'red' }}>Expired: <TimeAgo datetime={item?.expired_at} /></span>)}
                  {item?.deleted_at && ((new Date(item?.deleted_at) < (Date.parse(new Date().toISOString())))) && (<span className="badge" style={{ backgroundColor: 'red' }}>Deleted: <TimeAgo datetime={item?.deleted_at} /></span>)}
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
                          item.applications && item.applications.filter(
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
                          item.applications && item.applications.filter(
                            (application) => application.status == "rejected"
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {item.applications && item.applications.length ?
                (<JobApplications 
                  job={item} 
                  setApplicationStatus={setApplicationStatus} 
                  setAppId={setAppId} 
                  setOpen={setOpen}
                  isJobExpired={item?.expired_at && ((new Date(item?.expired_at) < (Date.parse(new Date().toISOString()))))}
                  isJobDeleted={item?.deleted_at && ((new Date(item?.deleted_at) < (Date.parse(new Date().toISOString()))))}
                   />) : (<p>No New Applicants To Show</p>)
              }
            </div>
          )) : (<p>No New Applicants To Show</p>)}
          {applicationMeta.total > 10 && <Paginate meta={applicationMeta} paginate={paginate} />}
        </div>
      )}
    </div>
  );
};

export default ApplicantJobs;
