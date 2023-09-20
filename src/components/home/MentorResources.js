import portfolio from "../../assets/images/portfolio.jpg";
import business from "../../assets/images/business.jpg";
import tech from "../../assets/images/tech.jpg";
import copy from "../../assets/images/copy.jpg";
import inspire from "../../assets/images/inspire.jpg";
import art from "../../assets/images/art.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const MentorResources = () => {
  const mentors = [
    {
      image: portfolio,
      url: "#",
    },
    {
      image: business,
      url: "#",
    },
    {
      image: tech,
      url: "#",
    },
    {
      image: copy,
      url: "#",
    },
    {
      image: inspire,
      url: "#",
    },
    {
      image: art,
      url: "#",
    }
  ];
  
  return (
    <div id="mentors">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Mentor Resources</h1>
        <div className="browseAll">
          browse all <MdKeyboardDoubleArrowRight />
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
