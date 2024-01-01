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
    getMentorTopics('', 6);
  }, []);

  useEffect(() => {
    console.log(mentors);
  }, [mentors]);

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
