import Placeholder from "../assets/images/placeholder.png";
import { IoBookmarkOutline, IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useAgencies from "../hooks/useAgencies";
import { Context as AlertContext } from "../context/AlertContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import { useContext, useEffect, useState } from "react";
import Tooltip from "../components/Tooltip";
import AuthModal from "../components/modals/AuthModal";
import DelayedOutput from "../components/DelayedOutput";
import { useParams } from "react-router-dom";
import useHelper from "../hooks/useHelper";
import AgencyImageLoader from "../components/AgencyImageLoader";

const AgencySearch = () => {

  const { field, search } = useParams();
  const { encodeSpecial, decodeSpecial } = useHelper();

  const { agencies, loading, loadMore, loadedAll, searchAgencies, agencySearch2 } = useAgencies("agency-search");

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const handleOpen = () => setAuthModalOpen(true);
  const handleClose = () => setAuthModalOpen(false);

  const {
    state: { bookmarks },
    createBookmark,
    getAllBookmarks,
    removeBookmark,
  } = useContext(DataContext);

  const {
    showAlert,
  } = useContext(AlertContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useScrollLoader(loading, loadMore);

  const addToShortlist = (id) => {
    createBookmark(user.uuid, "agencies", id, () => {
      showAlert("Agency added to shortlist");
    });
  };

  const removeFromShortlist = (id) => {
    removeBookmark(id, () => {
      showAlert("Agency deleted from shortlist");
    });
  };

  const searchUser = async (value) => {
    console.log("searching");
    await searchAgencies(value);
    if (user) await getAllBookmarks(user.uuid, "agencies");
  };

  useEffect(() => {
    if (user) getAllBookmarks(user.uuid, "agencies");
  }, [user]);

  useEffect(() => {
    if (field && search) {
      agencySearch2(field, search);
    }
  }, [field, search]);

  return (
    <div className="agencies-page dark-container mb-0">
      <div className="container p-md-0 px-5">
        <DelayedOutput>
          <h1 className="community-title text-white text-center mb-4">{search} Agencies</h1>
        </DelayedOutput>
        {/* <SearchBar placeholder="Search by name, or location" onSearch={searchUser} /> */}
        <div className="row g-4">
          {agencies &&
            agencies.map((item, index) => {
              const isShortlisted = bookmarks.find((bookmark) => bookmark?.resource?.user_id == item?.user_id) || false;
              return (
                <div className="col-md-4 col-sm-6 col-12" key={`ag-${index}`}>
                  <div className="sliderContent adagencies-slider">
                    {(role == "admin" || role == "creative") && (
                      <Tooltip title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"} type="featured">
                        <button className={"shortlist-btn" + (isShortlisted ? " active" : "")} onClick={() => (isShortlisted ? removeFromShortlist(isShortlisted.id) : addToShortlist(item.id))}>
                          <IoBookmarkOutline />
                        </button>
                      </Tooltip>
                    )}
                    <Link to={`/agency/${item.slug}`} className="employer-logo" reloadDocument>
                      <AgencyImageLoader agency={item} height={90} width={90} />
                    </Link>
                    <h3 className="employer-title">
                      <Link to={`/agency/${item.slug}`} className="text-dark" reloadDocument>
                        {item.name}
                      </Link>
                    </h3>
                    {item.location && (
                      <div className="job-location location">
                        {(item?.location?.state?.length || item?.location?.city?.length) && (<IoLocationOutline />)}
                        <Link to={`/agencies/location/state/${item.location.state}`}>{item.location.state}</Link>
                        {(item?.location?.state?.length && item?.location?.city?.length) && (<span>,&nbsp;</span>)}
                        <Link to={`/agencies/location/city/${item.location.city}`}>{item.location.city}</Link>
                      </div>
                    )}
                    <div className="open-jobs-btn">
                      <Link to={`/agency/${item.slug}`}>
                        Open Jobs {item.open_jobs > 0 ? `- ${item.open_jobs}` : ''}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="load-more text-center">
            {loading && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          {loadedAll && (
            <>
              <button className="btn btn-theme btn-hover-primary text-uppercase w-auto mx-auto" onClick={() => setAuthModalOpen(true)}>
                Your Agency
              </button>
              <AuthModal open={authModalOpen} handleClose={handleClose} form="register" registerTab="agency" />
            </>
          )}
        </div>
      </div>
      {agencies && agencies.length === 0 ? (
        <div className="no_result">
          <p>Please try again. No exact results found.</p>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default AgencySearch;
