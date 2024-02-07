import { useContext, useState, useEffect } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import moment from "moment";
import { TfiBackRight, TfiCheck, TfiCheckBox, TfiClose, TfiDownload, TfiLoop, TfiNotepad } from "react-icons/tfi";

const JobApplications = (props) => {
    const [applications, setApplications] = useState(null);
    const [showAllApplications, setShowAllApplications] = useState(false);
    const [limitShowApplications, setLimitShowApplications] = useState(3);

    const { showAlert } = useContext(AlertContext);

    const {
        state: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        if (showAllApplications) {
            setApplications(props?.job?.applications);
        } else {
            setApplications(props?.job?.applications?.length < limitShowApplications ? props?.job?.applications : props?.job?.applications.slice(0, limitShowApplications));
        }
    }, [showAllApplications]);

    useEffect(() => {
        setLimitShowApplications((props?.isJobExpired || props?.isJobDeleted) ? 0 : limitShowApplications)
        setApplications((props?.isJobExpired || props?.isJobDeleted) ? null : (props?.job?.applications?.length < limitShowApplications ? props?.job?.applications : props?.job?.applications.slice(0, limitShowApplications)));
    }, []);


    return (
        <div className="applicants-wrapper">
            <span className="badge job-post-badge job-applications-stats">Showing {applications?.length || 0} of {props?.job?.applications?.length} Applications</span>
            {props?.job?.applications?.length > limitShowApplications && (
                <Link
                    className="btn btn-gold show-more-less"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAllApplications(state => !state);
                        return false;
                    }}
                >{showAllApplications ? ((props?.isJobExpired || props?.isJobDeleted) ? "Hide Applications" : "Show Less") : ((props?.isJobExpired || props?.isJobDeleted) ? "Show Applications" : "Show More")} ...</Link>
            )}
            <div className="applicants-inner">
                {applications?.map((application) => (
                    <article
                        className="applicants-job job-applicant-wrapper job_applicant"
                        key={application.id}
                    >
                        <div className="candidate-list candidate-archive-layout row align-items-center gy-3">
                            <div className="candidate-info col-sm-8">
                                <div className="d-flex align-items-center">
                                    <div className="candidate-info-content">
                                        <div className="title-wrapper d-flex align-items-center">
                                            <h2 className="candidate-title">
                                                <Link to={"/creative/" + application.slug}>
                                                    {application.user}
                                                </Link>
                                            </h2>
                                            {props?.job?.apply_type.toLowerCase() != "external" ? (
                                                <span
                                                    className={
                                                        "badge " +
                                                        application.status +
                                                        " bg-" +
                                                        (application.status == "pending"
                                                            ? "info"
                                                            : application.status == "accepted"
                                                                ? "success"
                                                                : application.status == "shortlisted"
                                                                    ? "primary"
                                                                    : "danger")
                                                    }
                                                >
                                                    {application.status == "pending"
                                                        ? "Pending"
                                                        : application.status == "accepted"
                                                            ? "Approved"
                                                            : application.status == "shortlisted"
                                                                ? "Recommended"
                                                                : "Rejected"
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
                                                Applied date: {moment(application.created_at).format(
                                                    "MMMM D, YYYY"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ali-right col-sm-4">
                                <div className="applicant-action-button action-button">
                                    <Tooltip title="Add Notes">
                                        <button
                                            className="btn p-0 border-0 btn-hover-primary"
                                            onClick={() => {
                                                props?.setAppId(application.creative_id);
                                                props?.setOpen(true);
                                            }}
                                        >
                                            <TfiNotepad />
                                        </button>
                                    </Tooltip>
                                    {(!props?.isJobDeleted && (!props?.job?.advisor_id || user?.role == 'advisor') && props?.job?.apply_type.toLowerCase() != "external") && (<>
                                        {application.status == "pending" ? (
                                            <>
                                                {user?.role == 'advisor' && (
                                                    <Tooltip
                                                        title="Share Recommended Talent"
                                                        onClick={() =>
                                                            props?.setApplicationStatus(
                                                                props?.job.id,
                                                                application.id,
                                                                "shortlisted"
                                                            )
                                                        }
                                                    >
                                                        <button className="btn p-0 border-0 btn-hover-primary">
                                                            <TfiCheckBox className="icon-rounded" />
                                                        </button>
                                                    </Tooltip>
                                                )}
                                                <Tooltip
                                                    title="Interested"
                                                    onClick={() =>
                                                        props?.setApplicationStatus(
                                                            props?.job.id,
                                                            application.id,
                                                            "accepted"
                                                        )
                                                    }
                                                >
                                                    <button className="btn p-0 border-0 btn-hover-primary">
                                                        <TfiCheck className="icon-rounded" />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip
                                                    title="Not Aligned"
                                                    onClick={() =>
                                                        props?.setApplicationStatus(
                                                            props?.job.id,
                                                            application.id,
                                                            "rejected"
                                                        )
                                                    }
                                                >
                                                    <button className="btn p-0 border-0 btn-hover-primary">
                                                        <TfiLoop className="icon-rounded" />
                                                    </button>
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <Tooltip
                                                title="Undo"
                                                onClick={() =>
                                                    props?.setApplicationStatus(
                                                        props?.job.id,
                                                        application.id,
                                                        "pending"
                                                    )
                                                }
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
                                            to={application.resume_url || "#"}
                                        >
                                            <TfiDownload className="icon-rounded" />
                                        </Link>
                                    </Tooltip>
                                    {(!props?.isJobDeleted && (!props?.job?.advisor_id || user?.role == 'advisor') && props?.job?.apply_type.toLowerCase() != "external") && (<>
                                        <Tooltip
                                            title="Remove From Job"
                                            // onClick={() => deleteApplication(application.id)}
                                            onClick={() =>
                                                props?.setApplicationStatus(
                                                    props?.job.id,
                                                    application.id,
                                                    "rejected"
                                                )
                                            }
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
                ))}
            </div>
        </div>
    );
};

export default JobApplications;
