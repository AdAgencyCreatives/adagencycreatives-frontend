import { useContext, useState, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as JobsContext } from "../../context/JobsContext";
import TabularSingleJobApplication from "./TablularSingleJobApplication";
import moment from "moment";
import SearchBarCommon from "../../components/SearchBarCommon";

const TabularJobApplications = (props) => {

  const MIN_APPLICANTS_ENABLE_FILTER = 5;
  const [searchInput, setSearchInput] = useState("");
  const [applications, setApplications] = useState(null);

  const [filterName, setFilterName] = useState("");

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    application_remove_from_recent,
  } = useContext(JobsContext);

  useEffect(() => {
    sortApplications(props?.job?.applications);

    if (props?.job?.applications?.length > 0) {
      for (let index = 0; index < props.job.applications.length; index++) {
        const element = props.job.applications[index];
        application_remove_from_recent(element.id, user.uuid);
      }
    }
  }, []);

  const filterApplications = (searchName) => {
    let filteredApplications = props?.job?.applications?.length > 0 ? props?.job?.applications.filter((app) => {
      let result = true;
      if (searchName?.length > 0) {
        result = result & app?.user?.toLowerCase().indexOf(searchName.toLowerCase()) >= 0;
      }
      return result;
    }) : [];
    setApplications(filteredApplications);
  };

  const handleSearch = (searchText) => {
    filterApplications(searchText);
  };

  const handleSetApplicationStatus = (job_id, application_id, application_status, cb = () => { }) => {
    props?.setApplicationStatus && props?.setApplicationStatus(job_id, application_id, application_status, () => {
      cb();
      var updatedApplications = applications.map((application) => {
        if (application_id == application.id) {
          return { ...application, 'status': application_status };
        }
        return application;
      });

      sortApplications(updatedApplications);
    });
  };

  const sortApplications = (applicationsToSort) => {
    var sortedApplications = [];
    var status_filters = ["hired", "pending", "accepted", "recommended", "shortlisted", "rejected"];
    for (let index = 0; index < status_filters.length; index++) {
      const status = status_filters[index];
      const filtered_applications = applicationsToSort.filter((application) => application.status == status);
      const applications_sorted_by_name = sortByDateThenByName(filtered_applications);
      sortedApplications = sortedApplications.concat(applications_sorted_by_name);
    }
    setApplications(sortedApplications);
  };

  const sortByDateThenByName = (applicationsToSort) => {
    return applicationsToSort.sort((a, b) => {
      const dateA = moment(a.created_at).startOf('day');
      const dateB = moment(b.created_at).startOf('day');
      const dateComparison = dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      if (dateComparison === 0) {
        return a.user_last_name.localeCompare(b.user_last_name);
      }
      return dateComparison;
    });
  };

  return (
    <div className="applicants-wrapper">
      {props?.job?.applications?.length >= MIN_APPLICANTS_ENABLE_FILTER && (
        <>
          <h6>Search My Applicants</h6>
          <SearchBarCommon
            input={searchInput}
            setInput={setSearchInput}
            onSearch={handleSearch}
            placeholder={"Search My Applicants"}
            searchBoxClass="search-box-common"
          />
          <br />
        </>
      )}
      {applications?.length > 0 ? (
        <div className="table-responsive">
          <table className="job-table">
            <thead>
              <tr>
                <th className="title" style={{ width: "28%" }}>
                  Name
                </th>
                <th className="title" style={{ width: "27%" }}>
                  Title
                </th>
                <th className="date" style={{ width: "12%" }}>
                  Applied Date
                </th>
                <th className="status" style={{ width: "13%" }}>
                  Status
                </th>
                <th className="actions" style={{ width: "20%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((application) => (
                <TabularSingleJobApplication
                  key={"job-application-" + application.id}
                  application={application}
                  job={props?.job}
                  setApplicationStatus={handleSetApplicationStatus}
                  setAppId={props?.setAppId}
                  setOpen={props?.setOpen}
                  isJobExpired={props?.isJobExpired}
                  isJobDeleted={props?.isJobDeleted}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="no_result">
            <p>Please try again. No exact results found.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TabularJobApplications;
