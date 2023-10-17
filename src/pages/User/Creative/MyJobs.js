import "../../../styles/AgencyDashboard/MyJobs.scss";
import { Tooltip } from "@mui/material";
import { IoClose, IoArrowForward, IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyJobs = () => {
  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Manage Jobs</h3>
      <div className="card">
        <div className="table-responsive">
          <table className="job-table">
            <thead>
              <tr>
                <th className="title">Title</th>
                <th className="applicants">Applicants</th>
                <th className="date">Created &amp; Expired</th>
                <th className="status">Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="job-table-info">
                  <div className="job-table-info-content">
                    <div className="title-wrapper">
                      <h3 className="job-table-info-content-title">Test Job</h3>
                      <span
                        className="urgent urgent-icon"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Urgent"
                      >
                        <i className="flaticon-waiting"></i>
                      </span>
                    </div>
                    <div className="job-metas">
                      <div className="job-location">
                        <IoLocationOutline />
                        <a href="https://adagencycreatives.com/job-location/little-rock/">
                          Little Rock
                        </a>
                        ,
                        <a href="https://adagencycreatives.com/job-location/arkansas/">
                          Arkansas
                        </a>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="job-table-applicants text-theme nowrap">
                  <span className="number">0</span> Applicant(s)
                </td>

                <td>
                  <div className="job-table-info-content-date-expiry">
                    <div className="created">
                      <strong>Created: </strong>September 18, 2023
                    </div>
                    <div className="expiry-date">
                      <strong>Expiration date: </strong>
                      <span className="text-danger">-- </span>
                    </div>
                  </div>
                </td>

                <td className="job-table-status nowrap">
                  <div className="job-table-actions-inner pending_payment">
                    Pending Payment
                  </div>
                </td>

                <td className="job-table-actions nowrap">
                  <div className="action-button">
                    <Tooltip title="Continue">
                      <Link className="btn p-0 border-0 btn-hover-primary">
                        <IoArrowForward className="icon-rounded" />
                      </Link>
                    </Tooltip>

                    <Tooltip title="Remove">
                      <Link className="btn p-0 border-0 btn-hover-primary">
                        <IoClose className="icon-rounded" />
                      </Link>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
