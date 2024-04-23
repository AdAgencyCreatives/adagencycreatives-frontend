import { useContext, useState, useEffect } from "react";
import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import moment from "moment";
import { TfiBackRight, TfiCheck, TfiCheckBox, TfiClose, TfiDownload, TfiLoop, TfiNotepad } from "react-icons/tfi";
import { CircularProgress } from "@mui/material";

const SingleJobApplication = (props) => {

    const [thisApplication, setThisApplication] = useState(props?.application);

    const [changingApplicationStatus, setChangingApplicationStatus] = useState(false);

    const {
        state: { user },
    } = useContext(AuthContext);

    const hideChangingApplicationStatus = () => {
        setChangingApplicationStatus(false);
    };

    useEffect(() => {
        setThisApplication(props?.application);
    }, [props?.application]);

    const setThisApplicationStatus = (job_id, application_id, application_status, cb = () => { }) => {
        props?.setApplicationStatus(job_id, application_id, application_status, () => {
            let updatedApplication = { ...thisApplication };
            updatedApplication.status = application_status;
            setThisApplication(updatedApplication);
            cb();
        });
    };

    return (
        <article className="applicants-job job-applicant-wrapper job_applicant"
            key={thisApplication.id}
        >
            <div className="candidate-list candidate-archive-layout row align-items-center gy-3">
                <div className="candidate-info col-sm-8">
                    <div className="d-flex align-items-center">
                        <div className="candidate-info-content">
                            <div className="title-wrapper d-flex align-items-center">
                                <h2 className="candidate-title">
                                    <Link to={"/creative/" + thisApplication.slug}>
                                        {thisApplication.user}
                                    </Link>
                                </h2>
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
                                                    : thisApplication.status == "shortlisted"
                                                        ? "primary"
                                                        : "danger")
                                        }
                                    >
                                        {thisApplication.status == "pending"
                                            ? "Pending"
                                            : thisApplication.status == "accepted"
                                                ? "Approved"
                                                : thisApplication.status == "shortlisted"
                                                    ? "Recommended"
                                                    : "Not Aligned"
                                        }
                                    </span>
                                ) : (
                                    <span className="badge bg-success">Interested</span>
                                )}
                            </div>
                            <div className="job-metas">
                                <h4 className="job-title">
                                    <Link
                                        to={"/job/" + props?.job.slug}
                                        className="text-theme"
                                    >
                                        {props?.job.agency.name} - {props?.job.title}
                                    </Link>
                                </h4>
                                <div className="date">
                                    <IoTimeOutline />
                                    Applied date: {moment(thisApplication.created_at).format(
                                        "MMMM D, YYYY"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ali-right col-sm-4">
                    <div className="applicant-action-button action-button">
                        {changingApplicationStatus && (<CircularProgress style={{ width: '30px', height: '30px' }} />)}
                        <Tooltip title="Add Notes">
                            <button
                                className="btn p-0 border-0 btn-hover-primary"
                                onClick={() => {
                                    props?.setAppId(thisApplication.creative_id);
                                    props?.setOpen(true);
                                }}
                            >
                                <TfiNotepad />
                            </button>
                        </Tooltip>
                        {((!props?.isJobDeleted && !props?.isJobExpired) && (!props?.job?.advisor_id || user?.role == 'advisor') && props?.job?.apply_type.toLowerCase() != "external") && (<>
                            {thisApplication.status == "pending" ? (
                                <>
                                    {user?.role == 'advisor' && (
                                        <Tooltip
                                            title="Share Recommended Talent"
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
                        </>)}
                        <Tooltip title="Download CV">
                            <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                to={thisApplication?.resume_url?.length > 0 ? (thisApplication.resume_url) : "javascript:void(0)"}
                            >
                                <TfiDownload className="icon-rounded" />
                            </Link>
                        </Tooltip>
                        {thisApplication.status == 'pending' && ((!props?.isJobDeleted && !props?.isJobExpired) && (!props?.job?.advisor_id || user?.role == 'advisor') && props?.job?.apply_type.toLowerCase() != "external") && (<>
                            <Tooltip
                                title="Not Aligned"
                                // onClick={() => deleteApplication(thisApplication.id)}
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
                        </>)}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SingleJobApplication;
