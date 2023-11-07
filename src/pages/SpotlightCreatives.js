import Spotlight from "../assets/images/Creative-Spotlight-No-Background-600x600.png";
import { IoChevronForwardOutline } from "react-icons/io5";
import "../styles/SpotlightCreative.css";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../context/SpotlightContext";

const SpotlightCreatives = () => {
  const {
    state: { screatives },
    getSCreatives,
  } = useContext(Context);

  useEffect(() => {
    getSCreatives();
  }, []);


  return (
    <div className="dark-container page-spotlight mb-0 mt-4">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">
          Creative Spotlights
        </h1>
        <SearchBar />
        <div className="row g-4">
          {screatives &&
            screatives.map((item, index) => {
            return (
              <div className="col-sm-6 col-md-4" key={index}>
                <div className="sliderContent spotlight-slider py-4">
                  <Link to={item.url}>
                    <img
                      src={Spotlight}
                      className="spotlight-image"
                      width={150}
                      height={150}
                    />
                    <div className="date">{item.created_at}</div>
                    <div className="spotlight-meta">{item.title}</div>
                    <div className="watch-link">
                      <div className="">
                        Watch
                        <IoChevronForwardOutline />
                      </div>
                    </div>
                  </Link>
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
