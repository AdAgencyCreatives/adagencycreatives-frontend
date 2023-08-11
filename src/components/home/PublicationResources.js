import AgencySpy from "../../assets/images/AgencySpy.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const PublicationResources = () => {
  const publications = [
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
    {
      image: AgencySpy,
      url: "#",
    },
  ];

  return (
    <>
      <div className="sectionHeader">
        <h1 className="sectionTitle">Publication Resources</h1>
        <div className="browseAll">
          browse all <MdKeyboardDoubleArrowRight />
        </div>
      </div>
      {/* Slides */}
      <div className="sectionContent publication-section">
        <swiper-container
          navigation="true"
          slides-per-view="4"
          space-between="10"
        >
          {publications.map((item, index) => {
            return (
              <swiper-slide key={`slide${index}`}>
                <div className="publications-slider">
                  <a href={item.url}>
                    <img
                      src={item.image}
                      className="publication-image w-100 h-auto"
                      width={150}
                      height={150}
                    />
                  </a>
                </div>
              </swiper-slide> 
            );
          })}
        </swiper-container>
      </div>
    </>
  );
};

export default PublicationResources;
