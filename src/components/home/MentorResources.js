import portfolio from "../../assets/images/portfolio.jpg";
import business from "../../assets/images/business.jpg";
import tech from "../../assets/images/tech.jpg";
import copy from "../../assets/images/copy.jpg";
import inspire from "../../assets/images/inspire.jpg";
import AdAgency from "../../assets/images/AdAgency.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { Context } from "../../context/DataContext";
import { useContext, useEffect } from "react";

const MentorResources = () => {
  const { 
    state:{ mentors },
    getMentorTopics
  } = useContext(Context);

  useEffect(() => {
    getMentorTopics('');
  }, []);

  // const mentors2 = [
  //   {
  //     image: copy,
  //     url: "/copywriting-mentors",
  //   },
  //   {
  //     image: art,
  //     url: "/art-mentors",
  //   },
  //   {
  //     image: portfolio,
  //     url: "/portfolio-mentors",
  //   },
  //   {
  //     image: inspire,
  //     url: "/inspire-mentors",
  //   },
  //   {
  //     image: business,
  //     url: "/business-mentors",
  //   },
  //   {
  //     image: tech,
  //     url: "/tech-mentors",
  //   },
  // ];

  return (
    <div id="mentors">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Mentor Resources</h1>
        <div>
          <Link className="browseAll" to="mentoring-resources">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>

      <div className="sectionContent mentors-section">
        {/* {mentors2.map((item, index) => {
          return (
            <div className="mentor" key={`m_${index}`}>
              <a href={item.slug}>
                <h3></h3>
                <img src={item.image} height={150} width={150} />
              </a>
            </div>
          );
        })} */}
        {mentors.map((item, index) => {
          return (
            <div className="mentor" key={`m_${index}`}>
              <img src={AdAgency} height={150} width={150} />
              <a href={`mentoring-resources/${item.slug}`}>
                {item.title}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorResources;
