import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoChatbubbleEllipsesOutline,
  IoEyeOutline,
  IoLocationOutline,
  IoCheckmarkCircle
} from "react-icons/io5";

import "../../../styles/AgencyDashboard/Dashboard.scss";
import Views from "../../../components/dashboard/Views";
import Notifications from "../../../components/dashboard/Notifications";
import Applicants from "../../../components/dashboard/Applicants";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect } from "react";
import Loader from "../../../components/Loader";
import JobList from "../../../components/job/JobList";
import Placeholder from "../../../assets/images/placeholder.png";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { stats, applications, loading },
    getStats,
    getApplications,
  } = useContext(CreativesContext);

  useEffect(() => {
    getStats();
    getApplications(user.uuid);
  }, []);

  return (
    <div className="dashboard-wrapper agency-page-dashboard">
      <h3 className="page-title">Dashboard Statistics</h3>
      <div className="statistics row">
        <div className="col-xs-12 col-lg-3 col-sm-6">
          <div className="inner-header">
            <div className="posted-jobs list-item flex-middle justify-content-between text-right">
              <div className="icon-wrapper">
                <div className="icon">
                  <IoBriefcaseOutline />
                </div>
              </div>
              <div className="inner">
                <div className="number-count">
                  {stats && stats.jobs_applied}
                </div>
                <span>Applied Jobs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-sm-6">
          <div className="inner-header">
            <div className="views-count-wrapper list-item flex-middle justify-content-between text-right">
              <div className="icon-wrapper">
                <div className="icon">
                  <IoChatbubbleEllipsesOutline />
                </div>
              </div>
              <div className="inner">
                <div className="number-count">{stats && stats.review}</div>
                <span>Messages</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-sm-6">
          <div className="inner-header">
            <div className="review-count-wrapper list-item flex-middle justify-content-between text-right">
              <div className="icon-wrapper">
                <div className="icon">
                  <IoEyeOutline />
                </div>
              </div>
              <div className="inner">
                <div className="number-count">{stats && stats.views}</div>
                <span>Views</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-sm-6">
          <div className="inner-header">
            <div className="shortlist list-item flex-middle justify-content-between text-right">
              <div className="icon-wrapper">
                <div className="icon">
                  <IoBookmarkOutline />
                </div>
              </div>
              <div className="inner">
                <div className="number-count">{stats && stats.shortlisted}</div>
                <span>Shortlisted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-sm-8">
          <Views title={"Your Profile Views"} />
        </div> */}
        <div className="col-sm-8 agency-page-myjobs">
          <div className="card">
            <div className="card-title">My Recent Applications</div>
            <div className="card-body">
              {/* <JobList data={[]} /> */}
              {loading ? (<Loader />) : (
                <div className="table-responsive">
                  <table className="job-table">
                    <thead>
                      <tr>
                        <th className="title">Job Title</th>
                        <th className="date">User</th>
                        <th className="status">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications &&
                        applications.map((item) => {
                          let job = item.relationships.job;
                          return (
                            <tr key={item.id}>
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
                                            <Link to={`/job-location/${job.location.state}`}>{job.location.state}</Link>
                                            <Link to={`/job-location/${job.location.city}`}>, {job.location.city}</Link>
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
                                    {item.user}
                                  </div>
                                </div>
                              </td>
                              <td className="job-table-status nowrap">
                                <div className="job-table-actions-inner pending_payment">
                                  {item.status}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>)}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="mb-4">
            <Calendar />
          </div>
          <Notifications />
        </div>
      </div>
      {/* <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-title">My Recent Applications</div>
            <div className="card-body">
              <JobList data={[]} />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
