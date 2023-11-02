import moment from "moment";
import portfolio from "../../../assets/images/portfolio.png";
import "../../../styles/User/ProfileContent.scss";
import Reviews from "../Reviews";

const Content = ({ user, data, education, experience }) => {
  return (
    <>
      <div className="content-section">
        <h1 className="content-title">Portfolio Site</h1>
        <a href="https://www.williambroussard.com/" target="_blank">
          <img src={portfolio} />
        </a>
      </div>
      {/* Education */}
      {education.length > 0 ? (
        <div className="content-section">
          <h1 className="content-title">Education</h1>
          <div className="content-list">
            {education.map((item) => (
              <div class="content">
                <div class="circle">{item.degree.charAt(0)}</div>
                <div class="top-info">
                  <span class="edu_stats">{item.degree}</span>
                  <span class="year">
                    {item.completed_at &&
                      moment(item.completed_at).format("M/D/YYYY")}
                  </span>
                </div>
                <div class="edu_center">
                  <span class="university">{item.college}</span>
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
              <div class="content">
                <div class="circle">{item.company.charAt(0)}</div>
                <div class="top-info">
                  {/* <span class="edu_stats">{item.company}</span> */}

                  <span class="year">
                    {item.started_at &&
                      moment(item.started_at).format("M/D/YYYY")}
                    -
                    {item.completed_at &&
                      moment(item.completed_at).format("M/D/YYYY")}
                  </span>
                </div>
                <div class="edu_center">
                  <span class="university">{item.company}</span>
                </div>
                <p class="mb0">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {user && data && (
        <Reviews user={user} data={data} />
      )}
    </>
  );
};

export default Content;
