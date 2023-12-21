import Placeholder from "../assets/images/placeholder.png";
import { IoBookmarkOutline, IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import Tooltip from "../components/Tooltip";
import { Context as AlertContext } from "../context/AlertContext";

const Creatives = () => {
  const { creatives, loading, loadMore, searchCreativesAdvanced } = useCreatives();
  const {
    state: { bookmarks },
    createBookmark,
    getBookmarks,
    removeBookmark,
  } = useContext(DataContext);

  const {
    state: {
      role,
      user,
      token,
      subscription_status,
      advance_search_capabilities,
    },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  const [creativeSearchPlaceholder, setCreativeSearchPlaceholder] = useState(
    "Search by name or location"
  );
  //"Search by name, title, location, company, industry experience, media, full-time etc."

  const addToShortlist = (id) => {
    createBookmark(user.uuid, "creatives", id);
  };

  useScrollLoader(loading, loadMore);

  const searchUser = (value) => {

    let searchString = "" + (value ? value : "");
    let searchTerms = searchString.indexOf(",") >= 0 ? searchString.split(',') : [searchString];

    let permission = proceed_search(searchString, searchTerms);

    showAlert(permission.message);
    if (!permission.proceed) {
      return;
    }

    let query_search_string = build_search_string(searchTerms, permission.terms_allowed);
    //alert(query_search_string);

    console.log("Searching: " + query_search_string);
    searchCreativesAdvanced(which_search(), query_search_string);

  };

  const build_search_string = (searchTerms, terms_allowed) => {
    return searchTerms.slice(0, terms_allowed).join(',');
  };

  const which_search = () => {
    if (!role) {
      return "search1";
    }

    if (role == 'admin' || role == 'advisor') {
      return "search3";
    }

    if (role == "creative" || (role == 'agency' && subscription_status == "active")) {
      return "search2";
    }

    if (role == 'agency' && subscription_status != "active") {
      return "search1";
    }

    return "search1";
  };

  const proceed_search = (searchString, searchTerms) => {

    // if (!searchString || !searchString.length) {
    //   return { message: "Please enter some text to search", proceed: false, terms_allowed: 0 };
    // }

    if (!role) {
      return { message: "It seems you are not logged in", proceed: false, terms_allowed: 0 };
    }

    if (role == "admin" || role == "advisor") {
      return { message: "", proceed: true, terms_allowed: searchTerms.length };
    }

    if (role == "agency" && advance_search_capabilities) {
      return { message: "", proceed: true, terms_allowed: searchTerms.length };
    }

    if (role == "agency" && subscription_status && subscription_status == "active" && searchTerms.length <= 2) {
      return { message: "", proceed: true, terms_allowed: Math.min(searchTerms.length, 2) };
    }

    //Special case: If agency does have a subscription status: active but trying to search for more than two terms. e.g.: a,b,c
    if (role == "agency" && subscription_status && subscription_status == "active" && searchTerms.length > 2) {
      return { message: "", proceed: true, terms_allowed: Math.min(searchTerms.length, 2) };
    }

    //Special case: If agency doesn't have a subscription status: active and trying to search for more than one terms. e.g.: a,b
    if (role == "agency" && (!subscription_status || subscription_status != "active") && searchTerms.length > 1) {
      return { message: "Post a Job for advance search capabilities", proceed: true, terms_allowed: Math.min(searchTerms.length, 1) };
    }

    return { message: "", proceed: true, terms_allowed: 1 };
  };

  useEffect(() => {
    if (user) getBookmarks(user.uuid,"creatives");
  }, [user]);

  useEffect(() => {
    if ((!role || !role.length) || !advance_search_capabilities) {
      return;
    }

    if (role == "agency" && advance_search_capabilities) {
      setCreativeSearchPlaceholder(
        "Search by name, title, location, company, industry experience, media, full-time etc."
      );
    }
  }, [role, advance_search_capabilities]);

  useEffect(() => {
    if ((!role || !role.length) || (!subscription_status || !subscription_status.length)) {
      return;
    }

    if (role == "creative" || (role == "agency" && subscription_status == "active")) {
      setCreativeSearchPlaceholder("Search by name, location, or title");
    }
  }, [role, subscription_status]);

  useEffect(() => {
    if (!role || !role.length) {
      return;
    }

    if (role == "admin" || role == "advisor") {
      setCreativeSearchPlaceholder(
        "Search by name, title, location, company, industry experience, media, full-time etc."
      );
    }
  }, [role]);

  return (
    <div className="dark-container">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">
          Creatives
        </h1>
        {token && (
          <SearchBar
            placeholder={creativeSearchPlaceholder}
            onSearch={searchUser}
          />
        )}
        <div className="row g-4">
          {creatives &&
            creatives.map((item, index) => {
              const isShortlisted =
                bookmarks.find(
                  (bookmark) => bookmark.resource.user_id == item.user_id
                ) || false;
              return (
                <div className="col-md-4 col-sm-6 col-12" key={`creative-${item.user_id}`}>
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
                      <Link className="text-dark" to={`/creative/${item.slug}`} reloadDocument>
                        {item.name}
                      </Link>
                    </div>
                    <div className="position">{item.category || ""}</div>
                    {item.location.state && (
                      <div className="job-location location">
                        <IoLocationOutline />
                        <Link to={`/creatives/search/state/${item.location.state}`}>
                          {item.location.state},&nbsp;
                        </Link>
                        <Link to={`/creatives/search/city/${item.location.city}`}>
                          {item.location.city}
                        </Link>
                      </div>
                    )}
                    <div className="profileLink">
                      <Link
                        to={token ? `/creative/${item.slug}` : "#"}
                        onClick={(e) => {
                          if (!token) {
                            e.preventDefault();
                            showAlert("Please login to access");
                          }
                          return false;
                        }}
                        reloadDocument
                      >
                        View Profile
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
      </div>
    </div>
  );
};

export default Creatives;
