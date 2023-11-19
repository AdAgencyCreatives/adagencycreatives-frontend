import "../styles/Publications.css";
import aaa from "../assets/images/publications/AAA.png";
import adage from "../assets/images/publications/adage.png";
import adsworld from "../assets/images/publications/adsworld.png";
import adweek from "../assets/images/publications/adweek.png";
import adweekagency from "../assets/images/publications/adweekagency.png";
import aiga from "../assets/images/publications/aiga.png";
import ca from "../assets/images/publications/ca.png";
import campaign from "../assets/images/publications/campaign.png";
import howdesign from "../assets/images/publications/howdesign.png";
import littleblack from "../assets/images/publications/littleblack.png";
import muse from "../assets/images/publications/muse.png";
import thedrum from "../assets/images/publications/thedrum.png";

const Publications = () => {
  const publications = [
    {
      image: aaa,
      url: "https://www.aaaa.org/",
    },
    {
      image: adweek,
      url: "https://www.adweek.com/",
    },
    {
      image: adsworld,
      url: "https://www.adsoftheworld.com",
    },
    {
      image: howdesign,
      url: "https://howdesignlive.com",
    },
    {
      image: adage,
      url: "https://adage.com",
    },
    {
      image: aiga,
      url: "https://www.aiga.org",
    },
    {
      image: ca,
      url: "https://www.commarts.com",
    },
    {
      image: muse,
      url: "https://musebycl.io",
    },
    {
      image: littleblack,
      url: "https://www.lbbonline.com",
    },
    {
      image: adweekagency,
      url: "https://www.adweek.com/agencyspy/",
    },
    {
      image: campaign,
      url: "https://www.campaignlive.com",
    },
    {
      image: thedrum,
      url: "https://www.thedrum.com",
    },
  ];

  return (
    <div className="dark-container page-mentors mb-0 mt-4">
      <div className="container p-md-0 px-5">
        <h1 className="page-title">Publication Resources</h1>
        <p className="page-subtitle">
          Get in the know through the advertising industry trades.
        </p>
        <div className="row gy-md-1 gy-5 mt-3">
          {publications.map((item, index) => {
            return (
              <div className="col-md-4 col-sm-6 publication-container" key={"pub-"+index}>
                <div className={
                    "text-center" +
                    ((index + 1) % 2
                      ? " text-md-end"
                      : " text-md-start")
                  }>
                  <a href={item.url} target="_blank">
                    <img
                      src={item.image}
                      className="publication-image"
                      // width={150}
                      // height={150}
                      alt=""
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
