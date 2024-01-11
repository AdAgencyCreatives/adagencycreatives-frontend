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
import { Context as AlertContext } from "../context/AlertContext";
import SearchBar from "../components/SearchBar";
import GroupsHeader from "../components/user/GroupsHeader";

const Groups = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groupsFound, setGroupsFound] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const viewQueryParam = queryParams.get("view");

  const [currentView, setCurrentView] = useState(viewQueryParam);

  const {
    state: { groups, nextPage, loading },
    getGroups, loadGroups, searchGroups, getUserGroups, updateGroup, deleteGroup, getMembershipGroups,
  } = useContext(GroupsContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  const {
    showAlert,
  } = useContext(AlertContext);

  useEffect(() => {
    // console.log(user);
    if (user) {
      if (
        !currentView ||
        !(
          currentView == "private" ||
          currentView == "my" ||
          currentView == "joined"
        )
      ) {
        setIsLoading(true);
        setGroupsFound(null);
        getGroups();
      } else {
        setIsLoading(true);
        setGroupsFound(null);
        if (currentView == "private") {
          getGroups(1);
        } else if (currentView == "my") {
          getUserGroups(user.uuid);
        } else if (currentView == "joined") {
          getMembershipGroups(user.uuid);
        }
      }
    }
  }, [user, currentView]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const loadMore = () => {
    if (nextPage) loadGroups(nextPage);
  };

  useScrollLoader(loading, loadMore);

  useEffect(() => {
    if (user && groups) {
      setIsLoading(false);
      setGroupsFound(groups);
    }
    // console.log("Groups Fetched: ");
    // console.log(groups);
  }, [user, groups]);

  const isCurrentPage = (relativeUrl) => {
    return (window.location.pathname + (window.location.search && window.location.search.length > 1 ? window.location.search : '')) == relativeUrl;
  }

  const onUpdateGroup = (group, data) => {
    console.log("Update Group:");
    console.log(group);
    console.log("Data:");
    console.log(data);
    alert("Updated");
  }

  const onDeleteGroup = (group) => {
    (async () => {
      await deleteGroup(group.uuid);
      showAlert("Group Deleted");
    })();

  }

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="dark-container page-groups">
          <div className="container-fluid px-2 px-md-5">
            <h1 className="community-title text-white text-center mb-4">
              Groups
            </h1>
            <div className="row div_row">
              <div className="col-md-2 mb-3 menu_left">
                <LeftSidebar />
              </div>
              <div className="col-md-10 div_content-right">
                <GroupsHeader currentView={currentView} setCurrentView={setCurrentView} />
                {isLoading ? (
                  <div className="center-page">
                    <CircularProgress />
                    <span>Loading ...</span>
                  </div>
                ) : (
                  <>
                    {!currentView && <SearchBar placeholder="Search by group name"
                      onSearch={searchGroups}
                    />}

                    {groupsFound && groupsFound.length ? (
                      <div className="row g-4 px-1">
                        {groupsFound &&
                          groupsFound.map((group, index) => {
                            return (
                              <>
                                {group.name == "Feed" || (currentView != "private" && currentView != "my" && currentView != "joined" && group.status != "public") ? (
                                  <></>
                                ) : (
                                  <GroupWidget key={group.uuid} group={group} onUpdateGroup={onUpdateGroup} onDeleteGroup={onDeleteGroup} />
                                )}
                              </>
                            );
                          })}
                        <div className="load-more text-center">
                          {loading && (
                            <div
                              className="spinner-border text-light"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="center-page">Sorry, nothing here.</div>
                    )}
                  </>
                )}
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
