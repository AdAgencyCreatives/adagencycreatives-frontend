import { useContext, useState, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
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

  useEffect(() => {
    sortApplications(props?.job?.applications);
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
    sortedApplications = sortedApplications.concat(applicationsToSort.filter((application) => application.status == "hired"));
    sortedApplications = sortedApplications.concat(applicationsToSort.filter((application) => application.status == "pending"));
    sortedApplications = sortedApplications.concat(applicationsToSort.filter((application) => application.status == "accepted"));
    sortedApplications = sortedApplications.concat(applicationsToSort.filter((application) => application.status == "recommended"));
    sortedApplications = sortedApplications.concat(applicationsToSort.filter((application) => application.status == "shortlisted"));
    sortedApplications = sortedApplications.concat(applicationsToSort.filter((application) => application.status == "rejected"));
    setApplications(sortedApplications);
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
