import Placeholder from "../assets/images/placeholder.png";
import { IoBookmarkOutline, IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useAgencies from "../hooks/useAgencies";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import { useContext, useEffect, useState } from "react";
import Tooltip from "../components/Tooltip";
import AuthModal from "../components/modals/AuthModal";
import DelayedOutput from "../components/DelayedOutput";

const Agencies = () => {
  const { agencies, loading, loadMore, loadedAll, searchAgencies } = useAgencies();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const handleOpen = () => setAuthModalOpen(true);
  const handleClose = () => setAuthModalOpen(false);

  const {
    state: { bookmarks },
    createBookmark,
    getBookmarks,
    removeBookmark,
  } = useContext(DataContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useScrollLoader(loading, loadMore);

  const addToShortlist = (id) => {
    createBookmark(user.uuid, "agencies", id);
  };

  const searchUser = (value) => {
    console.log("searching");
    searchAgencies(value);
  };

  useEffect(() => {
    if (user) getBookmarks(user.uuid, "agencies");
  }, [user]);

  return (
    <div className="dark-container mb-0">
      <div className="container p-md-0 px-5">
        <DelayedOutput>
          <h1 className="community-title text-white text-center mb-4">Agencies</h1>
        </DelayedOutput>
        <SearchBar placeholder="Search by name, or location" onSearch={searchUser} />
        <div className="row g-4">
          {agencies &&
            agencies.map((item, index) => {
              const isShortlisted = bookmarks.find((bookmark) => bookmark?.resource?.user_id == item?.user_id) || false;
              return (
                <div className="col-md-4 col-sm-6 col-12" key={`ag-${index}`}>
                  <div className="sliderContent adagencies-slider">
                    {(role == "admin" || role == "creative") && (
                      <Tooltip title={"Shortlist"} type="featured">
                        <button className={"shortlist-btn" + (isShortlisted ? " active" : "")} onClick={() => (isShortlisted ? removeBookmark(isShortlisted.id) : addToShortlist(item.id))}>
                          <IoBookmarkOutline size={24} />
                        </button>
                      </Tooltip>
                    )}
                    <Link to={`/agency/${item.slug}`} className="employer-logo" reloadDocument>
                      <img
                        src={item.logo || Placeholder}
                        width={150}
                        height={150}
                        alt=""
                        onError={(e) => {
                          e.target.src = Placeholder;
                        }}
                      />
                    </Link>
                    <h3 className="employer-title">
                      <Link to={`/agency/${item.slug}`} className="text-dark" reloadDocument>
                        {item.name}
                      </Link>
                    </h3>
                    {item.location && (
                      <div className="job-location location">
                        {item.location && (item.location.state || item.location.city) ? <IoLocationOutline /> : <></>}
                        <Link to={`/agency-location/${item.location.state}`}>{item.location.state}</Link>
                        {item.location && item.location.state && item.location.city ? <span>,&nbsp;</span> : <></>}
                        <Link to={`/agency-location/${item.location.city}`}>{item.location.city}</Link>
                      </div>
                    )}
                    <div className="open-jobs-btn">
                      <Link to={`/agency/${item.slug}`}>
                        Open Jobs - {item.open_jobs}
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
          <p>There is no result.</p>
        </div>
      ) : (
       <span></span>
      )}
    </div>
  );
};

export default Agencies;
