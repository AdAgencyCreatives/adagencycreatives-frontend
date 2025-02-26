import { useContext, useEffect, useState } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Button, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
  currentPage = 1
}) => {
  const [showApplications, setShowApplications] = useState(false);
  const { showAlert } = useContext(AlertContext);

  const anchor = window.location.hash.slice(1);

  // useEffect(() => {
  //   if (window.location.pathname == "/applicant-jobs" && anchor?.length > 0) {
  //     let parts = anchor.split("&");
  //     let job_slug = parts?.length > 1 ? parts[1].replace("job=", "") : "";
  //     if (job?.slug == job_slug) {
  //       setShowApplications(true);
  //     }
  //   }
  // }, [anchor]);

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.hash.replace("#", ""));

    let job_slug = '';
    if (params.get('job') && params.get('job')?.length > 0) {
      job_slug = params.get('job');
    }

    if (job?.slug == job_slug) {
      setShowApplications(true);
    } else {
      setShowApplications(false);
    }
  }, [anchor]);

  const {
    state: { user },
  } = useContext(AuthContext);

  const handleClose = () => {
    let params = new URLSearchParams(window.location.hash.replace("#", ""));
    params.delete('job');
    navigate(`#${params.toString()}`);
    setShowApplications(false);
  };

  return (
    <>
      <tr key={job.id}>
        {(user?.role == "advisor" || user?.role == "recruiter") && (
          <td style={{ minWidth: "100px" }} className="job-table-status">
            <b>{job.agency.name}</b>
          </td>
        )}

        <td className="job-table-info">
          <div className="job-table-info-content">
            <div className="title-wrapper" style={{ marginBottom: "0px" }}>
              <h3 className="job-table-info-content-title" style={{ flex: "1", display: 'flex' }}>
                {(job?.advisor_id && job?.advisor_id != user.id) && (
                  <Tooltip title={<div className="advisor-tooltip">This job was posted by an Advisor</div>} placement="top" arrow>
                    <Link className="link-svg-dark" onClick={(e) => { e.preventDefault(); return false; }}>
                      <FaHandsHelping style={{ marginRight: '5px' }} />
                    </Link>
                  </Tooltip>
                )}
                <Link
                  className="link link-black hover-gold link-bold"
                  to={"/job/" + job.slug}
                >
                  <u>{job.title}</u>
                </Link>
              </h3>
              {/* {job.priority.is_featured ? (
                <IoCheckmarkCircle color="#34A853" size={30} style={{ minWidth: "30px", minHeight: "30px" }} />
              ) : (
                ""
              )} */}
            </div>
          </div>
        </td>


        <td className="job-table-applicants text-theme nowrap">
          {job?.applications?.length > 0 ? (
            <>
              {/* <span className="number">{job?.applications?.length}</span>{" "}
              Applicant
              {job?.applications?.length > 1 ? "s" : ""} */}
              {/* <br /> */}
              <Button
                className="btn btn-gray btn-sm"
                style={{
                  padding: "0px 6px",
                  margin: "0px",
                  width: "100px",
                }}
                onClick={(e) => setShowApplications((state) => {
                  let params = new URLSearchParams(window.location.hash.replace("#", ""));
                  params.set('job', job?.slug);
                  navigate(`#${params.toString()}`);
                  return !state;
                })}
              >
                {showApplications ? "Hide" : "Show"}&nbsp;
                <span className="number">{job?.applications?.length}</span>
                {/* &nbsp;Applicant{job?.applications?.length > 1 ? "s" : ""} */}
              </Button>
            </>
          ) : (
            <>No Applicants</>
          )}
        </td>

        <td className="job-table-info">
          <div className="job-table-info-content" style={{ minWidth: "100px" }}>
            <div className="job-metas">
              <div className="job-location location" style={{ display: "flex", justifyContent: "start" }}>
                {/* {(job?.location?.state?.length ||
                  job?.location?.city?.length) && <IoLocationOutline />} */}
                {job.location?.state && (
                  <Link
                    className="link link-black hover-gold"
                    to={`/job-location-state/${job.location.state}`}
                  >
                    {job.location.state}
                  </Link>
                )}
                {job?.location?.state?.length &&
                  job?.location?.city?.length && <span>,&nbsp;</span>}
                {job.location?.city && (
                  <Link
                    className="link link-black hover-gold"
                    to={`/job-location-city/${job.location.city}`}
                  >
                    {job.location.city}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </td>

        <td>
          <div className="job-table-info-content-date-expiry">
            <div className="created">
              {moment(job.created_at).format("MMM D, YYYY")}
            </div>
            <div className="expiry-date">
              <span className="text-danger">
                {moment(job.expired_at).format("MMM D, YYYY")}
              </span>
            </div>
          </div>
        </td>

        <td className="job-table-status nowrap">
          {!(
            (job?.expired_at &&
              new Date(job?.expired_at) <=
              Date.parse(new Date().toISOString())) ||
            job?.deleted_at
          ) && (
              <>
                {job.status == "approved" && (
                  <span className="badge bg-primary">Active</span>
                )}
                {job.status == "filled" && (
                  <span className="badge bg-danger">Closed</span>
                )}
              </>
            )}
          {job?.deleted_at &&
            new Date(job?.deleted_at) <
            Date.parse(new Date().toISOString()) ? (
            <div className="job-status-center">
              <span className="badge bg-danger">
                Deleted
              </span><TimeAgo datetime={job?.deleted_at} />
            </div>
          ) : (
            <>
              {job?.expired_at &&
                new Date(job?.expired_at) <=
                Date.parse(new Date().toISOString()) && (
                  <div className="job-status-center">
                    <span className="badge bg-danger">
                      Expired
                    </span><TimeAgo datetime={job?.expired_at} />
                  </div>
                )}
            </>
          )}
        </td>
      </tr>
      <Dialog
        open={showApplications && job?.applications?.length > 0}
        onClose={(e) => handleClose()}
        scroll="body"
        fullWidth={true}
        maxWidth={false}
      >
        <DialogTitle style={{ fontWeight: '700' }}>My Applicants — {job?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div className="agency-page-myjobs tabular dialog">
            <IoCloseCircleSharp size={30} className="close-modal" onClick={(e) => handleClose()} />
            {job?.applications?.length > 0 ? (
              <TabularJobApplications
                job={job}
                setApplicationStatus={setApplicationStatus}
                setAppId={setAppId}
                setOpen={setOpen}
                isJobExpired={
                  job?.expired_at &&
                  new Date(job?.expired_at) <=
                  Date.parse(new Date().toISOString())
                }
                isJobDeleted={
                  job?.deleted_at &&
                  new Date(job?.deleted_at) <
                  Date.parse(new Date().toISOString())
                }
              />
            ) : (
              <p>No New Applicants To Show</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="btn btn-dark" onClick={(e) => handleClose()}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyJobApplicantsWidget;
