import AgencySpy from "../assets/images/AgencySpy.png";
import "../styles/Publications.css";

const Publications = () => {
  const publications = [
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
  ];

  return (
    <div className="dark-container page-mentors mb-0 mt-4">
      <div className="container p-md-0 px-5">
        <h1 className="page-title">Publication Resources</h1>
        <p className="page-subtitle">
          Get in the know through the advertising industry trades.
        </p>
        <div className="row g-5 mt-3">
          {publications.map((item, index) => {
            return (
              <div className="col-md-6" key={"pub-"+index}>
                <div className={
                    "text-center" +
                    ((index + 1) % 2
                      ? " text-md-end"
                      : " text-md-start")
                  }>
                  <a href={item.url}>
                    <img
                      src={item.image}
                      className="publication-image"
                      width={300}
                      height={300}
                    />
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

export default Publications;
