import "../../styles/SingleMentor.scss";
import audaciousSchoolImg from "../../assets/images/screenshots/screenshot_24_https___schoolofastonishingpursuits_com_.png";
import deckOfBrillianceImg from "../../assets/images/screenshots/deckofbrilliance.png";
import theToolboxImg from "../../assets/images/screenshots/The Toolbox.png";
import loveTheWorkMoreImg from "../../assets/images/screenshots/screenshot_26_https___lovetheworkmore_com_.png";
import mtFreelanceImg from "../../assets/images/screenshots/mtfreelance.png";
import invisibleSoldiersImg from "../../assets/images/screenshots/screenshot_28_https___podcasts_apple_com_us_podcast_invisible_soldiers_id1678183748_.png";
import creativeMorningsImg from "../../assets/images/screenshots/screenshot_29_https___creativemornings_com_.png";
import talkToACreativeImg from "../../assets/images/screenshots/talktoadirector.png";
import confessionsOfCdImg from "../../assets/images/screenshots/screenshot_28_https___podcasts_apple_com_us_podcast_invisible_soldiers_id1678183748_.png";
import creativeBumImg from "../../assets/images/screenshots/screenshot_30_https___www_creativebum_com_.png";
import jessicaHischeImg from "../../assets/images/screenshots/Jessica Hische - Home.png";
import adhouseImg from "../../assets/images/screenshots/screenshot_17_https___www_adhousenyc_com_adhouseinhouse_.png";
import SingleMentorList from "../../components/SingleMentorList";

const Inspire = () => {
  const items = [
    {
      title: "AudaciousSChool",
      subtitle: "Of astonishing pursuits course",
      url: "https://schoolofastonishingpursuits.com",
      img: audaciousSchoolImg,
    },
    {
      title: "DECK OF BRILLIANCE",
      subtitle: "Idea generation tools",
      url: "https://deckofbrilliance.com",
      img: deckOfBrillianceImg,
    },
    {
      title: "THE TOOLBOX",
      subtitle: "Helpful reources for creatives",
      url: "https://toolbox.super.site",
      img: theToolboxImg,
    },
    {
      title: "LOVE THE Work MorE",
      subtitle: "Cannes Lion’s winning work",
      url: "https://lovetheworkmore.com",
      img: loveTheWorkMoreImg,
    },
    {
      title: "MT Freelance",
      subtitle: "Freelancers guidance",
      url: "https://www.mtfreelance.com",
      img: mtFreelanceImg,
    },
    {
      title: "INVISIBLE SOLIDErS",
      subtitle: "Explores blacks in advertising",
      url: "https://podcasts.apple.com/us/podcast/invisible-soldiers/id1678183748",
      img: invisibleSoldiersImg,
    },
    {
      title: "CREATIVE MORNINGS",
      subtitle: "Bringing creatives together",
      url: "https://creativemornings.com",
      img: creativeMorningsImg,
    },
    {
      title: "TALK TO A CREATIVE",
      subtitle: "Director or recruiter or strategist",
      url: "https://talktoacreativedirector.com",
      img: talkToACreativeImg,
    },
    {
      title: "Confessions of a CD ",
      subtitle: "The stories behind the ideas",
      url: "https://podcasts.apple.com/us/podcast/confessions-of-a-creative-director/id1515257258",
      img: confessionsOfCdImg,
    },
    {
      title: "CREATIVE BUM",
      subtitle: "Creative advice and inspiration",
      url: "https://www.creativebum.com",
      img: creativeBumImg,
    },
    {
      title: "Jessica Hische",
      subtitle: "Helpful Things",
      url: "https://www.jessicahische.is/heretohelp",
      img: jessicaHischeImg,
    },
    {
      title: "ADHOUSE/ INHOUSE",
      subtitle: "8 week paid mentorship program",
      url: "https://www.adhousenyc.com/adhouseinhouse",
      img: adhouseImg,
    },
  ];

  return (
    <div className="dark-container page-single-mentor text-white mb-0 mt-4">
      <div className="container-fluid">
        <div className="mentor-wrapper">
          <h2 className="title">Inspire</h2>
          <p className="subtitle">
            WELCOME TO <strong>INSPIRE</strong>. HERE YOU WILL FIND
            <strong>TALENTED CREATIVES</strong> THAT ARE
            <strong>DEDICATED TO MENTORING.</strong>
          </p>
          <SingleMentorList items={items} />

        </div>
      </div>
    </div>
  );
};

export default Inspire;
