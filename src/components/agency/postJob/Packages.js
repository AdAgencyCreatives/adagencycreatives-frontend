import Single from "../../../assets/images/Single-Job-2-300x300.png";
import Multiple from "../../../assets/images/Multiple-Jobs-2-300x300.png";
import Premium from "../../../assets/images/Premium-Job-1-300x300.png";
import '../../../styles/AgencyDashboard/Packages.scss'

const Packages = ({setPackage}) => {
  const packages = [
    {
      title: "Post a Creative Job",
      price: 149,
      image: Single,
      subtitle: "Single Creative Job Package",
      description:
        "<ul><li>• One (1) Targeted Job Post</li><li>• Duration 30 Days</li><li>• Job Management Dashboard</li> </ul>",
    },
    {
        title: "Multiple Creative Jobs",
        price: 349,
        image: Multiple,
        subtitle: "Multiple Creative Jobs Package",
        description:
          "<ul><li>• One (1) Targeted Job Post</li><li>• Duration 30 Days</li><li>• Job Management Dashboard</li> </ul>",
      },
      {
        title: "Premium Creative Jobs",
        price: 699,
        image: Premium,
        subtitle: "Premium Creative Jobs Package",
        description:
          "<ul><li>• One (1) Targeted Job Post</li><li>• Duration 30 Days</li><li>• Job Management Dashboard</li> </ul>",
      },
  ];

  return (
    <>
      <h3 className="page-title">Packages</h3>
      <div className="page-content">
        <div className="row">
          {packages.map((item,index) => {
            return (
              <div className="col-4" key={index}>
                <div className="package-container">
                  <div className="title">{item.title}</div>
                  <div className="price">${item.price.toFixed(2)}</div>
                  <img className="image" src={item.image} />
                  <div className="subtitle">{item.subtitle}</div>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                  <button className="btn btn-secondary btn-hover-dark" onClick={() => setPackage(index)}>Get Started</button>
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
