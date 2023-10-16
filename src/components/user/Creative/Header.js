import { IoLocationOutline, IoPersonAdd } from "react-icons/io5";
import Placeholder from "../../../assets/images/placeholder.png";
import "../../../styles/User/ProfileHeader.scss";
import { Link } from "react-router-dom";
const Header = ({ data }) => {
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
              <div className="actions d-flex justify-content-md-end mt-3 mt-md-0">
                <button className="btn btn-dark">Private Message</button>
                <button className="btn btn-dark">
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
