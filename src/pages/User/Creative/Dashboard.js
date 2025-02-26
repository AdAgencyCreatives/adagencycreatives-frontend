import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoChatbubbleEllipsesOutline,
  IoEyeOutline,
} from "react-icons/io5";

import "../../../styles/AgencyDashboard/Dashboard.scss";
import Notifications from "../../../components/dashboard/Notifications";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import JobDetail from "./JobDetail";
import { Context as JobsContext } from "../../../context/JobsContext";
import { CircularProgress } from "@mui/material";

const Dashboard = () => {

  const [applicationsData, setApplicationsData] = useState([]);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { stats, applications, loading },
    getStats,
    getApplications,
  } = useContext(CreativesContext);

  const {
    application_remove_from_recent,
  } = useContext(JobsContext);

  useEffect(() => {
    getStats();
    getApplications(user.uuid, "yes");
  }, []);

  useEffect(() => {
    if (applications?.length > 0) {
      const updatedApplications = [];
      for (let appIndex = 0; appIndex < applications.length; appIndex++) {
        const appl = applications[appIndex];
        const remove_from_recent_arr = appl?.removed_from_recent ? appl.removed_from_recent.split(',') : [];
        const user_id = '' + user.id;

        if (!remove_from_recent_arr.includes(user_id)) {
          updatedApplications.push(appl);
        }
      }
      setApplicationsData(updatedApplications);
    } else {
      setApplicationsData(applications);
    }
  }, [applications]);

  const onRemoveFromRecent = async (e, application) => {
    e.preventDefault();
    application_remove_from_recent(application.id, user.uuid, async () => {
      await getStats();
      await getApplications(user.uuid, "yes");
    });
    return false;
  };

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
                <span>New Messages</span>
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
                <span>Profile Viewed</span>
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
                <div className="number-count">{stats && stats.friends}</div>
                <span>Friends</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-sm-8">
          <Views title={"Your Profile Views"} />
        </div> */}
        <div className="col-sm-8 agency-page-myjobs my-recent-applications">
          <div className="card">
            <div className="card-title">My Recent Applications</div>
            <div className="card-body">
              {/* <JobList data={[]} /> */}
              {loading ? (
                <div className="center-page">
                  <CircularProgress />
                  <span>Loading ...</span>
                </div>
              ) : (
                <>
                  {applicationsData?.length > 0 ? (
                    <div className="table-responsive">
                      <table className="job-table">
                        <thead>
                          <tr>
                            <th className="title">Job Title</th>
                            <th className="date">Applied</th>
                            <th className="status">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applicationsData.map((item) => (<JobDetail item={item} onRemoveFromRecent={onRemoveFromRecent} />))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="mb-4">
            <Calendar />
          </div>
          <Notifications creative={user} type="job_alert" />
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
