import "../../styles/AgencyDashboard/JobApplicants.scss";
import AddNotesModal from "./Modals/AddNotesModal";
import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import Paginate from "../../components/Paginate";
import { CircularProgress } from "@mui/material";
import MyJobApplicantsWidget from "../job/MyJobApplicantsWidget";
import SearchBarCommon from "../../components/SearchBarCommon";

const TabularApplicantJobs = () => {

  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const [data, setData] = useState([]);
  const [tab, setTab] = useState({});
  const [statusApplication, setStatusApplication] = useState(false);

  const {
    state: { applications, isLoadingApp, applicationMeta },
    searchApplicationsAllStatus,
    updateApplication,
    deleteApplication,
  } = useContext(JobsContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    searchApplicationsAllStatus(searchInput, user.uuid, 0, 0, statusApplication, (foundJobs) => {
      filterJobApplicants(foundJobs);
    });
  }, []);


  const handleSearch = (searchText) => {
    searchApplicationsAllStatus(searchText, user.uuid, 0, 0, statusApplication, (foundJobs) => {
      filterJobApplicants(foundJobs);
    });
  }

  const filterJobApplicants = (foundJobs) => {
    const filteredJobs = foundJobs.map((job) => {
      var updatedJob = { ...job };

      if (job.advisor_id != null && job.advisor_id != user.id) {
        var recommendedApplicants = job.applications.filter((application) => application.status == "recommended");
        updatedJob.applications = recommendedApplicants;
      } else {
        var sortedApplications = [];
        sortedApplications = sortedApplications.concat(job.applications.filter((application) => application.status == "hired"));
        sortedApplications = sortedApplications.concat(job.applications.filter((application) => application.status == "pending"));
        sortedApplications = sortedApplications.concat(job.applications.filter((application) => application.status == "accepted"));
        sortedApplications = sortedApplications.concat(job.applications.filter((application) => application.status == "recommended"));
        sortedApplications = sortedApplications.concat(job.applications.filter((application) => application.status == "shortlisted"));
        sortedApplications = sortedApplications.concat(job.applications.filter((application) => application.status == "rejected"));
        updatedJob.applications = sortedApplications;
      }

      return updatedJob;
    });
    setData(filteredJobs);
  };

  // const switchTab = (id, tab) => {
  //   let jobIndex = applications.findIndex((job) => job.id == id);
  //   let updatedJob = { ...applications[jobIndex] };
  //   updatedJob.applications = updatedJob.applications.filter((application) => {
  //     if (tab == "pending") return true;
  //     return application.status == tab;
  //   });
  //   let updatedApplications = [...data];
  //   updatedApplications[jobIndex] = updatedJob;
  //   setData(updatedApplications);
  //   setTab((prev) => ({ ...prev, [id]: tab }));
  // };

  const setApplicationStatus = (job_id, app_id, status, cb = () => { }) => {
    updateApplication(app_id, { status }, () => {
      let jobIndex = data.findIndex((job) => job.id == job_id);
      const updatedJob = { ...data[jobIndex] };
      let updatedApplications = updatedJob.applications;
      let appIndex = updatedApplications.findIndex((app) => app.id == app_id);
      let updatedApp = { ...updatedApplications[appIndex] };
      updatedApp.status = status;
      updatedApplications[appIndex] = updatedApp;
      updatedJob.applications = updatedApplications;
      const updatedData = [...data];
      updatedData[jobIndex] = { ...updatedJob };
      setData(updatedData);
      showAlert("Creative status change successful");
      cb();
    });
  };

  const paginate = (page) => {
    searchApplicationsAllStatus(searchInput, user.uuid, 0, page, statusApplication, (foundJobs) => {
      filterJobApplicants(foundJobs);
    });
  };

  return (
    <div className="agency-page-myjobs tabular">
      <AddNotesModal
        open={open}
        setOpen={setOpen}
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
          <h6>Search All Applicants</h6>
          <SearchBarCommon
            input={searchInput}
            setInput={setSearchInput}
            onSearch={handleSearch}
            placeholder={"Search All Applicants"}
            searchBoxClass="search-box-common"
          />
          {data?.length > 0 ? (<>
            {applicationMeta?.total > 9 ? <Paginate meta={applicationMeta} paginate={paginate} title={"jobs"} /> : <br />}
            <div className="table-responsive" style={{ transform: "rotateX(180deg)" }}>
              <table className="job-table" style={{ transform: "rotateX(180deg)" }}>
                <thead>
                  <tr>
                    {(user?.role == "advisor" || user?.role == "recruiter") && (
                      <th style={{ minWidth: "100px" }} className="title">
                        Agency
                      </th>
                    )}
                    <th className="title">Title</th>
                    <th className="applicants">Applicants</th>
                    <th className="title">Location</th>
                    <th className="date">Created &<br />Expiration</th>
                    <th className="status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <MyJobApplicantsWidget
                      job={item}
                      setApplicationStatus={setApplicationStatus}
                      setAppId={setAppId}
                      setOpen={setOpen}
                      isJobExpired={
                        item?.expired_at &&
                        new Date(item?.expired_at) <=
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
            {applicationMeta?.total > 9 && (<Paginate meta={applicationMeta} paginate={paginate} title={"jobs"} />
            )}
          </>) : (<>
            <div className="no_result">
              <p>Please try again. No exact results found.</p>
            </div>
          </>)}
        </div>
      )}
    </div>
  );
};

export default TabularApplicantJobs;
