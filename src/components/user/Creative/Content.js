import moment from "moment";
import portfolio from "../../../assets/images/portfolio.png";
import "../../../styles/User/ProfileContent.scss";
import Reviews from "../Reviews";
import RelatedCreatives from "./RelatedCreatives";
import Portfolio from "./Portfolio";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import useHelper from "../../../hooks/useHelper";
import Placeholder from "../../../assets/images/placeholder.png";

const Content = ({ user, role, data, education, experience }) => {

  const { rectify_url, encodeSpecial, decodeSpecial } = useHelper();

  const maxEducations = 4;
  const [showAllEducations, setShowAllEducations] = useState(false);

  const maxExperiences = 8;
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const {
    state: { subscription_status },
  } = useContext(AuthContext);

  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";

  const isCreative = user?.role == "creative";
  const isOwnProfile = isCreative && user?.uuid == data.user_id;
  const portfolio_link = rectify_url(data.links?.find((item) => item.type = "portfolio")?.url) ?? "#";

  return (
    <>
      <div className="content-section">
        <h1 className="content-title">Portfolio Site</h1>
        <a href={portfolio_link} target="_blank">
          <img
            src={data.portfolio_website || Placeholder}
            onError={(e) => {
              e.target.src = Placeholder; // Set the backup image source
            }} />
        </a>
      </div>
      {/* Education */}
      {education?.length > 0 ? (
        <div className="content-section">
          <h1 className="content-title">Education</h1>
          <h6>Showing 1 - {education.length <= maxEducations || showAllEducations ? education.length : maxEducations} of {education.length}</h6>
          <div className="content-list">
            {education.slice(0, (education.length <= maxEducations || showAllEducations ? education.length : maxEducations)).map((item) => (
              <div className="content" key={item.id}>
                <div className="circle">{item.degree?.charAt(0)}</div>
                <div className="top-info">
                  <span className="edu_stats">
                    {isAdmin || isAdvisor ? (<>
                      <Link to={"/creatives/search/education-degree-program/" + encodeSpecial(encodeURI(item.degree))}>
                        {item.degree}
                      </Link>
                    </>) : (<>
                      {item.degree}
                    </>)}
                  </span>
                  <span className="year">
                    {item.completed_at &&
                      moment(item.completed_at).format("M/D/YYYY")}
                  </span>
                </div>
                <div className="edu_center">
                  <span className="university">
                    {isAdmin || isAdvisor ? (<>
                      <Link to={"/creatives/search/education-college/" + encodeSpecial(encodeURI(item.college))}>
                        {item.college}
                      </Link>
                    </>) : (<>
                      {item.college}
                    </>)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {education?.length > maxEducations && (
            <Link onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowAllEducations(state => !state);
              return false;
            }}>
              Show {showAllEducations ? "Less" : "More"} Educations
            </Link>
          )}
        </div>
      ) : (
        ""
      )}

      {/* Experience */}
      {experience?.length > 0 ? (
        <div className="content-section">
          <h1 className="content-title">Work & Experience</h1>
          <h6>Showing 1 - {experience.length <= maxExperiences || showAllExperiences ? experience.length : maxExperiences} of {experience.length}</h6>
          <div className="content-list">
            {experience.slice(0, (experience.length <= maxExperiences || showAllExperiences ? experience.length : maxExperiences)).map((item) => (
              <div className="content" key={item.id}>
                <div className="circle">{item.company?.charAt(0)}</div>

                <div className="top-info work_experience">
                  {/* <span className="edu_stats">{item.company}</span> */}

                  <span className="year">
                    {item.started_at && (
                      <>
                        {moment(item.started_at).format("M/D/YYYY")}
                        {item.completed_at && <span>-</span>}
                      </>
                    )}
                    {item.completed_at &&
                      moment(item.completed_at).format("M/D/YYYY")}
                  </span>
                </div>

                <div className="edu_center">
                  <span className="university">
                    {isAdmin || isAdvisor ? (<>
                      <Link to={"/creatives/search/experience-company/" + encodeSpecial(encodeURI(item.company))}>
                        {item.company}
                      </Link>
                    </>) : (<>
                      {item.company}
                    </>)}
                  </span>
                </div>
                <p className="mb0">{item.description}</p>
              </div>
            ))}
          </div>
          {experience?.length > maxExperiences && (
            <Link onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowAllExperiences(state => !state);
              return false;
            }}>
              Show {showAllExperiences ? "Less" : "More"} Experiences
            </Link>
          )}
        </div>
      ) : (
        ""
      )}
      {role && (role == "admin" || role == "advisor") ? (<RelatedCreatives data={data} />) : (<></>)}
      {user && data && <Reviews user={user} data={data} />}
    </>
  );
};

export default Content;
