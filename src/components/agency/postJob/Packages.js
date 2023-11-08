import Single from "../../../assets/images/Single-Job-2-300x300.png";
import Multiple from "../../../assets/images/Multiple-Jobs-2-300x300.png";
import Premium from "../../../assets/images/Premium-Job-1-300x300.png";
import Hire from "../../../assets/images/Hire-an-Advisor.jpeg";
import "../../../styles/AgencyDashboard/PackagesList.scss";
import { Link } from "react-router-dom";

const Packages = ({ setPackage, setJobStatus, user }) => {
  const packages = [
    {
      id: 1,
      title: "Post a Creative Job",
      price: 149,
      image: Single,
      subtitle: "Single Creative Job Package",
      description:
        "<ul><li>• One (1) Targeted Job Post</li><li>• Duration 30 Days</li><li>• Job Management Dashboard</li> </ul>",
      link:
        "https://buy.stripe.com/test_3cseVIbU60qg3aU28b?prefilled_email=" +
        user.email,
    },
    {
      id: 2,
      title: "Multiple Creative Jobs",
      price: 349,
      image: Multiple,
      subtitle: "Multiple Creative Jobs Package",
      description:
        "<ul><li>• Up to Three (3) Targeted Job Post</li><li>• Duration 45 Days</li><li>• Job Management Dashboard</li><li>• Urgent Opportunities Option</li> </ul>",
      link:
        "https://buy.stripe.com/test_7sI8xk6zM6OE4eY6ot?prefilled_email=" +
        user.email,
    },
    {
      id: 3,
      title: "Premium Creative Jobs",
      price: 649,
      image: Premium,
      subtitle: "Premium Creative Jobs Package",
      description:
        "<ul><li>• Up to Five (5) Targeted Job Post</li><li>• Duration 45 Days</li><li>• Job Management Dashboard</li><li>• Urgent Opportunities Option</li><li>• Featured Posting</li></ul>",
      link:
        "https://buy.stripe.com/test_00g00O2jwflafXG148?prefilled_email=" +
        user.email,
    },
    {
      id: 4,
      title: "Hire an Advisor",
      price: "Custom",
      image: Hire,
      subtitle: "",
      description: "",
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
