import "../styles/CommunityMembers.css";
import LeftSidebar from "../components/community/LeftSidebar";
import MembersSearchBar from "../components/MembersSearchBar";

import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import CommunityMemberWidget from "../components/community/CommunityMemberWidget";

import RestrictedLounge from "../components/RestrictedLounge";

const CommunityMembers = () => {

  const { creatives, loading, loadMore, searchCreatives } = useCreatives();

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useScrollLoader(loading, loadMore);

  const searchUser = (value) => {
    console.log("searching");
    searchCreatives(value);
  };

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
                <div className="row g-4 px-1">
                  {creatives &&
                    creatives.map((creative, index) => {
                      return (
                        <CommunityMemberWidget key={"community-member-creative-" + creative.id} creative={creative} />
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
      ) : (
        <RestrictedLounge />
      )}
    </>
  );
};

export default CommunityMembers;
