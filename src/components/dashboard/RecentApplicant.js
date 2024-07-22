import { Tooltip, CircularProgress } from "@mui/material";
import { IoCloseCircleSharp, IoTimeOutline } from "react-icons/io5";
import {
    TfiDownload,
    TfiNotepad,
    TfiClose,
    TfiCheck,
    TfiCheckBox,
    TfiBackRight,
} from "react-icons/tfi";
import { Link } from "react-router-dom";
import moment from "moment";
import { useState, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import TimeAgo from "../TimeAgo";
import useApplicationStatusHelper from "../../hooks/useApplicationStatusHelper";

const RecentApplicant = ({ job, application, setApplicationStatus, onRemoveFromRecent, setAppId, setOpen, isJobDeleted, isJobExpired }) => {

    const [thisApplication, setThisApplication] = useState(application);
    const [changingApplicationStatus, setChangingApplicationStatus] =
        useState(false);

    const { getStatusName, getStatusBadge } = useApplicationStatusHelper();

    const {
        state: { user },
    } = useContext(AuthContext);

    const hideChangingApplicationStatus = () => {
        setChangingApplicationStatus(false);
    };

    const setThisApplicationStatus = (
        job_id,
        application_id,
        application_status,
        cb = () => { }
    ) => {
        setApplicationStatus(
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
            <div className="applicant-item" key={application.id}>
                <div className="remove-recent">
                    <Tooltip title="Remove from Recent">
                        <Link to={"javascript:void(0)"} onClick={(e) => onRemoveFromRecent(e, application)}>
                            <IoCloseCircleSharp className="icon" />
                        </Link>
                    </Tooltip>
                </div>
                <div className="candidate-list candidate-archive-layout d-flex align-items-center">
                    <div className="candidate-info col-sm-8">
                        <p className="mb-0">{job.location && (job.location.city + ", " + job.location.state)}</p>
                        <div className="d-flex align-items-center">
                            <div className="candidate-info-content">
                                <div className="title-wrapper d-flex align-items-center">
                                    <h2 className="candidate-title">
                                        <Link to={"/creative/" + application.slug}>
                                            {application.user}
                                        </Link>
                                    </h2>
                                    {job?.apply_type.toLowerCase() != "external" ? (
                                        <span className={"badge " + getStatusBadge(thisApplication.status)} >
                                            {getStatusName(thisApplication?.status)}
                                        </span>
                                    ) : (
                                        <span className="badge bg-success">Interested</span>
                                    )}
                                </div>
                                <div className="job-metas">
                                    <Link
                                        to={"/job/" + job.slug}
                                        className="link link-black hover-gold"
                                    >
                                        {job.title}
                                    </Link>
                                    <div className="title-wrapper d-flex align-items-center job-status">
                                        Job Status:&nbsp;
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
                                                        <span className="badge bg-success">Filled</span>
                                                    )}
                                                </>
                                            )}
                                        {job?.deleted_at &&
                                            new Date(job?.deleted_at) <
                                            Date.parse(new Date().toISOString()) ? (
                                            <span className="badge bg-danger">
                                                Deleted:&nbsp;<TimeAgo datetime={job?.deleted_at} />
                                            </span>
                                        ) : (
                                            <>
                                                {job?.expired_at &&
                                                    new Date(job?.expired_at) <=
                                                    Date.parse(new Date().toISOString()) && (
                                                        <span className="badge bg-danger">
                                                            Expired:&nbsp;<TimeAgo datetime={job?.expired_at} />
                                                        </span>
                                                    )}
                                            </>
                                        )}
                                    </div>
                                    <div className="date">
                                        <IoTimeOutline />
                                        Applied date:{" "}
                                        {moment(application.created_at).format(
                                            "MMMM D, YYYY"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ali-right col-sm-4">
                        <div className="applicant-action-button action-button">
                            {changingApplicationStatus && (
                                <CircularProgress style={{ width: "30px", height: "30px" }} />
                            )}
                            <Tooltip title="Add Notes">
                                <button
                                    className="btn p-0 border-0 btn-hover-primary"
                                    onClick={() => {
                                        setAppId(thisApplication.id);
                                        setOpen(true);
                                    }}
                                >
                                    <TfiNotepad />
                                </button>
                            </Tooltip>
                            {!isJobDeleted &&
                                !isJobExpired &&
                                (!job?.advisor_id || user?.role == "advisor") &&
                                job?.apply_type.toLowerCase() != "external" && (
                                    <>
                                        {thisApplication.status == "pending" ? (
                                            <>
                                                {user?.role == "advisor" && (
                                                    <Tooltip
                                                        title="Share Recommended Talent"
                                                        onClick={() => {
                                                            setChangingApplicationStatus(true);
                                                            setThisApplicationStatus(
                                                                job.id,
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
                                                            job.id,
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
                                                        job.id,
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
                                !isJobDeleted &&
                                !isJobExpired &&
                                (!job?.advisor_id || user?.role == "advisor") &&
                                job?.apply_type.toLowerCase() != "external" && (
                                    <>
                                        <Tooltip
                                            title="Not Aligned"
                                            // onClick={() => deleteApplication(thisApplication.id)}
                                            onClick={() => {
                                                setChangingApplicationStatus(true);
                                                setThisApplicationStatus(
                                                    job.id,
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecentApplicant;
