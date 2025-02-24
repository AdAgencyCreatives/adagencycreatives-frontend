import moment from "moment";
import noPreview from "../../../assets/images/s-no-preview.png";
import "../../../styles/User/ProfileContent.scss";
import Reviews from "../Reviews";
import RelatedCreatives from "./RelatedCreatives";
import Portfolio from "./Portfolio";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { useContext, useEffect, useRef, useState } from "react";
import useHelper from "../../../hooks/useHelper";
import Placeholder from "../../../assets/images/placeholder.png";
import CircularProgressWithLabel from "../../CircularProgressWithLabel";

const Content = ({ user, role, data, education, experience }) => {

  const { rectify_url, encodeSpecial, decodeSpecial } = useHelper();
  const [isLoading, setIsLoading] = useState(false);
  const refreshWait = 60; // seconds
  const refreshApi = 15; // seconds
  const countDownRef = useRef(refreshWait);
  const [countDown, setCountDown] = useState(refreshWait);
  const [refreshProgress, setRefreshProgress] = useState(0);
  const [refreshStatus, setRefreshStatus] = useState('pending');
  const [refreshStatusVisible, setRefreshStatusVisible] = useState(false);
  const [websitePreview, setWebsitePreview] = useState(data.portfolio_website);

  const maxEducations = 4;
  const [showAllEducations, setShowAllEducations] = useState(false);

  const maxExperiences = 8;
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const {
    state: { subscription_status },
  } = useContext(AuthContext);

  const {
    capturePortfolioSnapshot, removePortfolioCaptureLog,
  } = useContext(CreativesContext);

  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";

  const isCreative = user?.role == "creative";
  const isOwnProfile = isCreative && user?.uuid == data.user_id;
  const portfolio_link = rectify_url(data.links?.find((item) => item.type = "portfolio")?.url) ?? "#";

  useEffect(() => {
    if (countDownRef?.current) {
      countDownRef.current = countDown;
      setRefreshProgress(100 - (100 * countDownRef.current / refreshWait));

      if (countDownRef.current % refreshApi == 0) {
        (async () => {
          let result = await capturePortfolioSnapshot(data.user_id, refreshWait);
          if (result) {
            let status = result?.data?.status || '';
            if (status == 'success' || status == 'failed') {
              setCountDown(0);
              setRefreshStatus(status);
              console.log();
            }

            if (status == 'success' && refreshStatusVisible) {
              setWebsitePreview(result.data.capture);
              console.log(result.data.capture);
              // window.setTimeout(() => {
              //   window.location.reload();
              // }, 3000);
            }
          }
        })();
      }
      // console.log("Count Down: " + countDownRef.current);
      // console.log("Progress: " + (100 - (100 * countDownRef.current / refreshWait)));
    }
  }, [countDown]);

  const handleRefreshProgress = (e) => {
    e.preventDefault();
    e.stopPropagation();

    (async () => {
      let result = await removePortfolioCaptureLog(data.user_id);
      if (result) {
        setWebsitePreview("");
      }
    })();

    setCountDown(refreshWait);
    countDownRef.current = refreshWait;
    setRefreshStatus("pending");
    setRefreshStatusVisible(true);
    setIsLoading(true);
    console.log();
    getProgress();
    return false;
  };

  const getProgress = () => {
    window.setTimeout(() => {
      if (countDownRef.current > 0) {
        setCountDown(countDownRef.current - 1);
        getProgress();
      } else {
        setIsLoading(false);
        // window.setTimeout(() => {
        //   setRefreshStatusVisible(false);
        // }, 10000);
      }
    }, 1000);
  };
  return (
    <>
      <div className="content-section">
        <h1 className="content-title">Portfolio Site</h1>
        {isAdmin && (
          <div className="refresh-preview-container">
            <Link
              className={"btn btn-gold refresh-preview" + (isLoading ? " disabled" : "")}
              onClick={(e) => handleRefreshProgress(e)}
            >
              {isLoading ? "Please wait ..." : "Refresh Preview"}
            </Link>
            {isLoading && <CircularProgressWithLabel value={refreshProgress} />}
            {refreshStatusVisible && (
              <span
                className={
                  "badge " +
                  refreshStatus +
                  " bg-" +
                  (refreshStatus == "pending"
                    ? "info"
                    : refreshStatus == "success"
                      ? "success"
                      : refreshStatus == "failed"
                        ? "danger"
                        : "primary")
                }
              >{refreshStatus}</span>
            )}
          </div>
        )}
        <a href={portfolio_link} target="_blank">
          <img
            src={websitePreview || noPreview}
            className={!websitePreview && 'no-preivew'}
            onError={(e) => {
              e.target.src = noPreview; // Set the backup image source
            }} />
        </a>
      </div>
      {/* Education */}
      {(isOwnProfile ? true : education?.length > 0) && (
        <div className="content-section">
          <h1 className="content-title">Education</h1>
          {education?.length > 0 && (<>
            <h6>Showing 1 - {education.length <= maxEducations || showAllEducations ? education.length : maxEducations} of {education.length}</h6>
            <div className="content-list">
              {education.slice(0, (education.length <= maxEducations || showAllEducations ? education.length : maxEducations)).map((item) => (
                <div className="content" key={item.id}>
                  <div className="circle"></div>
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
          </>)}
        </div>
      )}

      {/* Experience */}
      {(isOwnProfile ? true : experience?.length > 0) && (
        <div className="content-section">
          <h1 className="content-title">Work & Experience</h1>
          {experience?.length > 0 && (<>
            <h6>Showing 1 - {experience.length <= maxExperiences || showAllExperiences ? experience.length : maxExperiences} of {experience.length}</h6>
            <div className="content-list">
              {experience.slice(0, (experience.length <= maxExperiences || showAllExperiences ? experience.length : maxExperiences)).map((item) => (
                <div className="content" key={item.id}>
                  <div className="circle"></div>

                  <div className="top-info work_experience">
                    <span className="edu_stats">{item?.title}</span>
                    <span className="year">
                      {item?.started_at && moment(item.started_at).format("M/D/YYYY")}
                      {(item?.started_at && item?.completed_at) && <span>–</span>}
                      {item?.completed_at && moment(item.completed_at).format("M/D/YYYY")}
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
                  <div className="mb0" dangerouslySetInnerHTML={{ __html: item.description }}></div>
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
          </>)}
        </div>
      )}
      {(user && data) && <Reviews user={user} data={data} />}
      {(role && (role == "admin" || (role == "advisor" && subscription_status == 'active')) && data) && (<RelatedCreatives data={data} />)}
    </>
  );
};

export default Content;
