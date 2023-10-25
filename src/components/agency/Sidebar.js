import { Link,NavLink } from "react-router-dom";
import Logo from "../../assets/images/AdAgency.png";
import { agencyNav } from "../../nav/DashboardNav";
import '../../styles/AgencyDashboard/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="agency-sidebar">
      <div className="sidebar-top">
        <div className="user-logo">
          <div className="employer-logo">
            <Link href="#">
              <img width="150" height="150" src={Logo} />
            </Link>
          </div>
        </div>
        <div className="inner">
          <h3 className="title">
            <Link href="#">John Doe</Link>
          </h3>
          <div className="employer-location">
            <div className="value">
              <Link href="#">Dallas</Link>,<Link href="#">Texas</Link>
            </div>
          </div>
          <div className="view-profile">
            <Link href="#" className="btn btn-dark btn-hover-primary">
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
                <NavLink to={item.link}>{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
