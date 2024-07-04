import { useContext, useState, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import TabularSingleJobApplication from "./TablularSingleJobApplication";
import moment from "moment";

const TabularJobApplications = (props) => {

  const MIN_APPLICANTS_ENABLE_FILTER = 5;
  const [applications, setApplications] = useState(null);

  const [filterName, setFilterName] = useState("");

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    setApplications(props?.job?.applications);
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

  const resetFilters = (e) => {
    setFilterName("");
    setApplications(props?.job?.applications);
  };

  return (
    <div className="applicants-wrapper">
      <div className="table-responsive">
        <table className="job-table">
          <thead>
            {props?.job?.applications?.length >= MIN_APPLICANTS_ENABLE_FILTER && (
              <tr>
                <td colSpan={4} className="title" style={{ widtd: "80%" }}>
                  <input className="form-control" type="text" value={filterName} onChange={e => {
                    setFilterName(e.target.value);
                    filterApplications(e.target.value);
                  }} placeholder="Search name..." />
                </td>
                <td className="actions" style={{ widtd: "20%" }}>
                  <input className="btn btn-dark" type="button" value={"Reset"} onClick={e => resetFilters(e)} />
                </td>
              </tr>
            )}
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
