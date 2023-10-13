import CreativeContent from "../../components/user/Creative/Content";
import CreativeHeader from "../../components/user/Creative/Header";
import CreativeSidebar from "../../components/user/Creative/Sidebar";

import AgencyContent from "../../components/user/Agency/Content";
import AgencyHeader from "../../components/user/Agency/Header";
import AgencySidebar from "../../components/user/Agency/Sidebar";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AgenciesContext } from "../../context/AgenciesContext";

const Profile = () => {
  const { username } = useParams();
  let location = useLocation();
  const path = location.pathname;
  let page;

  const {
    state: { single_creative },
    getCreative,
  } = useContext(CreativesContext);


  if (path.indexOf("creative") !== -1) {
    page = "creative";
  } else if (path.indexOf("agency") !== -1) {
    page = "agency";
  }

  useEffect(() => {
    console.log("getting createive")
    if (page == "creative") getCreative(username);
  }, []);

  console.log({ single_creative });


  return (
    <>
      <div className="profile-header">
        {page === "creative" ? (
          <CreativeHeader data={single_creative} />
        ) : (
          <AgencyHeader />
        )}
      </div>
      <div className="profile-content mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="content-section">
                <h1 className="content-title mt-0">About</h1>
                <p className="content">
                  I am deeply passionate about connecting people through art and
                  design, and I believe that creativity has the power to
                  transcend boundaries and bring people together. In my free
                  time, I enjoy exploring new art forms and experimenting with
                  different mediums, from digital illustration to traditional
                  painting.
                </p>
              </div>
              <div className="profile-sidebar d-md-none">
                {page === "creative" ? (
                  <CreativeSidebar data={single_creative} />
                ) : (
                  <AgencySidebar />
                )}
              </div>
              {page === "creative" ? (
                <CreativeContent data={single_creative} />
              ) : (
                <AgencyContent />
              )}
            </div>
            <div className="col-md-4 d-none d-md-block">
              <div className="profile-sidebar">
                {page === "creative" ? (
                  <CreativeSidebar data={single_creative} />
                ) : (
                  <AgencySidebar />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
