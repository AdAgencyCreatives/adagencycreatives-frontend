import { IoArrowForward } from "react-icons/io5";
import "../../styles/SingleMentor.scss";
import Mtfreelance from "../../assets/images/copywriting/mtfreelance.png";
import deckofbrilliance from "../../assets/images/copywriting/deckofbrilliance.png";
import heywhipple from "../../assets/images/copywriting/heywhipple.png";
import copywriterclub from "../../assets/images/copywriting/copywriterclub.png";
import moderncopywriter from "../../assets/images/copywriting/moderncopywriter.png";
import stuffaboutadvertising from "../../assets/images/copywriting/stuffaboutadvertising.png";
import talktoacreativedirector from "../../assets/images/copywriting/talktoadirector.png";
import dandad from "../../assets/images/copywriting/dandad.png";
import copywriterhandbook from "../../assets/images/copywriting/copywriterhandbook.png";
import ogilvy from "../../assets/images/copywriting/ogilvy.png";
import adweek from "../../assets/images/copywriting/adweek.png";
import { Link } from "react-router-dom";

const CopyWriting = () => {
  const items = [
    {
      title: "MT Freelance",
      subtitle: "Freelancers guidance ",
      url: "https://www.mtfreelance.com",
      img: Mtfreelance,
    },
    {
      title: "Deck of Brilliance",
      subtitle: "Idea generation tools",
      url: "https://deckofbrilliance.com",
      img: deckofbrilliance,
    },
    {
      title: "Hey Whipple",
      subtitle: "Squeeze This, by Luke Sullivan",
      url: "https://heywhipple.com",
      img: heywhipple,
    },
    {
      title: "Copywriters Club",
      subtitle: "best books, courses, podcasts",
      url: "https://thecopywriterclub.com/ultimate-copywriter-book-resource-list/",
      img: copywriterclub,
    },
    {
      title: "Modern Copywriter",
      subtitle: "Copywriters in advertising ",
      url: "https://www.moderncopywriter.com",
      img: moderncopywriter,
    },
    {
      title: "Stuff About Advertising",
      subtitle: "CD CW Ashley Rutstein Youtube",
      url: "https://www.youtube.com/@StuffAboutAdvertising",
      img: stuffaboutadvertising,
    },

    {
      title: "Talk to a creative",
      subtitle: "Director or recruiter or strategist",
      url: "https://talktoacreativedirector.com",
      img: talktoacreativedirector,
    },

    {
      title: "D&AD Masterclass",
      subtitle: "Creative Copywriting",
      url: "https://www.dandad.org/masterclasses/course/training-creative-copywriting/",
      img: dandad,
    },

    {
      title: "The Copywriters",
      subtitle: "Handbook, By Robert W. Blythe ",
      url: "https://www.amazon.com/Copywriters-Handbook-Step-Step-Writing/dp/0805078045",
      img: copywriterhandbook,
    },

    {
      title: "Ogilvy on advertising",
      subtitle: "By David Ogilvy",
      url: "https://www.amazon.com/Ogilvy-Advertising-David/dp/039472903X/ref=sr_1_1?crid=UKCOJ5X4ZDSJ&keywords=ogilvy&qid=1694814935&s=books&sprefix=ogilvy%2Cstripbooks%2C138&sr=1-1",
      img: ogilvy,
    },

    {
      title: "The adweek copywriting",
      subtitle: "Handbook, By Joseph Sugarman",
      url: "https://www.amazon.com/Adweek-Copywriting-Handbook-Advertising-Copywriters/dp/B08QRTG6LX/ref=sr_1_6?crid=2B9J6VAQ6B21L&keywords=Copywriting&qid=1694815051&s=books&sprefix=copywriting%2Cstripbooks%2C139&sr=1-6",
      img: adweek,
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
          <h2 className="title">CopyWriting</h2>
          <p className="subtitle">
            Welcome to <strong>Copywriting, Story-Telling</strong> at it's
            finest
          </p>
          <div className="row content gy-3">
            {items.map((item, index) => (
              <div className="col-md-3 col-sm-4 col-12">
                <Link className={`box link-light ${item.img ? "flip": ""}`} to={item.url} target="__blank">
                  <div className="flip-card-front">
                    <div className="main-title">{item.title}</div>
                    <div className="title-small">{item.subtitle}</div>
                    <div className="box-link">
                      <div className="link">
                        <IoArrowForward />
                      </div>
                    </div>
                  </div>
                  {item.img && (
                    <div className="flip-card-back">
                      <img src={item.img} alt="Avatar" />
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyWriting;
