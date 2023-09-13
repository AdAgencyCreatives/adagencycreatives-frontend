import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoChatbubbleEllipsesOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

import "../../../styles/AgencyDashboard/Dashboard.scss";
import Views from "../../../components/agency/dashboard/Views";
import Notifications from "../../../components/agency/dashboard/Notifications";
import Applicants from "../../../components/agency/dashboard/Applicants";

const Dashboard = () => {
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
                <div className="number-count">0</div>
                <span>Posted Jobs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-sm-6">
          <div className="inner-header">
            <div className="views-count-wrapper list-item flex-middle justify-content-between text-right">
              <div className="icon-wrapper">
                <div className="icon">
                  <IoDocumentTextOutline />
                </div>
              </div>
              <div className="inner">
                <div className="number-count">0</div>
                <span>Application</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-sm-6">
          <div className="inner-header">
            <div className="review-count-wrapper list-item flex-middle justify-content-between text-right">
              <div className="icon-wrapper">
                <div className="icon">
                  <IoChatbubbleEllipsesOutline />
                </div>
              </div>
              <div className="inner">
                <div className="number-count">0</div>
                <span>Review</span>
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
                <div className="number-count">0</div>
                <span>Shortlisted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <Views />
        </div>
        <div className="col-sm-4">
          <Notifications />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Applicants />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
