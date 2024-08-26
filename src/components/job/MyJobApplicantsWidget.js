import { useContext, useState } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import {
  IoCheckmarkCircle,
  IoCloseCircleSharp,
  IoLocationOutline,
} from "react-icons/io5";
import moment from "moment";
import TimeAgo from "../TimeAgo";
import TabularJobApplications from "./TabularJobApplications";
import { FaHandsHelping } from "react-icons/fa";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MyJobApplicantsWidget = ({
  job,
  setApplicationStatus,
  setAppId,
  setOpen,
  isJobExpired,
  isJobDeleted,
}) => {
  const [thisJob, setThisJob] = useState(job);
  const [showApplications, setShowApplications] = useState(false);
  const { showAlert } = useContext(AlertContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const { markFilled } = useContext(JobsContext);

  const handleMarkFilled = (e, job) => {
    if (job?.status == "filled") {
      showAlert("Job Vacancy Already Filled");
      return;
    }
    (async () => {
      let result = await markFilled(job.id, "filled");
      if (result && result.status == "filled") {
        showAlert("Job Marked Filled");
        setThisJob({ ...job, status: result.status });
      } else {
        showAlert("Oops! Unable to fill Job at the moment");
      }
    })();
  };

  const handleMarkApprove = (e, job) => {
    if (job?.status == "approved") {
      showAlert("Job Already Approved");
      return;
    }
    (async () => {
      let result = await markFilled(job.id, "approved");
      if (result && result.status == "approved") {
        showAlert("Job Approved Successfully");
        setThisJob({ ...job, status: result.status });
      } else {
        showAlert("Oops! Unable to fill Job at the moment");
      }
    })();
  };

  return (
    <>
      <tr key={thisJob.id}>
        {(user?.role == "advisor" || user?.role == "recruiter") && (
          <td style={{ minWidth: "100px" }} className="job-table-status">
            <b>{thisJob.agency.name}</b>
          </td>
        )}

        <td className="job-table-info">
          <div className="job-table-info-content">
            <div className="title-wrapper" style={{ marginBottom: "0px" }}>
              <h3 className="job-table-info-content-title" style={{ flex: "1", display: 'flex' }}>
                {(thisJob?.advisor_id && thisJob?.advisor_id != user.id) && (
                  <Tooltip title={<div className="advisor-tooltip">This job was posted by an Advisor</div>} placement="top" arrow>
                    <Link className="link-svg-dark" onClick={(e) => { e.preventDefault(); return false; }}>
                      <FaHandsHelping style={{ marginRight: '5px' }} />
                    </Link>
                  </Tooltip>
                )}
                <Link
                  className="link link-black hover-gold link-bold"
                  to={"/job/" + thisJob.slug}
                >
                  <u>{thisJob.title}</u>
                </Link>
              </h3>
              {thisJob.priority.is_featured ? (
                <IoCheckmarkCircle color="#34A853" size={30} style={{ minWidth: "30px", minHeight: "30px" }} />
              ) : (
                ""
              )}
            </div>
          </div>
        </td>


        <td className="job-table-applicants text-theme nowrap">
          {job?.applications?.length > 0 ? (
            <>
              {/* <span className="number">{thisJob?.applications?.length}</span>{" "}
              Applicant
              {thisJob?.applications?.length > 1 ? "s" : ""} */}
              {/* <br /> */}
              <Button
                className="btn btn-dark btn-sm"
                style={{
                  padding: "0px 6px",
                  margin: "0px",
                  width: "100px",
                }}
                onClick={(e) => setShowApplications((state) => !state)}
              >
                {showApplications ? "Hide" : "Show"}&nbsp;
                <span className="number">{thisJob?.applications?.length}</span>
                {/* &nbsp;Applicant{thisJob?.applications?.length > 1 ? "s" : ""} */}
              </Button>
            </>
          ) : (
            <>No Applicants</>
          )}
        </td>

        <td className="job-table-info">
          <div className="job-table-info-content" style={{ minWidth: "100px" }}>
            <div className="job-metas">
              <div className="job-location location" style={{ display: "flex", justifyContent: "center" }}>
                {(thisJob?.location?.state?.length ||
                  thisJob?.location?.city?.length) && <IoLocationOutline />}
                {thisJob.location?.state && (
                  <Link
                    className="link link-black hover-gold"
                    to={`/job-location-state/${thisJob.location.state}`}
                  >
                    {thisJob.location.state}
                  </Link>
                )}
                {thisJob?.location?.state?.length &&
                  thisJob?.location?.city?.length && <span>,&nbsp;</span>}
                {thisJob.location?.city && (
                  <Link
                    className="link link-black hover-gold"
                    to={`/job-location-city/${thisJob.location.city}`}
                  >
                    {thisJob.location.city}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </td>

        <td>
          <div className="job-table-info-content-date-expiry">
            <div className="created">
              {moment(thisJob.created_at).format("MMM D, YYYY")}
            </div>
            <div className="expiry-date">
              <span className="text-danger">
                {moment(thisJob.expired_at).format("MMM D, YYYY")}
              </span>
            </div>
          </div>
        </td>

        <td className="job-table-status nowrap">
          {!(
            (thisJob?.expired_at &&
              new Date(thisJob?.expired_at) <=
              Date.parse(new Date().toISOString())) ||
            thisJob?.deleted_at
          ) && (
              <>
                {thisJob.status == "approved" && (
                  <span className="badge bg-primary">Active</span>
                )}
                {thisJob.status == "filled" && (
                  <span className="badge bg-success">Filled</span>
                )}
              </>
            )}
          {thisJob?.deleted_at &&
            new Date(thisJob?.deleted_at) <
            Date.parse(new Date().toISOString()) ? (
            <div className="job-status-center">
              <span className="badge bg-danger">
                Deleted
              </span><TimeAgo datetime={thisJob?.deleted_at} />
            </div>
          ) : (
            <>
              {thisJob?.expired_at &&
                new Date(thisJob?.expired_at) <=
                Date.parse(new Date().toISOString()) && (
                  <div className="job-status-center">
                    <span className="badge bg-danger">
                      Expired
                    </span><TimeAgo datetime={thisJob?.expired_at} />
                  </div>
                )}
            </>
          )}
        </td>
      </tr>
      <Dialog
        open={showApplications && thisJob?.applications?.length > 0}
        onClose={(e) => setShowApplications(false)}
        scroll="body"
        fullWidth={true}
        maxWidth={false}
      >
        <DialogTitle>My Applicants — {job?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div className="agency-page-myjobs tabular dialog">
            <IoCloseCircleSharp size={30} className="close-modal" onClick={(e) => setShowApplications(false)} />
            {thisJob?.applications?.length > 0 ? (
              <TabularJobApplications
                job={thisJob}
                setApplicationStatus={setApplicationStatus}
                setAppId={setAppId}
                setOpen={setOpen}
                isJobExpired={
                  thisJob?.expired_at &&
                  new Date(thisJob?.expired_at) <=
                  Date.parse(new Date().toISOString())
                }
                isJobDeleted={
                  thisJob?.deleted_at &&
                  new Date(thisJob?.deleted_at) <
                  Date.parse(new Date().toISOString())
                }
              />
            ) : (
              <p>No New Applicants To Show</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="btn btn-dark" onClick={(e) => setShowApplications(false)}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyJobApplicantsWidget;
