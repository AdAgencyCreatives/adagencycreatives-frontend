import "../../styles/SingleMentor.scss";
import availListImg from "../../assets/images/screenshots/The Avail List.png";
import jessicaHischeImg from "../../assets/images/screenshots/Jessica Hische - Home.png";
import badPodcastImg from "../../assets/images/screenshots/screenshot_33_https___thebadpod_buzzsprout_com_.png";
import agencySearchToolImg from "../../assets/images/screenshots/screenshot_34_https___www_aaaa_org_home_page_agency_search__.png";
import mtFreelanceImg from "../../assets/images/screenshots/mtfreelance.png";
import creativeMorningsImg from "../../assets/images/screenshots/screenshot_29_https___creativemornings_com_.png";
import talkToCreativeDirectorImg from "../../assets/images/screenshots/screenshot_6_https___talktoacreativedirector_com_.png";
import dandadImg from "../../assets/images/screenshots/screenshot_17_https___www_adhousenyc_com_adhouseinhouse_.png";
import metaAdLibraryImg from "../../assets/images/screenshots/facebook.png";
import shitTheyDidntTellImg from "../../assets/images/screenshots/Books _ Shit They Didn’t Tell You – Paul Woods _ Designer and Author.png";
import oneClubOneShowImg from "../../assets/images/screenshots/screenshot_36_https___www_oneclub_org_theoneshow_showcase_2023__.png";
import adLandImg from "../../assets/images/screenshots/screenshot_37_https___adland_tv_.png";

import SingleMentorList from "../../components/SingleMentorList";

const Business = () => {
  const items = [
    {
      title: "THE AVAIL LIST",
      subtitle: "Freelancers resource ",
      url: "http://www.theavaillist.com",
      img: availListImg,
    },
    {
      title: "Jessica Hische",
      subtitle: "Freelancers guidance ",
      url: "Freelancers guidance ",
      img: jessicaHischeImg,
    },
    {
      title: "THE BAD PODCAST",
      subtitle: "An advertising podcast ",
      url: "https://thebadpod.buzzsprout.com",
      img: badPodcastImg,
    },
    {
      title: "AGENCY SEARCH TOOL",
      subtitle: "AAAA.org tool ",
      url: "https://www.aaaa.org/home-page/agency-search/",
      img: agencySearchToolImg,
    },
    {
      title: "MT Freelance",
      subtitle: "Freelancers guidance ",
      url: "https://www.mtfreelance.com",
      img: mtFreelanceImg,
    },
    {
      title: "CREATIVE MORNINGS",
      subtitle: "Bringing creatives together",
      url: "https://creativemornings.com",
      img: creativeMorningsImg,
    },
    {
      title: "TALK TO A CREATIVE ",
      subtitle: "Director or recruiter or strategist",
      url: "https://talktoacreativedirector.com",
      img: talkToCreativeDirectorImg,
    },
    {
      title: "ADHOUSE/ INHOUSE",
      subtitle: "8 week paid mentorship program",
      url: "https://www.adhousenyc.com/adhouseinhouse",
      img: dandadImg,
    },
    {
      title: "Meta Ad library",
      subtitle: "Ad currently running across Meta",
      url: "https://www.facebook.com/ads/library/?active_status=all&ad_type=political_and_issue_ads&country=US&media_type=all",
      img: metaAdLibraryImg,
    },
    {
      title: "SH*T THEY DIDN’T TELL ",
      subtitle: "You, By Paul Woods ",
      url: "http://paulthedesigner.us/shit-they-didnt-tell-you",
      img: shitTheyDidntTellImg,
    },
    {
      title: "ONE CLUB ONE SHOW",
      subtitle: "Showcase",
      url: "https://www.oneclub.org/theoneshow/showcase/2023/",
      img: oneClubOneShowImg,
    },
    {
      title: "AD LAND TV",
      subtitle: "Ads archive and news",
      url: "https://adland.tv",
      img: adLandImg,
    },
  ];

  return (
    <div className="dark-container page-single-mentor text-white mb-0 mt-4">
      <div className="container-fluid">
        <div className="mentor-wrapper">
          <h2 className="title">Business</h2>
          <p className="subtitle">
            WELCOME TO <b>BUSINESS MENTORING</b>. HERE YOU WILL FIND{" "}
            <b>ADVICE&nbsp;</b>TO BE SUCCESSFUL AS AN
            <strong> EMPLOYEE OR INDEPENDENT</strong>.
          </p>
          <SingleMentorList items={items} />

        </div>
      </div>
    </div>
  );
};

export default Business;
