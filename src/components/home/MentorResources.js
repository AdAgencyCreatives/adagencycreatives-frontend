import Design from "../../assets/images/Design.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const MentorResources = () => {
  const mentors = [
    {
      image: Design,
      url: "#",
    },
    {
      image: Design,
      url: "#",
    },
    {
      image: Design,
      url: "#",
    },
    {
      image: Design,
      url: "#",
    },
    {
      image: Design,
      url: "#",
    },
  ];
  return (
    <>
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
    </>
  );
};

export default MentorResources;
