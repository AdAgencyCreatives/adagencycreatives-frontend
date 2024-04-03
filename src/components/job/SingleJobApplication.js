import { useContext, useState, useEffect } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import moment from "moment";
import { TfiBackRight, TfiCheck, TfiCheckBox, TfiClose, TfiDownload, TfiLoop, TfiNotepad } from "react-icons/tfi";
import { CircularProgress } from "@mui/material";

const SingleJobApplication = (props) => {

    const [changingApplicationStatus, setChangingApplicationStatus] = useState(false);

    const {
        state: { user },
    } = useContext(AuthContext);

    const hideChangingApplicationStatus = () => {
        setChangingApplicationStatus(false);
    };

    return (
        <article className="applicants-job job-applicant-wrapper job_applicant"
            key={props?.application.id}
        >
            <div className="candidate-list candidate-archive-layout row align-items-center gy-3">
                <div className="candidate-info col-sm-8">
                    <div className="d-flex align-items-center">
                        <div className="candidate-info-content">
                            <div className="title-wrapper d-flex align-items-center">
                                <h2 className="candidate-title">
                                    <Link to={"/creative/" + props?.application.slug}>
                                        {props?.application.user}
                                    </Link>
                                </h2>
                                {props?.job?.apply_type.toLowerCase() != "external" ? (
                                    <span
                                        className={
                                            "badge " +
                                            props?.application.status +
                                            " bg-" +
                                            (props?.application.status == "pending"
                                                ? "info"
                                                : props?.application.status == "accepted"
                                                    ? "success"
                                                    : props?.application.status == "shortlisted"
                                                        ? "primary"
                                                        : "danger")
                                        }
                                    >
                                        {props?.application.status == "pending"
                                            ? "Pending"
                                            : props?.application.status == "accepted"
                                                ? "Approved"
                                                : props?.application.status == "shortlisted"
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
                                    Applied date: {moment(props?.application.created_at).format(
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
                                    props?.setAppId(props?.application.creative_id);
                                    props?.setOpen(true);
                                }}
                            >
                                <TfiNotepad />
                            </button>
                        </Tooltip>
                        {((!props?.isJobDeleted && !props?.isJobExpired) && (!props?.job?.advisor_id || user?.role == 'advisor') && props?.job?.apply_type.toLowerCase() != "external") && (<>
                            {props?.application.status == "pending" ? (
                                <>
                                    {user?.role == 'advisor' && (
                                        <Tooltip
                                            title="Share Recommended Talent"
                                            onClick={() => {
                                                setChangingApplicationStatus(true);
                                                props?.setApplicationStatus(
                                                    props?.job.id,
                                                    props?.application.id,
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
                                            props?.setApplicationStatus(
                                                props?.job.id,
                                                props?.application.id,
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
                                        props?.setApplicationStatus(
                                            props?.job.id,
                                            props?.application.id,
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
                                to={props?.application.resume_url || "#"}
                            >
                                <TfiDownload className="icon-rounded" />
                            </Link>
                        </Tooltip>
                        {props?.application.status == 'pending' && ((!props?.isJobDeleted && !props?.isJobExpired) && (!props?.job?.advisor_id || user?.role == 'advisor') && props?.job?.apply_type.toLowerCase() != "external") && (<>
                            <Tooltip
                                title="Not Aligned"
                                // onClick={() => deleteApplication(props?.application.id)}
                                onClick={() => {
                                    setChangingApplicationStatus(true);
                                    props?.setApplicationStatus(
                                        props?.job.id,
                                        props?.application.id,
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
