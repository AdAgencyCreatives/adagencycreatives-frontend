import { useContext, useState, useEffect } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SingleJobApplication from "./SingleJobApplication";

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
                    <SingleJobApplication
                        application={application}
                        job={props?.job}
                        setApplicationStatus={props?.setApplicationStatus}
                        setAppId={props?.setAppId}
                        setOpen={props?.setOpen}
                        isJobExpired={props?.isJobExpired}
                        isJobDeleted={props?.isJobDeleted}
                    />
                ))}
            </div>
        </div>
    );
};

export default JobApplications;
