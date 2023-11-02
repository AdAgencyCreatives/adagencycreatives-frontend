import Placeholder from "../assets/images/placeholder.png";
import { IoEarth, IoBookmarkOutline, IoLocationOutline, IoMailOpen, IoPersonAdd } from "react-icons/io5";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import "../styles/CommunityMembers.css";
import { Link } from "react-router-dom";
import LeftSidebar from "../components/community/LeftSidebar";
import MembersSearchBar from "../components/MembersSearchBar";

import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as DataContext } from "../context/DataContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import Tooltip from "../components/Tooltip";

const CommunityMembers = () => {
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

  useScrollLoader(loading, loadMore);

  const searchUser = (value) => {
    console.log("searching");
    searchCreatives(value);
  };

  return (
    <div className="dark-container page-community-members">
      <div className="container-fluid">
        <h1 className="display-5 fw-normal mb-5 text-white text-center">
          Creatives Directory
        </h1>
        <MembersSearchBar 
        placeholder="Search by name" 
        onSearch={searchUser} 
        />
        <div className="row">
          <div className="col-md-2 mb-3">
            <LeftSidebar />
          </div>
          <div className="col-md-10">
            <div className="row g-4 px-md-1 px-5">
              {creatives &&
                creatives.map((item, index) => {
                  return (
                    <div className="col-md-4 col-sm-6 col-12" key={`ag-${index}`}>
                      <div className="sliderContent members-list">
                        <img
                          src={item.profile_image || Placeholder}
                          className="candidateLogo"
                          width={150}
                          height={150}
                          alt=""
                        />
                        <div className="member-data">
                        <div className="agencyName">
                          <Link className="text-dark" to={`/creative/${item.slug}`}>
                            {item.name}
                          </Link></div>
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
                        </div>
                        <div className="user-actions">
                          <button className="btn btn-dark">
                            <IoPersonAdd />
                          </button>
                          <button className="btn btn-dark">
                            <IoMailOpen />
                          </button>
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
      </div>
    </div>
  );
};

export default CommunityMembers;
