import { IoArrowForward } from "react-icons/io5";
import "../../styles/SingleMentor.scss";

const CopyWriting = () => {
  const items = [
    {
      title: "MT Freelance",
      subtitle: "Freelancers guidance ",
      url: "https://www.mtfreelance.com",
    },
    {
      title: "Deck of Brilliance",
      subtitle: "Idea generation tools",
      url: "https://deckofbrilliance.com",
    },
    {
      title: "Hey Whipple",
      subtitle: "Squeeze This, by Luke Sullivan",
      url: "https://heywhipple.com",
    },
    {
      title: "Copywriters Club",
      subtitle: "best books, courses, podcasts",
      url: "https://thecopywriterclub.com/ultimate-copywriter-book-resource-list/",
    },
    {
      title: "Modern Copywriter",
      subtitle: "Copywriters in advertising ",
      url: "https://www.moderncopywriter.com",
    },
    {
      title: "Stuff About Advertising",
      subtitle: "CD CW Ashley Rutstein Youtube",
      url: "https://www.youtube.com/@StuffAboutAdvertising",
    },

    {
      title: "Talk to a creative",
      subtitle: "Director or recruiter or strategist",
      url: "https://talktoacreativedirector.com",
    },

    {
      title: "D&AD Masterclass",
      subtitle: "Creative Copywriting",
      url: "https://www.dandad.org/masterclasses/course/training-creative-copywriting/",
    },

    {
      title: "The Copywriters",
      subtitle: "Handbook, By Robert W. Blythe ",
      url: "https://www.amazon.com/Copywriters-Handbook-Step-Step-Writing/dp/0805078045",
    },

    {
      title: "Ogilvy on advertising",
      subtitle: "By David Ogilvy",
      url: "https://www.amazon.com/Ogilvy-Advertising-David/dp/039472903X/ref=sr_1_1?crid=UKCOJ5X4ZDSJ&keywords=ogilvy&qid=1694814935&s=books&sprefix=ogilvy%2Cstripbooks%2C138&sr=1-1",
    },

    {
      title: "The adweek copywriting",
      subtitle: "Handbook, By Joseph Sugarman",
      url: "https://www.amazon.com/Adweek-Copywriting-Handbook-Advertising-Copywriters/dp/B08QRTG6LX/ref=sr_1_6?crid=2B9J6VAQ6B21L&keywords=Copywriting&qid=1694815051&s=books&sprefix=copywriting%2Cstripbooks%2C139&sr=1-6",
    },
    {
      title: "Suggestions",
      subtitle: "Did we miss something? Please let us know.",
      url: "contact",
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
                <div className="box">
                  <div className="main-title">{item.title}</div>
                  <div className="title-small">{item.subtitle}</div>
                  <div className="box-link">
                    <a href={item.url} target="__blank">
                      <IoArrowForward />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyWriting;
