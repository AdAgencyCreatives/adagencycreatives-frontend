import {
  IoBookmarkOutline,
  IoBriefcaseOutline,
  IoChatbubbleEllipsesOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

import '../../../styles/AgencyDashboard/Dashboard.scss'

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper agency-page-dashboard">
      <h3 className="page-title">Dashboard Statistics</h3>
      <div class="statistics row">
        <div class="col-xs-12 col-lg-3 col-sm-6">
          <div class="inner-header">
            <div class="posted-jobs list-item flex-middle justify-content-between text-right">
              <div class="icon-wrapper">
                <div class="icon">
                  <IoBriefcaseOutline />
                </div>
              </div>
              <div class="inner">
                <div class="number-count">0</div>
                <span>Posted Jobs</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-lg-3 col-sm-6">
          <div class="inner-header">
            <div class="views-count-wrapper list-item flex-middle justify-content-between text-right">
              <div class="icon-wrapper">
                <div class="icon">
                  <IoDocumentTextOutline />
                </div>
              </div>
              <div class="inner">
                <div class="number-count">0</div>
                <span>Application</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-lg-3 col-sm-6">
          <div class="inner-header">
            <div class="review-count-wrapper list-item flex-middle justify-content-between text-right">
              <div class="icon-wrapper">
                <div class="icon">
                  <IoChatbubbleEllipsesOutline />
                </div>
              </div>
              <div class="inner">
                <div class="number-count">0</div>
                <span>Review</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-lg-3 col-sm-6">
          <div class="inner-header">
            <div class="shortlist list-item flex-middle justify-content-between text-right">
              <div class="icon-wrapper">
                <div class="icon">
                  <IoBookmarkOutline />
                </div>
              </div>
              <div class="inner">
                <div class="number-count">0</div>
                <span>Shortlisted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
