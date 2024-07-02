import { useContext, useState, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import TabularSingleJobApplication from "./TablularSingleJobApplication";
import moment from "moment";

const TabularJobApplications = (props) => {

  const MIN_APPLICANTS_ENABLE_FILTER = 0;
  const [applications, setApplications] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAppliedDate, setFilterAppliedDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    setApplications(props?.job?.applications);
  }, []);

  const getStatus = (rawStatus) => {
    return rawStatus?.length > 0
      ? rawStatus == "pending"
        ? "Pending"
        : rawStatus == "accepted"
          ? "Approved"
          : rawStatus == "shortlisted"
            ? "Recommended"
            : "Not Aligned"
      : "";
  };

  const filterApplications = (e) => {
    let filteredApplications = props?.job?.applications?.length > 0 ? props?.job?.applications.filter((app) => {
      let result = true;
      if (filterName?.length > 0) {
        result = result & app?.user?.toLowerCase().indexOf(filterName.toLowerCase()) >= 0;
      }
      if (filterTitle?.length > 0) {
        result = result & app?.creative_category?.toLowerCase().indexOf(filterTitle.toLowerCase()) >= 0;
      }
      if (filterAppliedDate?.length > 0) {
        result = result & moment(app?.created_at).format("MMMM D, YYYY")?.toLowerCase().indexOf(filterAppliedDate.toLowerCase()) >= 0;
      }
      if (filterStatus?.length > 0) {
        result = result & getStatus(app?.status)?.toLowerCase().indexOf(filterStatus.toLowerCase()) >= 0;
      }

      return result;
    }) : [];
    setApplications(filteredApplications);
  };

  const resetFilters = (e) => {
    setFilterName("");
    setFilterTitle("");
    setFilterAppliedDate("");
    setFilterStatus("");
    setApplications(props?.job?.applications);
  };

  const handleFilterKeyUp = (e) => {
    if (e.key == 'Enter' || e.which == 13) {
      filterApplications(e);
    }
  };

  return (
    <div className="applicants-wrapper">
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
            {props?.job?.applications?.length > MIN_APPLICANTS_ENABLE_FILTER && (
              <tr>
                <td colSpan={2} className="title" style={{ widtd: "55%" }}>
                  <input className="form-control" type="text" value={filterName} onChange={e => setFilterName(e.target.value)} placeholder="Filter Name" onKeyUp={e => handleFilterKeyUp(e)} />
                </td>
                {/* <td className="title" style={{ widtd: "27%" }}>
                  <input className="form-control" type="text" value={filterTitle} onChange={e => setFilterTitle(e.target.value)} />
                </td>
                <td className="date" style={{ widtd: "12%" }}>
                  <input className="form-control" type="text" value={filterAppliedDate} onChange={e => setFilterAppliedDate(e.target.value)} />
                </td> */}
                <td colSpan={2} className="status" style={{ widtd: "25%" }}>
                  <input className="form-control" type="text" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} placeholder="Filter Status" onKeyUp={e => handleFilterKeyUp(e)} />
                </td>
                <td className="actions" style={{ widtd: "20%" }}>
                  <input className="btn btn-dark" type="button" value={"Filter"} onClick={e => filterApplications(e)} />
                  &nbsp;
                  <input className="btn btn-dark" type="button" value={"Reset"} onClick={e => resetFilters(e)} />
                </td>
              </tr>
            )}
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
