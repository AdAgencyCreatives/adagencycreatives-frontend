import CreativeContent from "../../components/user/Creative/Content";
import CreativeHeader from "../../components/user/Creative/Header";
import CreativeSidebar from "../../components/user/Creative/Sidebar";

import AgencyContent from "../../components/user/Agency/Content";
import AgencyHeader from "../../components/user/Agency/Header";
import AgencySidebar from "../../components/user/Agency/Sidebar";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import RestrictedAgency from "../../components/RestrictedAgency";

import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AgenciesContext } from "../../context/AgenciesContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Portfolio from "../../components/user/Creative/Portfolio";

const Profile = () => {
  const { username, type, role_name } = useParams();
  const page = type;

  const [roleId, setRoleId] = useState(role_name);

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
    if (token) {
      if (page == "creative") getCreative(username);
    }
    if (page == "agency") {
      if (role_name == 'recruiter') {
        setRoleId(5);
      }
      if (role_name == 'advisor') {
        setRoleId(2);
      }
      getAgency(username, user ? user.username == username : false, roleId);
    }
  }, [page, user, role_name]);

  useEffect(() => {
    if (page == "agency" && Object.keys(data).length) {
      getOpenPositions(data.user_id);
    }
  }, [page, data]);

  useEffect(() => {
    if (page == "creative") setData(single_creative);
    else if (page == "agency") setData(single_agency);
  }, [single_creative, single_agency]);

  return Object.keys(data).length === 0 ? (
    <Loader />
  ) : (
    <>
      {token && user ? (
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
                <div className="col-md-8">
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
                <div className="col-md-4 d-none d-md-block">
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
      ) : (
        <RestrictedAgency role={role} />
      )}
    </>
  );
};

export default Profile;
