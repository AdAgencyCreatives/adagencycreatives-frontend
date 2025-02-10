import "../../../styles/AgencyDashboard/MyJobs.scss";
import { useContext, useEffect, useState } from "react";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";

import { Context as AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/Loader";
import Paginate from "../../../components/Paginate";
import MyJobWidget from "../../../components/job/MyJobWidget";
import SearchBarCommon from "../../../components/SearchBarCommon";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const {
    state: { open_positions, loading, meta },
    searchOpenPositions,
  } = useContext(AgenciesContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const paginate = (page) => {
    setShowLoading(true);

    let params = new URLSearchParams(window.location.hash.replace("#", ""));
    params.set('page', page); // Replace 'key' with your parameter name and 'value' with your parameter value
    navigate(`#${params.toString()}`);

    let search = '';
    if (params.get('search') && params.get('search')?.length > 0) {
      search = params.get('search');
    }

    searchOpenPositions(search, user.uuid, page, null, 0, () => {
      setShowLoading(false);
    });
  };

  useEffect(() => {
    let params = new URLSearchParams(window.location.hash.replace("#", ""));

    let search = '';
    if (params.get('search') && params.get('search')?.length > 0) {
      search = params.get('search');
    }

    setSearchInput(search);

    let page = 1;
    if (params.get('page') && params.get('page')?.length > 0) {
      page = params.get('page');
    }

    if (user) searchOpenPositions(search, user.uuid, page, null, 0, () => {
    });
  }, [user]);

  const handleSearch = (searchText) => {
    setShowLoading(true);

    let params = new URLSearchParams(window.location.hash.replace("#", ""));
    params.set('search', searchText);
    navigate(`#${params.toString()}`);

    let page = 1;
    if (params.get('page') && params.get('page')?.length > 0) {
      page = params.get('page');
    }

    searchOpenPositions(searchText, user.uuid, false, null, 0, () => {
      setShowLoading(false);
    });
  }

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Manage Jobs</h3>
      {(showLoading || (!(open_positions?.length > 0) && loading)) ? (
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
              searchBoxClass="search-box-common search-box-black-gold"
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
                      <MyJobWidget key={job.id} job={job} />
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
