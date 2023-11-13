import "../../styles/SingleMentor.scss";
import eyeCandyImg from "../../assets/images/screenshots/screenshot_1_https___eycndy_co_.png";
import aigaEyeOnDesignImg from "../../assets/images/screenshots/screenshot_2_https___eyeondesign_aiga_org.png";
import shaunsUsefulDirectoryImg from "../../assets/images/screenshots/Shaun’s Very Useful Directory of Creative Things.png";
import unsplashImg from "../../assets/images/screenshots/screenshot_4_https___unsplash_com__ref_buffer_com_.png";
import deckOfBrillianceImg from "../../assets/images/screenshots/deckofbrilliance.png";
import talkToACreativeDirectorImg from "../../assets/images/screenshots/talktoadirector.png";
import behanceImg from "../../assets/images/screenshots/screenshot_7_https___www_behance_net_galleries_.png";
import dribbleImg from "../../assets/images/screenshots/screenshot_8_https___dribbble_com_learn_.png";
import jessicaHischeImg from "../../assets/images/screenshots/Jessica Hische - Home.png";
import ogilvyImg from "../../assets/images/screenshots/screenshot_10_https___www_underconsideration_com_artofthemenu__.png";
import adweekImg from "../../assets/images/screenshots/screenshot_11_https___brandingstyleguides_com_.png";
import SingleMentorList from "../../components/SingleMentorList";

const Art = () => {
  const items = [
    {
      title: "EYE CANDY",
      subtitle: "visual techniques library ",
      url: "https://eycndy.co",
      img: eyeCandyImg,
    },
    {
      title: "AIGA EYE ON DESIGN",
      subtitle: "Explores the modern designer",
      url: "https://eyeondesign.aiga.org",
      img: aigaEyeOnDesignImg,
    },
    {
      title: "Shaun’s Very Useful",
      subtitle: "Directory of creative things ",
      url: "https://bruciemane.notion.site/Shaun-s-Very-Useful-Directory-of-Creative-Things-9b72122139ef46c58313a90b0c519505",
      img: shaunsUsefulDirectoryImg,
    },
    {
      title: "Unsplash",
      subtitle: "Royalty free images",
      url: "https://unsplash.com/?ref=buffer.com",
      img: unsplashImg,
    },
    {
      title: "DECK OF BRILLIANCE",
      subtitle: "Idea generation tools",
      url: "https://deckofbrilliance.com",
      img: deckOfBrillianceImg,
    },
    {
      title: "TALK TO A CREATIVE ",
      subtitle: "Director or recruiter or strategist",
      url: "https://talktoacreativedirector.com",
      img: talkToACreativeDirectorImg,
    },
    {
      title: "BEHANCE",
      subtitle: "Showcase creative work ",
      url: "https://www.behance.net/galleries",
      img: behanceImg,
    },
    {
      title: "DRIBBLE",
      subtitle: "Creative workshop",
      url: "https://dribbble.com/learn",
      img: dribbleImg,
    },
    {
      title: "JESSICA HISCHE",
      subtitle: "Helpful things for designers ",
      url: "https://www.jessicahische.is/heretohelp",
      img: jessicaHischeImg,
    },
    {
      title: "ART OF THE MENU",
      subtitle: "Great menu designs",
      url: "https://www.underconsideration.com/artofthemenu/",
      img: ogilvyImg,
    },
    {
      title: "BRANDING STYLE GUIDES",
      subtitle: "Design resource",
      url: "https://brandingstyleguides.com",
      img: adweekImg,
    },
    {
      title: "Suggestions",
      subtitle: "Did we miss something? Please let us know.",
      url: "../contact",
    },
  ];

  return (
    <div className="dark-container page-single-mentor text-white mb-0 mt-4">
      <div className="container-fluid">
        <div className="mentor-wrapper">
          <h2 className="title">Art</h2>
          <p className="subtitle">
            WELCOME TO <strong>ART</strong>. HERE YOU WILL FIND
            <strong>INSPIRATIONAL RESOURCES</strong> YOU KNOW AND SOME YOU
            DON’T.
          </p>
          <SingleMentorList items={items} />
        </div>
      </div>
    </div>
  );
};

export default Art;
