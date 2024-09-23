import "../styles/CommunityMembers.css";
import LeftSidebar from "../components/community/LeftSidebar";
import MembersSearchBar from "../components/MembersSearchBar";

import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import CommunityMemberWidget from "../components/community/CommunityMemberWidget";

import RestrictedLounge from "../components/RestrictedLounge";
import { CircularProgress } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { useHistoryState } from "../hooks/useHistoryState";

const CommunityMembers = () => {

  const [input, setInput] = useHistoryState("input", "");

  const { creatives, loading, loadMore, getCreatives, searchCreativesAdvanced } = useCreatives();
  const [isLoading, setIsLoading] = useState(true);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useScrollLoader(loading, loadMore);

  const searchUser = (value) => {

    if (!value || value.length == 0) {
      getCreatives();
      return;
    }

    console.log("searching");
    setIsLoading(true);
    let terms = value.split(',');
    let search = terms && terms.length && terms.length > 1 ? terms[0] : value;
    searchCreativesAdvanced("search2", search, role);
  };

  useEffect(() => {
    if (creatives?.length >= 0) setIsLoading(false);
  }, [creatives]);

  useEffect(() => {
    if (role && input?.length > 0) {
      searchUser(input);
    } else {
      getCreatives();
    }
  }, [role]);

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="dark-container page-community-members">
          <div className="container-fluid px-2 px-md-5">
            <h1 className="community-title text-white text-center mb-4">
              Creatives
            </h1>
            <div className="row div_row">
              <div className="col-md-2 mb-3 menu_left">
                <LeftSidebar />
              </div>
              <div className="col-md-10 div_content-right">
                {isLoading ? (
                  <div className="center-page">
                    <CircularProgress />
                    <span>Loading ...</span>
                  </div>
                ) : (
                  <>
                    <SearchBar input={input} setInput={setInput} onSearch={searchUser} placeholder="Search by member name" />

                    {creatives?.length > 0 ? (
                      <div className="row g-4 px-1">
                        {creatives &&
                          creatives.map((creative, index) => {
                            return (
                              <CommunityMemberWidget
                                key={"community-member-creative-" + creative.id}
                                creative={creative}
                              />
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
                      <div className="no_result">
                        <p>Please try again. No exact results found.</p>
                      </div>
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

export default CommunityMembers;
