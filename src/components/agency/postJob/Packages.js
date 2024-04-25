import Single from "../../../assets/images/Single-Job-hd.jpg";
import Multiple from "../../../assets/images/Multiple-Jobs-hd.jpg";
import Premium from "../../../assets/images/Premium-Job-hd.jpg";
import Hire from "../../../assets/images/Hire-an-Advisor-hd.jpg";
import "../../../styles/AgencyDashboard/PackagesList.scss";
import { Link } from "react-router-dom";

const Packages = ({ setPackage, setJobStatus, user }) => {
  const packages = [
    {
      id: 1,
      title: "Single Creative Job",
      price: 149,
      image: Single,
      subtitle: "Single Creative Job Package",
      description:
        "<ul>" +
        " <li>One Job Post For 30 Days</li>" +
        " <li>Targets Advertising Talent</li>" +
        " <li>Internal ATS Option</li>" +
        " <li>Private Messaging Access</li>" +
        " <li>Additional Search Features</li>" +
        " <li>Pipeline Capabilities</li>" +
        "</ul>",
      link:
        process.env.REACT_APP_POST_A_CREATIVE_JOB +
        user.email,
    },
    {
      id: 2,
      title: "Multiple Creative Jobs",
      price: 349,
      image: Multiple,
      subtitle: "Multiple Creative Jobs Package",
      description:
        "<ul>" +
        " <li>Three Job Posts For 45 Days</li>" +
        " <li>Urgent Job Post Option</li>" +
        " <li>Targets Advertising Talent</li>" +
        " <li>Internal ATS Option</li>" +
        " <li>Private Messaging Access</li>" +
        " <li>Additional Search Features</li>" +
        " <li>Pipeline Capabilities</li>" +
        "</ul>",
      link:
        process.env.REACT_APP_MULTIPLE_CREATIVE_JOBS +
        user.email,
    },
    {
      id: 3,
      title: "Premium Creative Jobs",
      price: 649,
      image: Premium,
      subtitle: "Premium Creative Jobs Package",
      description:
        "<ul>" +
        " <li>Five Job Posts For 60 Days</li>" +
        " <li>Featured Post Priority</li>" +
        " <li>Urgent Job Post Option</li>" +
        " <li>Targets Advertising Talent</li>" +
        " <li>Internal ATS Option</li>" +
        " <li>Private Messaging Access</li>" +
        " <li>Additional Search Features</li>" +
        " <li>Pipeline Capabilities</li>" +
        "</ul>",
      link:
        process.env.REACT_APP_PREMIUM_CREATIVE_JOBS +
        user.email,
    },
    {
      id: 4,
      title: "Hire an Advisor",
      price: "Custom",
      image: Hire,
      subtitle: "Hire An Advisor",
      description: "<ul>" +
        "<li>Creative Recruiting Help</li>" +
        "<li>Provide Details To Get Started</li>" +
        "<li>Our Team Will Contact You</li>" +
        "<li>We’ll Create A Custom Plan </li>" +
        "<li>You Hire Talent Directly </li>" +
        "</ul>",
      link: "/hire-an-advisor",
    },
  ];

  return (
    <>
      <h3 className="page-title">Packages</h3>
      <div className="page-content">
        <div className="row">
          {packages.map((item, index) => {
            return (
              <div className="col-md-3" key={index}>
                <div className="package-container">
                  <div className="title">{item.title}</div>
                  <div className="price">
                    {typeof item.price == "number"
                      ? "$" + item.price.toFixed(2)
                      : item.price}
                  </div>
                  <img className="image" src={item.image} />
                  <div className="subtitle">{item.subtitle}</div>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                  <Link
                    /* onClick={() => {
                      setPackage(item.id);
                      setJobStatus("create");
                    }} */
                    to={item.link}
                  >
                    <button className="btn btn-secondary btn-hover-dark">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Packages;
