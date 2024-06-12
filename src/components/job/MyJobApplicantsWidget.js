import { useContext, useState, useEffect } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AgenciesContext } from "../../context/AgenciesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Button, Tooltip } from "@mui/material";
import { Link, useAsyncError } from "react-router-dom";
import {
  IoCheckmarkCircle,
  IoClose,
  IoLocationOutline,
  IoSyncOutline,
  IoLockOpen,
  IoPencil,
} from "react-icons/io5";
import moment from "moment";
import TimeAgo from "../TimeAgo";
import TabularJobApplications from "./TabularJobApplications";

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

  const { deleteJob, getOpenPositions } = useContext(AgenciesContext);

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
          <td className="job-table-status">{job.agency.name}</td>
        )}

        <td className="job-table-info">
          <div className="job-table-info-content">
            <div className="title-wrapper">
              <h3 className="job-table-info-content-title">
                <Link
                  className="link link-black hover-gold link-bold"
                  to={"/job/" + thisJob.slug}
                >
                  {thisJob.title}
                </Link>
              </h3>
              {job.priority.is_featured ? (
                <IoCheckmarkCircle color="#34A853" size={30} />
              ) : (
                ""
              )}
            </div>
            <div className="job-metas">
              <div className="job-location location">
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

        <td className="job-table-applicants text-center text-theme nowrap">
          {thisJob?.applications_count > 0 ? (
            <>
              <span className="number">{thisJob.applications_count}</span>{" "}
              Applicant
              {thisJob?.applications_count > 1 ? "s" : ""}
              <br />
              <Button
                className="btn btn-dark btn-sm"
                style={{ padding: "0px 6px", margin: "5px 0px 0px 0px" }}
                onClick={(e) => setShowApplications((state) => !state)}
              >
                {showApplications ? "Hide" : "Show"}
              </Button>
            </>
          ) : (
            <>No Applicants</>
          )}
        </td>

        <td>
          <div className="job-table-info-content-date-expiry">
            <div className="created">
              <strong>Created: </strong>
              {moment(thisJob.created_at).format("MMMM D, YYYY")}
            </div>
            <div className="expiry-date">
              <strong>Expiration date: </strong>
              <span className="text-danger">
                {moment(thisJob.expired_at).format("MMMM D, YYYY")}
              </span>
            </div>
          </div>
        </td>

        <td className="job-table-status nowrap">
          {!(
            (thisJob?.expired_at &&
              new Date(thisJob?.expired_at) <
                Date.parse(new Date().toISOString())) ||
            thisJob?.deleted_at
          ) && (
            <>
              {thisJob.status == "approved" && (
                <span
                  className="badge"
                  style={{ backgroundColor: "#d3a11f", marginRight: "5px" }}
                >
                  Active
                </span>
              )}
              {thisJob.status == "filled" && (
                <span
                  className="badge"
                  style={{
                    backgroundColor: "green",
                    marginRight: "5px",
                  }}
                >
                  Filled
                </span>
              )}
            </>
          )}
          {thisJob?.expired_at &&
            new Date(thisJob?.expired_at) <
              Date.parse(new Date().toISOString()) && (
              <span
                className="badge"
                style={{ backgroundColor: "red", marginRight: "5px" }}
              >
                Expired: <TimeAgo datetime={thisJob?.expired_at} />
              </span>
            )}
          {job?.deleted_at &&
            new Date(thisJob?.deleted_at) <
              Date.parse(new Date().toISOString()) && (
              <span
                className="badge"
                style={{ backgroundColor: "red", marginRight: "5px" }}
              >
                Deleted: <TimeAgo datetime={thisJob?.deleted_at} />
              </span>
            )}
        </td>
      </tr>
      {showApplications && (
        <tr>
          <td colSpan={4}>
            {thisJob?.applications?.length > 0 ? (
              <TabularJobApplications
                job={thisJob}
                setApplicationStatus={setApplicationStatus}
                setAppId={setAppId}
                setOpen={setOpen}
                isJobExpired={
                  thisJob?.expired_at &&
                  new Date(thisJob?.expired_at) <
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
          </td>
        </tr>
      )}
    </>
  );
};

export default MyJobApplicantsWidget;