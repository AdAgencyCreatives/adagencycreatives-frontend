import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoChatbubbleEllipsesOutline,
  IoEyeOutline,
} from "react-icons/io5";

import "../../../styles/AgencyDashboard/Dashboard.scss";
import Views from "../../../components/dashboard/Views";
import Notifications from "../../../components/dashboard/Notifications";
import Applicants from "../../../components/dashboard/Applicants";
import { Context } from "../../../context/CreativesContext";
import { useContext, useEffect } from "react";
import JobList from "../../../components/job/JobList";

const Dashboard = () => {
  const {
    state: { stats },
    getStats,
  } = useContext(Context);

  useEffect(() => {
    getStats();
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
                <span>Review</span>
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
        <div className="col-sm-8">
          <div className="card">
            <div className="card-title">My Recent Applications</div>
            <div className="card-body">
              <JobList data={[]} />
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
