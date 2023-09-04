import "../../../styles/User/ProfileSidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <h4 className="title">Agency Details</h4>
      <div className="content">
        <div className="mt-4">
          <div className="details">
            <div className="text">Industry Specialty:</div>
            <div className="value">
              <Link className="text-dark">Design | Branding</Link>,
              <Link className="text-dark">Social | Digital</Link>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="details">
            <div className="text">Company Size</div>
            <div className="value">200+</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="details">
            <div className="text">Location:</div>
            <div className="value">
              <div className="job-location location">
                <a className="mt-0 fw-normal" href="#">
                  Los Angeles,
                </a>
                <a className="mt-0 fw-normal" href="#">
                  California
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="details">
            <div className="text mb-3">Agency</div>
            <div className="value d-flex flex-wrap gap-3">
              <button className="btn btn-dark w-100">
                <a
                  className="text-light"
                  href="https://www.linkedin.com/company/uniteppk/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </button>
              <button className="btn btn-dark w-100">
                <a
                  className="text-light"
                  href="https://www.linkedin.com/company/uniteppk/"
                  target="_blank"
                >
                  Website
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
