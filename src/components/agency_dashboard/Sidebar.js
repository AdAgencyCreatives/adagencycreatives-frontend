import { Link } from "react-router-dom";
import Logo from "../../assets/images/AdAgency.png";
import { agencyNav } from "../../nav/AgencyNav";
import '../../styles/AgencyDashboard/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="agency-sidebar">
      <div className="sidebar-top">
        <div class="user-logo">
          <div class="employer-logo">
            <Link href="#">
              <img width="150" height="150" src={Logo} />
            </Link>
          </div>
        </div>
        <div class="inner">
          <h3 class="title">
            <Link href="#">John Doe</Link>
          </h3>
          <div class="employer-location">
            <div class="value">
              <Link href="#">Dallas</Link>,<Link href="#">Texas</Link>
            </div>
          </div>
          <div class="view-profile">
            <Link href="#" class="btn btn-dark btn-hover-primary">
              View Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul className="menu">
          {agencyNav.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
