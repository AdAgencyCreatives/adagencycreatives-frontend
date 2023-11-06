import { Link } from "react-router-dom";
import AdAgencyLogo from "../../assets/images/AdAgency.png";
import { IoLocationOutline, IoMailOpen, IoPeopleOutline, IoPersonAdd } from "react-icons/io5";

const Header = ({ username }) => {
  return (
    <div className="user-profile-header mb-5">
      <div className="user-avatar">
        <img src={AdAgencyLogo} />
      </div>
      <div className="user-details">
        <div className="username">{username}</div>
        <div class="member-title-location text-white">
          <div class="candidate-job text-white">Community Founder</div>
          <div class="candidate-location with-icon">
            <IoLocationOutline />
            <span class="restrict-location-search">Dallas</span>,
            <span class="restrict-location-search">Texas</span>
          </div>
        </div>
        <div className="user-actions">
          <Link className="btn btn-dark btn-outline" to="/community-members"><IoPersonAdd /> Add Friend</Link>
          <Link className="btn btn-dark btn-outline" to="/messages"><IoMailOpen /> Message</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=requests"><IoPeopleOutline /> Requests</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=pending"><IoPeopleOutline /> Pending</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=accepted"><IoPeopleOutline /> Accepted</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=declined"><IoPeopleOutline /> Declined</Link>
          <Link className="btn btn-dark btn-outline" to="/friends?friendships=cancelled"><IoPeopleOutline /> Cancelled</Link>
        </div>
      </div>
      {/* <div class="user-statistics">
        <ul>
          <li>
            <Link to={`${username}/comments`}>
              <div class="snumber">0</div>
              <h3 class="sdescription">Comments</h3>
            </Link>
          </li>

          <li>
            <Link to={username}>
              <div class="snumber">257</div>
              <h3 class="sdescription">Views</h3>
            </Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Header;
