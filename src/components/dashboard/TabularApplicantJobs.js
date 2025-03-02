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
import { useNavigate } from "react-router-dom";

const TabularApplicantJobs = () => {

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");
  const [tab, setTab] = useState({});
  const [statusApplication, setStatusApplication] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    state: { applications, isLoadingApp, applicationMeta },
    searchApplicationsAllStatus,
    updateApplication,
  } = useContext(JobsContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    let params = new URLSearchParams(window.location.hash.replace("#", ""));

    let search = '';
    if (params.get('search') && params.get('search')?.length > 0) {
      search = params.get('search');
    }

    setSearchInput(search);

    let page = 1;
    if (params.get('page') && params.get('page')?.length > 0) {
      page = params.get('page');
    }

    searchApplicationsAllStatus(search, user.uuid, 0, page, statusApplication, (foundJobs) => { });
  }, []);

  const handleSearch = (searchText) => {
    setShowLoading(true);

    let params = new URLSearchParams(window.location.hash.replace("#", ""));
    params.set('search', searchText);
    navigate(`#${params.toString()}`);

    let page = 1;
    if (params.get('page') && params.get('page')?.length > 0) {
      page = params.get('page');
    }

    searchApplicationsAllStatus(searchText, user.uuid, 0, page, statusApplication, (foundJobs) => {
      setShowLoading(false);
    });
  }

  const setApplicationStatus = (job_id, app_id, status, cb = () => { }) => {
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
      showAlert("Creative status change successful");
      cb();
    });
  };

  const paginate = (page) => {
    setShowLoading(true);
    setCurrentPage(page);

    let params = new URLSearchParams(window.location.hash.replace("#", ""));
    params.set('page', page); // Replace 'key' with your parameter name and 'value' with your parameter value
    navigate(`#${params.toString()}`);

    let search = '';
    if (params.get('search') && params.get('search')?.length > 0) {
      search = params.get('search');
    }

    searchApplicationsAllStatus(search, user.uuid, 0, page, statusApplication, (foundJobs) => {
      setShowLoading(false);
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
      {(showLoading || (!(applications?.length > 0) && isLoadingApp)) ? (
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
            searchBoxClass="search-box-common search-box-black-gold"
          />
          {applications?.length > 0 ? (<>
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
                    {/* <th className="title">Location</th> */}
                    <th className="date">Created &<br />Expiration</th>
                    <th className="status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((item) => (
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
                      currentPage={currentPage}
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
