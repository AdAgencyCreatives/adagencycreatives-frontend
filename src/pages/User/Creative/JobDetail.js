import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    IoBookmarkOutline,
    IoBriefcaseOutline,
    IoChatbubbleEllipsesOutline,
    IoEyeOutline,
    IoLocationOutline,
    IoCheckmarkCircle
} from "react-icons/io5";

import "../../../styles/AgencyDashboard/Dashboard.scss";
import Placeholder from "../../../assets/images/placeholder.png";
import { Link } from "react-router-dom";
import TimeAgo from "../../../components/TimeAgo";
import { getJobById } from "../../../context/JobsDataContext";
import { useEffect, useState } from "react";

const JobDetail = ({item}) => {

    const [job, setJob] = useState(null);
    useEffect(() => {
        if (item?.relationships?.job) {
            setJob(item.relationships.job);
        } else {
            (async () => {
                let jobTemp = await getJobById(item?.job_id);
                setJob(jobTemp);
            })();
        }
    }, [item]);
    return (
        <tr key={item.id}>
            <td className="job-table-info">
                {job ? (
                    <div className="job-table-info-content">
                        <div className="d-flex">
                            <div className="avatar employer">
                                <img
                                    src={job?.agency?.logo || Placeholder}
                                    height={100}
                                    width={100}
                                />
                            </div>
                            <div className="ms-3">
                                <div className="title-wrapper">
                                    <h3 className="job-table-info-content-title">
                                        <Link to={"/job/" + job?.slug}>
                                            {job?.title}
                                        </Link>
                                    </h3>
                                    {job?.priority.is_featured ? (
                                        <IoCheckmarkCircle
                                            color="#34A853"
                                            size={30}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="job-metas">
                                    {job?.category && (
                                        <div className="position">
                                            <IoBriefcaseOutline className="me-2" />
                                            <Link
                                                to={"/job-category/" + job?.category}
                                                className="link-gray"
                                            >
                                                {job?.category}
                                            </Link>
                                        </div>
                                    )}
                                    {job?.location && (
                                        <div className="job-location location">
                                            <IoLocationOutline />
                                            <Link to={`/job-location-state/${job?.location.state}`}>{job?.location.state}</Link>
                                            <Link to={`/job-location-city/${job?.location.city}`}>, {job?.location.city}</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (<>
                    {item?.job_title}
                </>)}
            </td>
            <td>
                <div className="job-table-info-content-date-expiry">
                    <div className="created" style={{ textAlign: 'center' }}>
                        <TimeAgo datetime={item?.created_at} />
                    </div>
                </div>
            </td>
            <td className="job-table-status nowrap">
                <div className="job-table-actions-inner pending_payment" style={{ textTransform: 'capitalize' }}>
                    {item.status}
                </div>
            </td>
        </tr>
    );
};

export default JobDetail;
