import CreativeContent from "../../components/user/Creative/Content";
import CreativeHeader from "../../components/user/Creative/Header";
import CreativeSidebar from "../../components/user/Creative/Sidebar";

import AgencyContent from "../../components/user/Agency/Content";
import AgencyHeader from "../../components/user/Agency/Header";
import AgencySidebar from "../../components/user/Agency/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  let location = useLocation();

  const path = location.pathname;
  console.log(path)
  let page;
  if (path.indexOf("creative") !== -1) {
    page = "creative";
  } else if (path.indexOf("agency") !== -1) {
    page = "agency";
  }

  console.log(page);

  return (
    <>
      <div className="profile-header">
        {page == "creative" ? <CreativeHeader /> : <AgencyHeader />}
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
              {page == "creative" ? <CreativeContent /> : <AgencyContent />}
            </div>
            <div className="col-md-4">
              <div className="profile-sidebar">
                {page == "creative" ? <CreativeSidebar /> : <AgencySidebar />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
