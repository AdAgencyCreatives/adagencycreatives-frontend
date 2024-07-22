import { useContext, useState, useEffect } from "react";
import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import moment from "moment";
import {
  TfiBackRight,
  TfiCheck,
  TfiCheckBox,
  TfiClose,
  TfiDownload,
  TfiLoop,
  TfiNotepad,
  TfiPin2,
  TfiMedall
} from "react-icons/tfi";
import { CircularProgress } from "@mui/material";

const TabularSingleJobApplication = (props) => {
  const [thisApplication, setThisApplication] = useState(props?.application);

  const [changingApplicationStatus, setChangingApplicationStatus] =
    useState(false);

  const {
    state: { user },
  } = useContext(AuthContext);

  const hideChangingApplicationStatus = () => {
    setChangingApplicationStatus(false);
  };

  useEffect(() => {
    setThisApplication(props?.application);
  }, [props?.application]);

  const setThisApplicationStatus = (
    job_id,
    application_id,
    application_status,
    cb = () => { }
  ) => {
    props?.setApplicationStatus(
      job_id,
      application_id,
      application_status,
      () => {
        let updatedApplication = { ...thisApplication };
        updatedApplication.status = application_status;
        setThisApplication(updatedApplication);
        cb();
      }
    );
  };

  return (
    <>
      <tr>
        <td style={{ width: "28%" }}>
          <Link
            className="link link-black hover-gold link-bold"
            to={"/creative/" + thisApplication.slug}
          >
            {thisApplication.user}
          </Link>
        </td>
        <td style={{ width: "27%" }}>
          {thisApplication?.creative_category || "--"}
        </td>
        <td style={{ width: "12%" }}>
          <div className="job-table-info-content-date-expiry">
            <div className="created">
              {moment(thisApplication.created_at).format("MMMM D, YYYY")}
            </div>
          </div>
        </td>
        <td style={{ width: "13%" }}>
          {props?.job?.apply_type.toLowerCase() != "external" ? (
            <span
              className={
                "badge " +
                thisApplication.status +
                " bg-" +
                (thisApplication.status == "pending"
                  ? "info"
                  : thisApplication.status == "accepted"
                    ? "success"
                    : thisApplication.status == "recommended"
                      ? "primary"
                      : "danger")
              }
            >
              {thisApplication.status == "pending"
                ? "Pending"
                : thisApplication.status == "accepted"
                  ? "Approved"
                  : thisApplication.status == "recommended"
                    ? "Recommended"
                    : "Not Aligned"}
            </span>
          ) : (
            <span className="badge bg-success">Interested</span>
          )}
        </td>
        <td style={{ width: "20%" }} className="job-table-actions nowrap">
          <div className="action-button">
            {changingApplicationStatus && (
              <CircularProgress style={{ width: "30px", height: "30px" }} />
            )}
            <Tooltip title="Add Notes">
              <button
                className="btn p-0 border-0 btn-hover-primary"
                onClick={() => {
                  props?.setAppId(thisApplication.id);
                  props?.setOpen(true);
                }}
              >
                <TfiNotepad />
              </button>
            </Tooltip>
            {!props?.isJobDeleted &&
              !props?.isJobExpired &&
              (!props?.job?.advisor_id || user?.role == "advisor") &&
              props?.job?.apply_type.toLowerCase() != "external" && (
                <>
                  {thisApplication.status == "pending" ? (
                    <>
                      {user?.role == "advisor" && (
                        <Tooltip
                          title="Share Recommended Talent"
                          onClick={() => {
                            setChangingApplicationStatus(true);
                            setThisApplicationStatus(
                              props?.job.id,
                              thisApplication.id,
                              "recommended",
                              hideChangingApplicationStatus
                            );
                          }}
                        >
                          <button className="btn p-0 border-0 btn-hover-primary">
                            <TfiCheckBox className="icon-rounded" />
                          </button>
                        </Tooltip>
                      )}
                      <Tooltip
                        title="Interested"
                        onClick={() => {
                          setChangingApplicationStatus(true);
                          setThisApplicationStatus(
                            props?.job.id,
                            thisApplication.id,
                            "accepted",
                            hideChangingApplicationStatus
                          );
                        }}
                      >
                        <button className="btn p-0 border-0 btn-hover-primary">
                          <TfiCheck className="icon-rounded" />
                        </button>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip
                      title="Undo"
                      onClick={() => {
                        setChangingApplicationStatus(true);
                        setThisApplicationStatus(
                          props?.job.id,
                          thisApplication.id,
                          "pending",
                          hideChangingApplicationStatus
                        );
                      }}
                    >
                      <button className="btn p-0 border-0 btn-hover-primary">
                        <TfiBackRight
                          className="icon-rounded"
                          style={{ transform: "rotateY(180deg)" }}
                        />
                      </button>
                    </Tooltip>
                  )}
                </>
              )}
            <Tooltip title="Download CV">
              <Link
                className="btn p-0 border-0 btn-hover-primary"
                to={
                  thisApplication?.resume_url?.length > 0
                    ? thisApplication.resume_url
                    : "javascript:void(0)"
                }
              >
                <TfiDownload className="icon-rounded" />
              </Link>
            </Tooltip>
            {thisApplication.status == "pending" &&
              !props?.isJobDeleted &&
              !props?.isJobExpired &&
              (!props?.job?.advisor_id || user?.role == "advisor") &&
              props?.job?.apply_type.toLowerCase() != "external" && (
                <>
                  <Tooltip
                    title="Shortlist"
                    onClick={() => {
                      setChangingApplicationStatus(true);
                      setThisApplicationStatus(
                        props?.job.id,
                        thisApplication.id,
                        "shortlisted",
                        hideChangingApplicationStatus
                      );
                    }}
                  >
                    <button className="btn p-0 border-0 btn-hover-primary">
                      <TfiPin2 className="icon-rounded" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Hired"
                    onClick={() => {
                      setChangingApplicationStatus(true);
                      setThisApplicationStatus(
                        props?.job.id,
                        thisApplication.id,
                        "hired",
                        hideChangingApplicationStatus
                      );
                    }}
                  >
                    <button className="btn p-0 border-0 btn-hover-primary">
                      <TfiMedall className="icon-rounded" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Not Aligned"
                    onClick={() => {
                      setChangingApplicationStatus(true);
                      setThisApplicationStatus(
                        props?.job.id,
                        thisApplication.id,
                        "rejected",
                        hideChangingApplicationStatus
                      );
                    }}
                  >
                    <button className="btn p-0 border-0 btn-hover-primary">
                      <TfiClose className="icon-rounded" />
                    </button>
                  </Tooltip>
                </>
              )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default TabularSingleJobApplication;
