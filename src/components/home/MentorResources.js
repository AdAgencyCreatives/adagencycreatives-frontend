import portfolio from "../../assets/images/portfolio.jpg";
import business from "../../assets/images/business.jpg";
import tech from "../../assets/images/tech.jpg";
import copy from "../../assets/images/copy.jpg";
import inspire from "../../assets/images/inspire.jpg";
import art from "../../assets/images/art.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const MentorResources = () => {
  const mentors = [
    {
      image: copy,
      url: "/copywriting-mentors",
    },
    {
      image: art,
      url: "/art-mentors",
    },
    {
      image: portfolio,
      url: "/portfolio-mentors",
    },
    {
      image: inspire,
      url: "/inspire-mentors",
    },
    {
      image: business,
      url: "/business-mentors",
    },
    {
      image: tech,
      url: "/tech-mentors",
    },
  ];

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
        {mentors.map((item, index) => {
          return (
            <div className="mentor" key={`m_${index}`}>
              <a href={item.url}>
                <img src={item.image} height={150} width={150} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorResources;
