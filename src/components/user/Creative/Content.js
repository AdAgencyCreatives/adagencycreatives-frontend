import moment from "moment";
import portfolio from "../../../assets/images/portfolio.png";
import "../../../styles/User/ProfileContent.scss";
import Reviews from "../Reviews";
import RelatedCreatives from "./RelatedCreatives";
import Portfolio from "./Portfolio";

const Content = ({ user, data, education, experience }) => {
  const isCreative = user?.role == "creative";
  const isOwnProfile = isCreative && user?.uuid == data.user_id;

  return (
    <>
      <div className="content-section">
        <h1 className="content-title">Portfolio Site</h1>
        <a href="https://www.williambroussard.com/" target="_blank">
          <img src={data.portfolio_website || portfolio} />
        </a>
      </div>
      {/* Education */}
      {education.length > 0 ? (
        <div className="content-section">
          <h1 className="content-title">Education</h1>
          <div className="content-list">
            {education.map((item) => (
              <div className="content" key={item.id}>
                <div className="circle">{item.degree.charAt(0)}</div>
                <div className="top-info">
                  <span className="edu_stats">{item.degree}</span>
                  <span className="year">
                    {item.completed_at &&
                      moment(item.completed_at).format("M/D/YYYY")}
                  </span>
                </div>
                <div className="edu_center">
                  <span className="university">{item.college}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Experience */}
      {experience.length > 0 ? (
        <div className="content-section">
          <h1 className="content-title">Work & Experience</h1>
          <div className="content-list">
            {experience.map((item) => (
              <div className="content" key={item.id}>
                <div className="circle">{item.company.charAt(0)}</div>
                <div className="top-info">
                  {/* <span className="edu_stats">{item.company}</span> */}

                  <span className="year">
                    {item.started_at &&
                      moment(item.started_at).format("M/D/YYYY")}
                    -
                    {item.completed_at &&
                      moment(item.completed_at).format("M/D/YYYY")}
                  </span>
                </div>
                <div className="edu_center">
                  <span className="university">{item.company}</span>
                </div>
                <p className="mb0">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {user && data && !isOwnProfile && <Reviews user={user} data={data} />}
      <RelatedCreatives data={data} />
    </>
  );
};

export default Content;
