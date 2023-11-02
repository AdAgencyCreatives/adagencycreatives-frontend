import Placeholder from "../assets/images/placeholder.png";
import { IoBookmarkOutline, IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as DataContext } from "../context/DataContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import Tooltip from "../components/Tooltip";

const Creatives = () => {
  const { creatives, loading, loadMore, searchCreatives } = useCreatives();
  const {
    state: { bookmarks },
    createBookmark,
    getBookmarks,
    removeBookmark,
  } = useContext(DataContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  const addToShortlist = (id) => {
    createBookmark(user.uuid, "creatives", id);
  };

  useScrollLoader(loading, loadMore);

  const searchUser = (value) => {
    console.log("searching");
    searchCreatives(value);
  };

  useEffect(() => {
    if (user) getBookmarks(user.uuid);
  }, [user]);

  return (
    <div className="dark-container">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">
          Creatives
        </h1>
        <SearchBar 
        placeholder="Search by name, title, location, company, industry experience, media, full-time etc." 
        onSearch={searchUser} 
        />
        <div className="row g-4">
          {creatives &&
            creatives.map((item, index) => {
              const isShortlisted =
                bookmarks.find(
                  (bookmark) => bookmark.resource.user_id == item.user_id
                ) || false;
              return (
                <div className="col-md-4 col-sm-6 col-12" key={`cv-${index}`}>
                  <div className="sliderContent agencies-slider">
                    {role == "agency" && (
                      <Tooltip title={"Shortlist"} type="featured">
                        <button
                          className={
                            "shortlist-btn" + (isShortlisted ? " active" : "")
                          }
                          onClick={() =>
                            isShortlisted
                              ? removeBookmark(isShortlisted.id)
                              : addToShortlist(item.id)
                          }
                        >
                          <IoBookmarkOutline />
                        </button>
                      </Tooltip>
                    )}
                    <img
                      src={item.profile_image || Placeholder}
                      className="candidateLogo"
                      width={150}
                      height={150}
                      alt=""
                      onError={(e) => {
                        e.target.src = Placeholder; // Set the backup image source
                      }}
                    />
                    <div className="agencyName">
                      <Link className="text-dark" to={`/creative/${item.slug}`}>
                        {item.name}
                      </Link>
                    </div>
                    <div className="position">{item.title}</div>
                    {item.location && (
                      <div className="job-location location">
                        <IoLocationOutline />
                        <Link to={`/creative-location/${item.location.state}`}>
                          {item.location.state},
                        </Link>
                        <Link to={`/creative-location/${item.location.city}`}>
                          {item.location.city}
                        </Link>
                      </div>
                    )}
                    <div className="profileLink">
                      <Link to={`/creative/${item.slug}`}>View Profile</Link>
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
      </div>
    </div>
  );
};

export default Creatives;
