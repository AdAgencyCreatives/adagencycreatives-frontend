import { useContext, useState, useEffect } from "react";
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SingleJobApplication from "./SingleJobApplication";
import TabularSingleJobApplication from "./TablularSingleJobApplication";

const TabularJobApplications = (props) => {
  const [applications, setApplications] = useState(null);
  const [showAllApplications, setShowAllApplications] = useState(true);
  const [limitShowApplications, setLimitShowApplications] = useState(3);

  const { showAlert } = useContext(AlertContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    // const applications = sortApplications(props?.job?.applications);
    const applications = props?.job?.applications;

    if (showAllApplications) {
      setApplications(applications);
    } else {
      setApplications(
        applications?.length < limitShowApplications
          ? applications
          : applications.slice(0, limitShowApplications)
      );
    }
  }, [showAllApplications]);

  useEffect(() => {
    // const applications = sortApplications(props?.job?.applications);
    const applications = props?.job?.applications;

    // setLimitShowApplications(
    //   props?.isJobExpired || props?.isJobDeleted ? 0 : limitShowApplications
    // );
    // setApplications(
    //   props?.isJobExpired || props?.isJobDeleted
    //     ? null
    //     : applications?.length < limitShowApplications
    //     ? applications
    //     : applications.slice(0, limitShowApplications)
    // );

    setApplications(applications);
  }, []);

  const sortApplications = (applications) => {
    const rejected = applications.filter((app) => {
      return app.status === "rejected";
    });
    let others = applications.filter((app) => {
      return app.status !== "rejected";
    });

    applications = others.concat(rejected);

    return applications;
  };

  return (
    <div className="applicants-wrapper">
      <div className="table-responsive">
        <table className="job-table">
          <thead>
            <tr>
              <th className="title">Name</th>
              <th className="title">Industry Title</th>
              <th className="title">Your Title</th>
              <th className="date">Applied Date</th>
              <th className="status">Status</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((application) => (
              <TabularSingleJobApplication
                key={"job-application-" + application.id}
                application={application}
                job={props?.job}
                setApplicationStatus={props?.setApplicationStatus}
                setAppId={props?.setAppId}
                setOpen={props?.setOpen}
                isJobExpired={props?.isJobExpired}
                isJobDeleted={props?.isJobDeleted}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabularJobApplications;
