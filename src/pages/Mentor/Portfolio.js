import "../../styles/SingleMentor.scss";
import dandad from "../../assets/images/screenshots/dandad.png";
import oneschoolus from "../../assets/images/screenshots/screenshot_13_https___oneschoolus_com_.png";
import book180 from "../../assets/images/screenshots/screenshot_14_https___www_book180_com_.png";
import miamiadschool from "../../assets/images/screenshots/screenshot_15_https___miamiadschool_com_.png";
import amazonbook from "../../assets/images/screenshots/screenshot_16_https___www_amazon_com_How_Your_Book_Together_Advertising_dp_1887229132_.png";
import adhousenyc from "../../assets/images/screenshots/screenshot_17_https___www_adhousenyc_com_adhouseinhouse_.png";
import itstws from "../../assets/images/screenshots/screenshot_18_https___itstws_com__.png";
import brandcentervcu from "../../assets/images/screenshots/screenshot_19_https___brandcenter_vcu_edu_.png";
import usefulschool from "../../assets/images/screenshots/usefulschool.png";
import adobeportfolio from "../../assets/images/screenshots/screenshot_21_https___portfolio_adobe_com_.png";
import behance from "../../assets/images/screenshots/screenshot_22_https___www_behance_net_.png";
import pimpmyportfolio from "../../assets/images/screenshots/screenshot_23_https___www_pimpmyportfolio_us_.png";
import SingleMentorList from "../../components/SingleMentorList";

const Portfolio = () => {
  const items = [
    {
      title: "D&AD SHIFT",
      subtitle: "Nightschool for self-taught talent",
      url: "https://www.dandad.org/en/d-ad-new-blood-shift-london/",
      img: dandad,
    },
    {
      title: "ONE SCHOOL",
      subtitle: "Portfolio school for black creatives",
      url: "https://oneschoolus.com",
      img: oneschoolus,
    },
    {
      title: "BOOK180",
      subtitle: "6 month online portfolio program",
      url: "https://www.book180.com",
      img: book180,
    },
    {
      title: "THE USEFUL SCHOOL",
      subtitle: "Practial classes for POC",
      url: "https://usefulschool.com",
      img: usefulschool,
    },
    {
      title: "HOW TO PUT YOUR BOOK TOGETHER",
      subtitle: "and get a job in advertising",
      url: "https://www.amazon.com/How-Your-Book-Together-Advertising/dp/1887229132",
      img: amazonbook,
    },
    {
      title: "ADHOUSE/ INHOUSE",
      subtitle: "8 week paid mentorship program",
      url: "https://www.adhousenyc.com/adhouseinhouse",
      img: adhousenyc,
    },
    {
      title: "THE WORKSHOP",
      subtitle: "100% free fully remote mentorship",
      url: "https://itstws.com/",
      img: itstws,
    },
    {
      title: "BRANDCENTER VCU",
      subtitle: "Creative master’s program",
      url: "https://brandcenter.vcu.edu",
      img: brandcentervcu,
    },
    {
      title: "MIAMI AD SCHOOL",
      subtitle: "• Atlanta • Miami • New York ",
      url: "https://miamiadschool.com",
      img: miamiadschool,
    },
    {
      title: "ADOBE PORTFOLIO",
      subtitle: "Build a beautiful website",
      url: "https://portfolio.adobe.com",
      img: adobeportfolio,
    },
    {
      title: "BEHANCE",
      subtitle: "Showcase your work ",
      url: "https://www.behance.net",
      img: behance,
    },
    {
      title: "PIMP MY PORTFOLIO ",
      subtitle: "It’s pretty clear",
      url: "https://www.pimpmyportfolio.us",
      img: pimpmyportfolio,
    },
  ];


  return (
    <div className="dark-container page-single-mentor text-white mb-0 mt-4">
      <div className="container-fluid">
        <div className="mentor-wrapper">
          <h2 className="title">Portfolio</h2>
          <p className="subtitle">
            WELCOME TO <strong>PORTFOLIO</strong>. HERE YOU WILL FIND{" "}
            <strong>RESOURCES </strong>AND<strong> SAMPLES </strong>TO HELP YOU{" "}
            <strong>BUILD YOUR BEST BRAND</strong>, YOU.
          </p>
          <SingleMentorList items={items} />

        </div>
      </div>
    </div>
  );
};

export default Portfolio;
