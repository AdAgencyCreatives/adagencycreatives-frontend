import "../styles/MentorResources.scss";
import portfolio from "../assets/images/portfolio.jpg";
import business from "../assets/images/business.jpg";
import tech from "../assets/images/tech.jpg";
import copy from "../assets/images/copy.jpg";
import inspire from "../assets/images/inspire.jpg";
import art from "../assets/images/art.jpg";
import { Link } from "react-router-dom";
import AdAgency from "../assets/images/AdAgency.png";
import { Context } from "../context/DataContext";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleMentorList from "../components/SingleMentorList";

const MentorResources = () => {
  const { slug } = useParams();

  const { 
    state:{ mentors, resources },
    getMentorTopics,
    getMentorResources
  } = useContext(Context);

  useEffect(() => {
    getMentorTopics(slug ?? '');
    if (slug) {
      getMentorResources(slug);
    }
  }, []);

  return (
    <>
      {slug ? (
        <div className="dark-container page-single-mentor text-white mb-0 mt-4">
          <div className="container-fluid">
            <div className="mentor-wrapper">
              <h2 className="title">{mentors[0]?.title}</h2>
              <p className="subtitle">
                {mentors[0]?.description}
              </p>
              <SingleMentorList items={resources} />
            </div>
          </div>
        </div>
      ) : (
        <div className="dark-container page-mentors mb-0 mt-4">
          <div className="container-fluid">
            <h1 className="page-title">Mentor Resources</h1>
            <p className="page-subtitle">
              Dedicated to the creatives out there giving back to our industry.
              <br />
              Click on a topic below.
            </p>
            <div className="row gy-5 mt-3">
              {mentors.map((item, index) => {
                return (
                  <div className="col-sm-4">
                    <div className="mentor" key={`m_${index}`}>
                      <a href={`mentoring-resources/${item.slug}`}>{item.title}</a>
                      <img src={AdAgency} height={150} width={150} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorResources;
