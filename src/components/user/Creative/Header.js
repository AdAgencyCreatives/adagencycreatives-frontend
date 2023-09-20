import { IoLocationOutline, IoPersonAdd } from "react-icons/io5";
import Jeff from "../../../assets/images/jeff.jpg";
import "../../../styles/User/ProfileHeader.scss";

const Header = () => {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-12 d-flex align-items-top">
          <div className="avatar rounded">
            <img src={Jeff} height={100} width={100} />
          </div>
          <div className="meta row w-100 align-items-center">
            <div className="col-md-6">
              <div className="username">
                Jeffrey Barry <span class="featured-text">Featured</span>
              </div>
              <div className="position">
                Freelance Creative Director / Associate Creative Director
              </div>
              <div className="job-location location">
                <IoLocationOutline />
                <a href="#">Los Angeles,</a>
                <a href="#">California</a>
              </div>
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
