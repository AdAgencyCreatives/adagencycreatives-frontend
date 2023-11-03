import "../../../styles/User/ProfileSidebar.scss";
import { Link } from "react-router-dom";
import sample from "../../../assets/images/sample.mp4";

const Sidebar = ({ data }) => {
  const workplacePreference = data.workplace_preference;
  const linkedin = data.links.find((link) => link.label == "linkedin")?.url;
  const website = data.links.find((link) => link.label == "website")?.url;
  const preferences = [];

  if (workplacePreference.is_remote) {
    preferences.push("Remote");
  }
  if (workplacePreference.is_hybrid) {
    preferences.push("Hybrid");
  }
  if (workplacePreference.is_onsite) {
    preferences.push("Onsite");
  }
  return (
    <>
      <div className="sidebar-item">
        <h4 className="title">Agency Details</h4>
        <div className="content">
          {preferences.length ? (
            <div className="mt-4">
              <div className="details">
                <div className="text">Workplace Preference</div>
                <div className="value">{preferences.join(",")}</div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-4">
            {data.industry_experience.length ? (
              <div className="details">
                <div className="text">Industry Specialty:</div>
                <div className="value">
                  {data.industry_experience.slice(0, 5).map((item, index) => (
                    <>
                      <Link
                        to={
                          "/agency-category/" +
                          item.toLowerCase().replace(" ", "-").replace("|", "-")
                        }
                        className="text-dark"
                      >
                        {item}
                      </Link>
                      {index < data.industry_experience.length - 1 && ", "}
                    </>
                  ))}
                  {data.industry_experience.length > 5 ? " +" : ""}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-4">
            <div className="details">
              <div className="text">Company Size</div>
              <div className="value">{data.size}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="details">
              <div className="text">Location:</div>
              <div className="value">
                {data.location && (
                  <div className="job-location location">
                    <Link
                      to={`/agency-location/${data.location.state}`}
                      className="mt-0 fw-normal"
                    >
                      {data.location.state},
                    </Link>
                    <Link
                      to={`/agency-location/${data.location.city}`}
                      className="mt-0 fw-normal"
                    >
                      {data.location.city}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="details">
              <div className="text mb-3">Agency</div>
              <div className="value d-flex flex-wrap gap-3">
                {linkedin && (
                  <Link
                    className="text-light fs-5 btn btn-dark w-100 py-3"
                    to={linkedin}
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                )}
                {website && (
                  <Link
                    className="text-light fs-5 btn btn-dark w-100 py-3"
                    to={website}
                    target="_blank"
                  >
                    Website
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-item mt-4">
        <h4 className="title">Video</h4>
        {data.video ? (
          <div className="video-section mt-4">
            <video src={sample} controls></video>
          </div>
        ) : (
          <button className="btn btn-dark w-100 py-3 fs-5">Coming Soon</button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
