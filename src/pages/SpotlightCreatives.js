import Spotlight from "../assets/images/Creative-Spotlight-No-Background-600x600.png";
import { IoChevronForwardOutline } from "react-icons/io5";
import '../styles/SpotlightCreative.css'

const SpotlightCreatives = () => {
  const spotlightSlides = 7;

  return (
    <div className="dark-container page-spotlight mb-0 mt-4">
      <div className="container p-md-0 px-5">
        <div className="row g-4">
          {Array.apply(11, { length: spotlightSlides }).map((value, index) => {
            return (
              <div className="col-sm-6 col-md-4" key={value}>
                <div className="sliderContent spotlight-slider py-4">
                  <img
                    src={Spotlight}
                    className="spotlight-image w-50"
                    width={150}
                    height={150}
                  />
                  <div className="date">July 10, 2023</div>
                  <a className="spotlight-meta">
                    Creative Director Art, Brant Herzer
                  </a>
                  <div className="watch-link">
                    <a href="#">
                      Watch
                      <IoChevronForwardOutline />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpotlightCreatives;
