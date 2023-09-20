import "../styles/MentorResources.scss";
import portfolio from "../assets/images/portfolio.jpg";
import business from "../assets/images/business.jpg";
import tech from "../assets/images/tech.jpg";
import copy from "../assets/images/copy.jpg";
import inspire from "../assets/images/inspire.jpg";
import art from "../assets/images/art.jpg";

const MentorResources = () => {
  const mentors = [
    {
      image: copy,
      url: "#",
    },
    {
      image: art,
      url: "#",
    },
    {
      image: portfolio,
      url: "#",
    },
    {
      image: inspire,
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
  ];

  return (
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
              <div className="col-sm-4" key={`m_${index}`}>
                <div
                  className={
                    "mentor justify-content-center text-center" +
                    ((index + 1) % 2
                      ? " justify-content-sm-end"
                      : " justify-content-sm-start")
                  }
                >
                  <a href={item.url}>
                    <img src={item.image} height={150} width={150} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorResources;
