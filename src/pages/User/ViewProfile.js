import CreativeContent from "../../components/user/Creative/Content";
import CreativeHeader from "../../components/user/Creative/Header";
import CreativeSidebar from "../../components/user/Creative/Sidebar";

import AgencyContent from "../../components/user/Agency/Content";
import AgencyHeader from "../../components/user/Agency/Header";
import AgencySidebar from "../../components/user/Agency/Sidebar";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import RestrictedUser from "../../components/RestrictedUser";

import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AgenciesContext } from "../../context/AgenciesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Portfolio from "../../components/user/Creative/Portfolio";

const Profile = () => {
  const { username, type, role_name } = useParams();
  const page = type;

  const [isLoading, setLoading] = useState(true);

  const {
    state: { single_creative, creative_education, creative_experience },
    getCreative,
  } = useContext(CreativesContext);

  const {
    state: { single_agency, open_positions },
    getAgency,
    getOpenPositions,
  } = useContext(AgenciesContext);

  const {
    state: { user, role, token },
  } = useContext(AuthContext);

  const [data, setData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (token) {
      if (page == "creative") getCreative(username);
    }

    if (token && user) {
      if (page == "agency") {
        let roleId = false;
        if (role_name == 'recruiter') {
          roleId = 5;
        }
        if (role_name == 'advisor') {
          roleId = 2;
        }
        getAgency(username, user ? user.username == username : false, roleId);
      }
    }
  }, [page, user, role_name]);

  useEffect(() => {
    if (page == "agency" && Object.keys(data).length) {
      getOpenPositions(data.user_id, 0, 1);
    }
  }, [page, data]);

  useEffect(() => {
    if (page == "creative") setData(single_creative);
    else if (page == "agency") setData(single_agency);
  }, [single_creative, single_agency]);

  const isCreative = user?.role == "creative";
  const isAdmin = user?.role == "admin";
  const isAdvisor = user?.role == "advisor";
  const isAgency = user?.role == "agency";
  const isRecruiter = user?.role == "recruiter";
  const isOwnProfile = user?.uuid == data.user_id;

  if (isLoading) {
    return <Loader />;
  }

  return <>
    {Object.keys(data).length === 0 ? (
      <>
        {!token && !user ? (
          <RestrictedUser role={role_name ? role_name : page} />
        ) : (
          <Loader />
        )}
      </>
    ) : (
      <>
        {!isOwnProfile && !isAdmin && (role_name == "advisor" || role_name == "recruiter") ? (
          <RestrictedUser role={"admin"} />
        ) : (
          <>
            <div className="profile-header">
              {page === "creative" ? (
                <CreativeHeader data={data} role={role} user={user} />
              ) : (
                <AgencyHeader data={data} role={role} user={user} />
              )}
            </div>
            <div className="profile-content mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-6 col-12">
                    {page == "creative" && <Portfolio id={data.user_id} />}
                    <div className="content-section">
                      <h1 className="content-title mt-0">About</h1>
                      <p className="content"><div dangerouslySetInnerHTML={{ __html: data.about }} /></p>
                    </div>
                    <div className="profile-sidebar d-md-none">
                      {page === "creative" ? (
                        <CreativeSidebar data={data} role={role} user={user} />
                      ) : (
                        <AgencySidebar data={data} />
                      )}
                    </div>
                    {page === "creative" ? (
                      <CreativeContent
                        user={user}
                        data={data}
                        role={role}
                        education={creative_education}
                        experience={creative_experience}
                      />
                    ) : (
                      <AgencyContent user={user} role={role} data={data} jobs={open_positions} />
                    )}
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 d-none d-md-block">
                    <div className="profile-sidebar">
                      {page === "creative" ? (
                        <CreativeSidebar data={data} role={role} user={user} />
                      ) : (
                        <AgencySidebar data={data} user={user} role={role} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )}
  </>
};

export default Profile;
