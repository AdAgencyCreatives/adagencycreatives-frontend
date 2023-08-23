import Design from "../assets/images/Design.png";
import "../styles/MentorResources.css";

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
    <div className="dark-container page-mentors mb-0 mt-4">
      <div className="container p-md-0 px-5">
        <h1 className="page-title">Mentor Resources</h1>
        <p className="page-subtitle">
          Dedicated to the creatives out there giving back to our industry.<br />
          Click on a topic below.
        </p>
        <div className="row g-5 mt-3">
          {mentors.map((item, index) => {
            return (
              <div className="col-sm-6" key={`m_${index}`}>
                <div
                  className={
                    "mentor justify-content-center" +
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
