import { Link } from "react-router-dom";
import ppk from "../../../assets/images/ppk.png";
import "../../../styles/User/ProfileContent.scss";
import { Tooltip } from "@mui/material";
import { IoStar } from "react-icons/io5";

const Content = () => {
  return (
    <>
      <div className="content-section">
        <h1 className="content-title">Open Positions</h1>
        <div className="jobs-list-container">
          <div className="job-item">
            <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
              <div className="inner-left">
                <div className="employer-logo">
                  <a href="#">
                    <img
                      width="150"
                      height="150"
                      src={ppk}
                      className=""
                      alt=""
                    />
                  </a>
                </div>
                <div className="job-list-content">
                  <div className="title-wrapper flex-middle-sm">
                    <h2 className="job-title">
                      <Link to="/job/160over90" rel="bookmark">
                        160over90
                      </Link>
                    </h2>
                  </div>
                  <div className="job-metas">
                    <div className="category-job">
                      <div className="job-category with-icon">
                        <i className="flaticon-briefcase-1"></i>
                        <a href="#">Senior Art Director</a>
                      </div>
                    </div>
                    <div className="job-deadline with-icon">
                      <i className="flaticon-wall-clock"></i> August 14, 2023
                    </div>
                    <div className="job-type with-title">
                      <a className="type-job" href="#">
                        Full-Time
                      </a>
                    </div>
                    <Tooltip title="Featured">
                      <button className="btn p-0 border-0 me-2">
                        <IoStar
                          size={20}
                          color="black"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                    <Tooltip title="Urgent">
                      <button className="btn p-0 border-0">
                        <IoStar
                          size={20}
                          color="#d3a11f"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="ali-right">
                <div className="flex-middle">
                  <a className="btn-follow btn-action-job btn-add-job-shortlist">
                    <i className="flaticon-bookmark"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                    target="_blank"
                    className="btn btn-apply btn-apply-job-external "
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="job-item">
            <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
              <div className="inner-left">
                <div className="employer-logo">
                  <a href="#">
                    <img
                      width="150"
                      height="150"
                      src={ppk}
                      className=""
                      alt=""
                    />
                  </a>
                </div>
                <div className="job-list-content">
                  <div className="title-wrapper flex-middle-sm">
                    <h2 className="job-title">
                      <a href="#" rel="bookmark">
                        160over90
                      </a>
                    </h2>
                  </div>
                  <div className="job-metas">
                    <div className="category-job">
                      <div className="job-category with-icon">
                        <i className="flaticon-briefcase-1"></i>
                        <a href="#">Senior Art Director</a>
                      </div>
                    </div>
                    <div className="job-deadline with-icon">
                      <i className="flaticon-wall-clock"></i> August 14, 2023
                    </div>
                    <div className="job-type with-title">
                      <a className="type-job" href="#">
                        Full-Time
                      </a>
                    </div>
                    <Tooltip title="Featured">
                      <button className="btn p-0 border-0 me-2">
                        <IoStar
                          size={20}
                          color="black"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                    <Tooltip title="Urgent">
                      <button className="btn p-0 border-0">
                        <IoStar
                          size={20}
                          color="#d3a11f"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="ali-right">
                <div className="flex-middle">
                  <a className="btn-follow btn-action-job btn-add-job-shortlist">
                    <i className="flaticon-bookmark"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                    target="_blank"
                    className="btn btn-apply btn-apply-job-external "
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="job-item">
            <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
              <div className="inner-left">
                <div className="employer-logo">
                  <a href="#">
                    <img
                      width="150"
                      height="150"
                      src={ppk}
                      className=""
                      alt=""
                    />
                  </a>
                </div>
                <div className="job-list-content">
                  <div className="title-wrapper flex-middle-sm">
                    <h2 className="job-title">
                      <a href="#" rel="bookmark">
                        160over90
                      </a>
                    </h2>
                  </div>
                  <div className="job-metas">
                    <div className="category-job">
                      <div className="job-category with-icon">
                        <i className="flaticon-briefcase-1"></i>
                        <a href="#">Senior Art Director</a>
                      </div>
                    </div>
                    <div className="job-deadline with-icon">
                      <i className="flaticon-wall-clock"></i> August 14, 2023
                    </div>
                    <div className="job-type with-title">
                      <a className="type-job" href="#">
                        Full-Time
                      </a>
                    </div>
                    <Tooltip title="Featured">
                      <button className="btn p-0 border-0 me-2">
                        <IoStar
                          size={20}
                          color="black"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                    <Tooltip title="Urgent">
                      <button className="btn p-0 border-0">
                        <IoStar
                          size={20}
                          color="#d3a11f"
                          className="icon-rounded"
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="ali-right">
                <div className="flex-middle">
                  <a className="btn-follow btn-action-job btn-add-job-shortlist">
                    <i className="flaticon-bookmark"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                    target="_blank"
                    className="btn btn-apply btn-apply-job-external "
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
