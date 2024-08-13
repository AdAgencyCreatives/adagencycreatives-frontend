import "../../../styles/AgencyDashboard/MyJobs.scss";
import { useContext, useEffect, useState } from "react";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";

import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as JobsContext } from "../../../context/JobsContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import MyJobWidget from "../../../components/job/MyJobWidget";
import SearchBarCommon from "../../../components/SearchBarCommon";

const MyJobs = () => {

  const [searchInput, setSearchInput] = useState("");
  const { showAlert } = useContext(AlertContext)

  const {
    state: { open_positions, loading, meta },
    searchOpenPositions,
  } = useContext(AgenciesContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const paginate = (page) => {
    searchOpenPositions(searchInput, user.uuid, page);
  };

  useEffect(() => {
    if (user) searchOpenPositions(searchInput, user.uuid);
  }, [user]);

  const handleSearch = (searchText) => {
    searchOpenPositions(searchText, user.uuid);
  }

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Manage Jobs</h3>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="card">
            <h6>Search My Jobs</h6>
            <SearchBarCommon
              input={searchInput}
              setInput={setSearchInput}
              onSearch={handleSearch}
              placeholder={"Search My Jobs"}
              searchBoxClass="search-box-common"
            />
            {open_positions?.length > 0 ? (<>
              {open_positions && meta?.total > 9 ? <Paginate meta={meta} paginate={paginate} title={"jobs"} /> : <br />}
              <div className="table-responsive">
                <table className="job-table">
                  <thead>
                    <tr>
                      {(user?.role == 'advisor' || user?.role == 'recruiter') && (
                        <th className="title">Agency</th>
                      )}
                      <th className="title">Title</th>
                      <th className="applicants">Applicants</th>
                      <th className="date">Created &amp; Expired</th>
                      <th className="status">Status</th>
                      <th className="actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {open_positions.map((job) => (
                      <MyJobWidget job={job} />
                    ))}
                  </tbody>
                </table>
              </div>
              {open_positions && meta?.total > 9 && <Paginate meta={meta} paginate={paginate} title={"jobs"} />}
            </>) : (<>
              <div className="no_result">
                <p>Please try again. No exact results found.</p>
              </div>
            </>)}
          </div>
        </>
      )}
    </div>
  );
};

export default MyJobs;
