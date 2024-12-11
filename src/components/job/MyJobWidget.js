import { useContext, useState, useEffect } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AgenciesContext } from "../../context/AgenciesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { IoCheckmarkCircle, IoClose, IoLocationOutline, IoSyncOutline, IoLockOpen, IoPencil } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";

import moment from "moment";

const MyJobWidget = (props) => {
    const [job, setJob] = useState(props.job);
    const { showAlert } = useContext(AlertContext);

    const {
        state: { user },
    } = useContext(AuthContext);

    const {
        markFilled,
    } = useContext(JobsContext);

    const {
        deleteJob, getOpenPositions,
    } = useContext(AgenciesContext);

    const handleMarkFilled = (e, job) => {
        if (job?.status == 'filled') {
            showAlert("Job Vacancy Already Closed");
            return;
        }
        (async () => {
            let result = await markFilled(job.id, 'filled');
            if (result && result.status == 'filled') {
                showAlert("Job Marked Closed");
                setJob({ ...job, status: result.status });
            } else {
                showAlert("Oops! Unable to close Job at the moment");
            }
        })();
    };

    const handleMarkApprove = (e, job) => {
        if (job?.status == 'approved') {
            showAlert("Job Already Approved");
            return;
        }
        (async () => {
            let result = await markFilled(job.id, 'approved');
            if (result && result.status == 'approved') {
                showAlert("Job Approved Successfully");
                setJob({ ...job, status: result.status });
            } else {
                showAlert("Oops! Unable to close Job at the moment");
            }
        })();
    };

    return (
        <tr key={job.id}>
            {(user?.role == 'advisor' || user?.role == 'recruiter') && (
                <td className="job-table-status">
                    <b>{job.agency.name}</b>
                </td>
            )}

            <td className="job-table-info">
                <div className="job-table-info-content">
                    <div className="title-wrapper">
                        <h3 className="job-table-info-content-title" style={{ flex: "1" }}>
                            {(job?.advisor_id && job?.advisor_id != user.id) && (
                                <Tooltip title={<div className="advisor-tooltip">This job was posted by an Advisor</div>} placement="top" arrow>
                                    <Link className="link-svg-dark" onClick={(e) => { e.preventDefault(); return false; }}>
                                        <FaHandsHelping style={{ marginRight: '5px' }} />
                                    </Link>
                                </Tooltip>
                            )}
                            <Link className="link link-black hover-gold" to={"/job/" + job.slug}>{job.title}</Link>
                        </h3>
                        {/* {job.priority.is_featured ? (
                            <IoCheckmarkCircle color="#34A853" size={30} />
                        ) : (
                            ""
                        )} */}
                    </div>
                    <div className="job-metas">
                        <div className="job-location location">
                            {(job?.location?.state?.length || job?.location?.city?.length) && (<IoLocationOutline />)}
                            {job.location?.state && (
                                <Link to={`/job-location-state/${job.location.state}`}>
                                    {job.location.state}
                                </Link>
                            )}
                            {(job?.location?.state?.length && job?.location?.city?.length) && (<span>,&nbsp;</span>)}
                            {job.location?.city && (
                                <Link to={`/job-location-city/${job.location.city}`}>
                                    {job.location.city}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </td>

            <td className="job-table-applicants text-theme nowrap">
                <span className="number">{job.applications_count}</span>{" "}
                Applicant(s)
            </td>

            <td>
                <div className="job-table-info-content-date-expiry">
                    <div className="created">
                        <strong>Created: </strong>
                        {moment(job.created_at).format("MMMM D, YYYY")}
                    </div>
                    <div className="expiry-date">
                        <strong>Expiration date: </strong>
                        <span className="text-danger">
                            {moment(job.expired_at).format("MMMM D, YYYY")}
                        </span>
                    </div>
                </div>
            </td>

            <td className="job-table-status nowrap">
                <div className="job-table-actions-inner status">
                    {job.status == 'filled' ? "Closed" : job.status}
                </div>
            </td>

            <td className="job-table-actions nowrap">
                {job?.advisor_id && user?.role != 'advisor' ? (<></>) : (
                    <div className="action-button">
                        {job?.status == 'filled' ? (
                            <Tooltip title="Approve">
                                <Link to="javascript:void(0);" className="btn p-0 border-0 btn-hover-primary" onClick={(e) => handleMarkApprove(e, job)}>
                                    <IoCheckmarkCircle className="icon-rounded" />
                                </Link>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Mark Close">
                                <Link to="javascript:void(0);" className="btn p-0 border-0 btn-hover-primary" onClick={(e) => handleMarkFilled(e, job)}>

                                    <IoLockOpen className="icon-rounded" />
                                </Link>
                            </Tooltip>
                        )}

                        <Tooltip title="Edit">
                            <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                to={"/job/edit/" + job.id}
                            >
                                <IoPencil className="icon-rounded" />
                            </Link>
                        </Tooltip>

                        <Tooltip title="Repost Job">
                            <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                to={`/post-a-job/${job.id}`}
                            >
                                <IoSyncOutline className="icon-rounded" />
                            </Link>
                        </Tooltip>

                        <Tooltip title="Remove">
                            <Link
                                className="btn p-0 border-0 btn-hover-primary"
                                onClick={() => {
                                    deleteJob(job.id, () => {
                                        if (user) getOpenPositions(user.uuid);
                                    });
                                }}
                            >
                                <IoClose className="icon-rounded" />
                            </Link>
                        </Tooltip>
                    </div>
                )}
            </td>
        </tr >
    );
};

export default MyJobWidget;
