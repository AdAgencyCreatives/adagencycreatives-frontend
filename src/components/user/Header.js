import { Link } from "react-router-dom";
import AdAgencyLogo from "../../assets/images/AdAgency.png";
import { IoLocationOutline, IoMailOpen, IoPersonAdd } from "react-icons/io5";

const Header = ({ username }) => {
  return (
    <div className="user-profile-header mb-5">
      <div className="user-avatar">
        <img src={AdAgencyLogo} />
      </div>
      <div className="user-details">
        <div className="username">Ad Agency Creatives</div>
        <div class="member-title-location text-white">
          <div class="candidate-job text-white">Community Founder</div>
          <div class="candidate-location with-icon">
            <IoLocationOutline />
            <span class="restrict-location-search">Dallas</span>,
            <span class="restrict-location-search">Texas</span>
          </div>
        </div>
        <div className="user-actions">
          <button className="btn"><IoPersonAdd /> Add Friend</button>
          <button className="btn btn-outline"><IoMailOpen /> Message</button>
        </div>
      </div>
      <div class="user-statistics">
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
      </div>
    </div>
  );
};

export default Header;
