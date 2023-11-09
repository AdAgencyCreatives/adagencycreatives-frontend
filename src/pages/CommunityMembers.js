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


const CommunityMembers = () => {

  const { creatives, loading, loadMore, searchCreatives } = useCreatives();
  const [isLoading, setIsLoading] = useState(true);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useScrollLoader(loading, loadMore);

  const searchUser = (value) => {
    console.log("searching");
    setIsLoading(true);
    searchCreatives(value);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [creatives]);

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
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
                {isLoading ? (
                  <div className="center-page">
                    <CircularProgress />
                    <span>Loading ...</span>
                  </div>
                ) : (<>
                  {creatives && creatives.length ? (
                    <div className="row g-4 px-1">
                      {creatives &&
                        creatives.map((creative, index) => {
                          return (
                            <>
                              {creative.user_id != user.uuid ? (
                                <CommunityMemberWidget key={"community-member-creative-" + creative.id} creative={creative} />
                              ) : (
                                <></>
                              )
                              }
                            </>
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

export default CommunityMembers;
