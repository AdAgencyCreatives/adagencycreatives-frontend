import aaa from "../../assets/images/publications/AAA.png";
import adage from "../../assets/images/publications/adage.png";
import adsworld from "../../assets/images/publications/adsworld.png";
import adweek from "../../assets/images/publications/adweek.png";
import adweekagency from "../../assets/images/publications/adweekagency.png";
import aiga from "../../assets/images/publications/aiga.png";
import ca from "../../assets/images/publications/ca.png";
import campaign from "../../assets/images/publications/campaign.png";
import howdesign from "../../assets/images/publications/howdesign.png";
import littleblack from "../../assets/images/publications/littleblack.png";
import muse from "../../assets/images/publications/muse.png";
import thedrum from "../../assets/images/publications/thedrum.png";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const PublicationResources = () => {
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
    <div id="publications">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Publication Resources</h1>
      </div>
      {/* Slides */}
      <div className="sectionContent publication-section">
        <div className="container">
          <div className="row gy-md-1 gy-5 align-items-center">
            {publications.map((item, index) => {
              return (
                <div className="col-md-4 col-sm-6" key={`pb${index}`}>
                  <div className="publications-slider">
                    <a href={item.url} target="_blank">
                      <img
                        src={item.image}
                        className="publication-image"
                        width={100}
                        height={100}
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationResources;
