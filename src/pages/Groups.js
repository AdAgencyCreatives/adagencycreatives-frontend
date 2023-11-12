import { FaPencil, FaEarthAmericas, FaRightToBracket } from "react-icons/fa6";
import "../styles/Groups.scss";
import { Link } from "react-router-dom";
import LeftSidebar from "../components/community/LeftSidebar";
import GroupWidget from "../components/community/GroupWidget";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import RestrictedLounge from "../components/RestrictedLounge";
import { CircularProgress } from "@mui/material";
import { Context as GroupsContext } from "../context/GroupsContext";

const Groups = () => {

  const [isLoading, setIsLoading] = useState(true);

  const {
    state: { groups, nextPage, loading },
    getGroups,
    loadGroups,
    searchGroups,
  } = useContext(GroupsContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    if(user) {
      getGroups();
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const loadMore = () => {
    if (nextPage) loadGroups(nextPage);
  };

  useScrollLoader(loading, loadMore);


  useEffect(() => {
    if(user && groups) {
      setIsLoading(false);
    }
    // console.log("Groups Fetched: ");
    // console.log(groups);
  }, [user, groups]);

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="dark-container page-groups">
          <div className="container-fluid px-2 px-md-5">
            <h1 className="display-5 fw-normal mb-5 text-white text-center">
              Groups Directory
            </h1>
            <div className="search-bar">
              <input
                className="search-community-members"
                placeholder="Search by name"
              />
              {/* <button className="clear-btn">Clear</button> */}
            </div>
            <div className="members-header">
              <Link to="create" className="text-dark">
                <div className="members-count">
                  <FaPencil color="#a4a4a4" />
                  <span className="m-2">Create a Group</span>
                  {/* <span className="count-number">340</span> */}
                </div>
              </Link>
            </div>
            <div className="row">
              <div className="col-md-2 mb-3">
                <LeftSidebar />
              </div>
              <div className="col-md-10">
                {isLoading ? (
                  <div className="center-page">
                    <CircularProgress />
                    <span>Loading ...</span>
                  </div>
                ) : (<>
                  {groups && groups.length ? (
                    <div className="row g-4 px-1">
                      {groups &&
                        groups.map((group, index) => {
                          return (
                            <GroupWidget group={group} />
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
                  ) : (
                    <div className="center-page">
                      Sorry, nothing here.
                    </div>
                  )}
                </>)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RestrictedLounge />
      )}
    </>
  );
};

export default Groups;
