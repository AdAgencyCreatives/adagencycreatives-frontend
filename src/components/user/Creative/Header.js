import { IoLocationOutline, IoPersonAdd } from "react-icons/io5";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";

const Header = ({ data, role, user }) => {
  const [allowed, setAllowed] = useState(false);

  const {
    state: { subscription },
    getSubscriptionStatus,
  } = useContext(AgenciesContext);

  const checkPermissions = () => {
    if (Cookies.get("token")) {
      if (role == "creative" && user?.uuid == data.user_id) {
        // check if current profile is the profie of logged in user
        return true;
      } else if (role == "admin" || subscription) {
        return true;
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    if (checkPermissions()) setAllowed(true);
  }, [user, subscription]);

  useEffect(() => {
    if (user?.role == "agency" || user?.role == "advisor") {
      getSubscriptionStatus();
    }
  }, [user]);

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top">
          <div className="avatar rounded">
            <img
              src={data.profile_image || Placeholder}
              height={100}
              width={100}
            />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-6">
              <div className="username">
                {data.name}
                {/* <span class="featured-text">Featured</span> */}
              </div>
              <div className="position">{data.title}</div>
              {data.location && (
                <div className="job-location location">
                  <IoLocationOutline />
                  <Link to={`/creative-location/${data.location.state}`}>
                    {data.location.state},
                  </Link>
                  <Link to={`/creative-location/${data.location.city}`}>
                    {data.location.city}
                  </Link>
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0 flex-md-nowrap flex-wrap">
                {allowed && (
                  <a href={data.resume} target="__blank">
                    <button className="btn btn-dark fs-5">
                      Download Resume
                    </button>
                  </a>
                )}
                <button className="btn btn-dark fs-5">Private Message</button>
                <button className="btn btn-dark fs-5">
                  <IoPersonAdd />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
