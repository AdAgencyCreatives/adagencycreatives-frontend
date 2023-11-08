import { Link } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.png";
import { IoLocationOutline, IoMailOpen, IoPeopleOutline, IoPersonAdd } from "react-icons/io5";

import { Context as AuthContext } from "../../context/AuthContext";
import { getCreativeById } from "../../context/CreativesDataContext";
import { useContext, useEffect, useState } from "react";

const Header = ({ username }) => {

  const [creative, setCreative] = useState(null);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  const getCreativeByIdAsync = async (id) => {
    let result = await getCreativeById(id);
    setCreative(result);
  };

  useEffect(() => {
    if (user) {
      getCreativeByIdAsync(user.uuid)
    }
  }, [user]);

  return (
    <div className="user-profile-header mb-5">
      <div className="user-avatar">
        <img src={creative ? creative.profile_image : Placeholder} alt="" />
      </div>
      <div className="user-details">
        <div className="username">{creative ? creative.name : ""}</div>
        <div className="member-title-location text-white">
          <div className="candidate-job text-white">{creative ? creative.title : ""}</div>
          {creative && creative.location && (
            <div className="member-title-location text-white">
              {creative.location && (creative.location.state || creative.location.city) ? (
                <IoLocationOutline />
              ) : (
                <></>
              )}
              <span className="restrict-location-search">{creative.location && creative.location.state ? creative.location.state : ""}</span>
              {creative.location && creative.location.state && creative.location.city ? (
                <span>,&nbsp;</span>
              ) : (
                <></>
              )}
              <span className="restrict-location-search">{creative.location && creative.location.city ? creative.location.city : ""}</span>
            </div>
          )}
        </div>
        <div className="user-actions">
          <Link className="btn btn-dark btn-outline" to="/community-members"><IoPersonAdd /> Add Friend</Link>
          <Link className="btn btn-dark btn-outline" to="/messages"><IoMailOpen /> Message</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=requests"><IoPeopleOutline /> Friend Requests</Link>
          <Link className="btn btn-dark btn-outline" to="/friends"><IoPeopleOutline /> Your Friends</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=pending"><IoPeopleOutline /> Pending</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=accepted"><IoPeopleOutline /> Accepted</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=declined"><IoPeopleOutline /> Declined</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=cancelled"><IoPeopleOutline /> Cancelled</Link>
        </div>
      </div>
      {/* <div className="user-statistics">
        <ul>
          <li>
            <Link to={`${username}/comments`}>
              <div className="snumber">0</div>
              <h3 className="sdescription">Comments</h3>
            </Link>
          </li>

          <li>
            <Link to={username}>
              <div className="snumber">257</div>
              <h3 className="sdescription">Views</h3>
            </Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Header;
