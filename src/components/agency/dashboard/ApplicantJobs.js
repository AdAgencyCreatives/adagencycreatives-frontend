import "../../../styles/AgencyDashboard/JobApplicants.scss";
import { Tooltip } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";
import {
  TfiDownload,
  TfiNotepad,
  TfiClose,
  TfiCheck,
  TfiLoop,
  TfiPlus,
} from "react-icons/tfi";
import { Link } from "react-router-dom";
import AddNotesModal from "./Modals/AddNotesModal";
import { useState } from "react";

const ApplicantJobs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="agency-page-jobapplicants">
      <h3 className="page-title">All Applicants</h3>
      <div className="card">
        <div className="job-applicants">
          <div className="heading row d-flex align-items-center">
            <div className="col-sm-8 col-xs-12">
              <h3 className="job-title">Test Job</h3>
            </div>
            <div className="col-sm-4 col-xs-12">
              <div className="inner-result d-flex align-items-center">
                <div className="total-applicants show-total-applicants active">
                  Total(s): <span className="number">2</span>
                </div>
                <div className="approved-applicants show-approved-applicants">
                  Approved: <span className="number">0</span>
                </div>
                <div className="rejected-applicants show-rejected-applicants">
                  Rejected(s): <span className="number">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="applicants-wrapper">
            <div className="applicants-inner">
              <article className="applicants-job job-applicant-wrapper job_applicant">
                <div className="candidate-list candidate-archive-layout row align-items-center gy-3">
                  <div className="candidate-info col-sm-8">
                    <div className="d-flex align-items-center">
                      <div className="candidate-info-content">
                        <div className="title-wrapper d-flex align-items-center">
                          <h2 className="candidate-title">
                            <a href="#">Test Jobss</a>
                          </h2>
                          <span className="badge bg-info pending">Pending</span>
                        </div>
                        <div className="job-metas">
                          <h4 className="job-title">
                            <a href="#" className="text-theme">
                              Test Job
                            </a>
                          </h4>
                          <div className="date">
                            <IoTimeOutline />
                            Applied date: September 19, 2023
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ali-right col-sm-4">
                    <div className="applicant-action-button action-button">
                      <Tooltip title="Add Notes">
                        <button className="btn p-0 border-0 btn-hover-primary">
                          <TfiNotepad onClick={() => setOpen(true)} />
                        </button>
                      </Tooltip>
                      <AddNotesModal open={open} handleClose={handleClose} />
                      <Tooltip title="Interested">
                        <Link className="btn p-0 border-0 btn-hover-primary">
                          <TfiCheck className="icon-rounded" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Not Aligned">
                        <Link className="btn p-0 border-0 btn-hover-primary">
                          <TfiLoop className="icon-rounded" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Download CV">
                        <Link className="btn p-0 border-0 btn-hover-primary">
                          <TfiDownload className="icon-rounded" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Remove From Job">
                        <Link className="btn p-0 border-0 btn-hover-primary">
                          <TfiClose className="icon-rounded" />
                        </Link>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantJobs;
