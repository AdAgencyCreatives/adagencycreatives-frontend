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
import { Link, useNavigate } from "react-router-dom";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import moment from "moment";
import { Context as AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/Loader";
import { TfiNotepad } from "react-icons/tfi";
import AddNotesModal from "../../../components/dashboard/Modals/AddNotesModal";
import Paginate from "../../../components/Paginate";
import SearchBarCommon from "../../../components/SearchBarCommon";
import AgencyImageLoader from "../../../components/AgencyImageLoader";

const MyOpportunities = () => {

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [appId, setAppId] = useState("");

  const anchor = window.location.hash.slice(1);

  const {
    state: { applied_jobs, applied_jobsNextPage, applied_jobsMeta, loading },
    searchAppliedJobs,
    deleteApplication
  } = useContext(CreativesContext);


  const {
    state: { user, token },
  } = useContext(AuthContext);

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

    if (token) searchAppliedJobs(search, page, () => { setShowLoading(false); setShowResults(true); });
  }, [token]);

  const paginate = (page) => {
    setShowLoading(true);

    let params = new URLSearchParams(window.location.hash.replace("#", ""));
    params.set('page', page); // Replace 'key' with your parameter name and 'value' with your parameter value
    navigate(`#${params.toString()}`);

    let search = '';
    if (params.get('search') && params.get('search')?.length > 0) {
      search = params.get('search');
    }

    searchAppliedJobs(searchInput, page, () => { setShowLoading(false); setShowResults(true); });
  };

  const handleSearch = (searchText) => {
    setShowLoading(true);

    let params = new URLSearchParams(window.location.hash.replace("#", ""));
    if (searchText?.length > 0) {
      params.set('search', searchText);
    } else {
      params.delete('search');
    }

    navigate(`#${params.toString()}`);

    let page = 1;
    if (params.get('page') && params.get('page')?.length > 0) {
      page = params.get('page');
    }

    searchAppliedJobs(searchText, page, () => { setShowLoading(false); setShowResults(true); });
  }

  return (
    <div className="agency-page-myjobs my-opportunities">
      <h3 className="page-title">Applied Jobs</h3>
      <AddNotesModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        resource_id={appId}
        type="applications"
      />
      {showLoading ? (
        <Loader />
      ) : (
        <div className="card">
          <h6>Search Applied Jobs</h6>
          <SearchBarCommon
            input={searchInput}
            setInput={setSearchInput}
            onSearch={handleSearch}
            placeholder={"Search Applied Jobs"}
            searchBoxClass="search-box-common search-box-black-gold"
          />
          {applied_jobs?.length > 0 ? (<>
            <br />
            {applied_jobsMeta?.total > 9 && <Paginate meta={applied_jobsMeta} paginate={paginate} title={"applied jobs"} />}
            <div className="table-responsive">
              <table className="job-table">
                <thead>
                  <tr>
                    <th className="title">Job Title</th>
                    <th className="date">Date Applied</th>
                    <th className="status">Status</th>
                    <th className="actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applied_jobs.map((item) => {
                    let job = item.job;
                    return (
                      <tr key={item.id}>
                        <td className="job-table-info">
                          <div className="job-table-info-content">
                            <div className="d-flex">
                              <div className="avatar employer">
                                <Tooltip title={job.agency.name} placement="left" arrow>
                                  <AgencyImageLoader agency={job?.agency} height={100} width={100} />
                                </Tooltip>
                              </div>
                              <div className="ms-3">
                                <div className="title-wrapper">
                                  <h3 className="job-table-info-content-title">
                                    <Link to={"/job/" + job.slug}>
                                      {job.title}
                                    </Link>
                                  </h3>
                                  {/* {job.priority.is_featured ? (
                                    <IoCheckmarkCircle
                                      color="#34A853"
                                      size={30}
                                    />
                                  ) : (
                                    ""
                                  )} */}
                                </div>
                                <div className="job-metas">
                                  {job.category && (
                                    <div className="position">
                                      <IoBriefcaseOutline className="me-2" />
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
                            {/* {job?.apply_type.toLowerCase() != "external" ? (item.status == "rejected" ? "Not Aligned" : item.status) : "Interested"} */}
                            {["approved", "published"].includes(job.status.toLowerCase()) ? "Job Opened" : "Job Closed"}
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
            {applied_jobsMeta?.total > 9 && <Paginate meta={applied_jobsMeta} paginate={paginate} title={"applied jobs"} />}
          </>) : (<>
            {showResults && (
              <div className="no_result">
                {searchInput.length > 0 ? (
                  <p>Please try again. No exact results found.</p>
                ) : (
                  <p>No Jobs Applied.</p>
                )}
              </div>
            )}
          </>)}
        </div>
      )}
    </div>
  );
};

export default MyOpportunities;
