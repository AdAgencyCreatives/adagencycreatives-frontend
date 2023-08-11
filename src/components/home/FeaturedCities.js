import Newyork from "../../assets/images/New-York.png";
import Miami from "../../assets/images/Miami.png";
import LosAngeles from "../../assets/images/Los-Angeles-1.png";
import Dallas from "../../assets/images/Dallas-e1681932281853.png";
import Chicago from "../../assets/images/Chicago-Nights-1-1.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const FeaturedCities = () => {
  return (
    <>
      <div className="sectionHeader">
        <h1 className="sectionTitle">Featured Cities</h1>
        <div className="browseAll">
          browse all <MdKeyboardDoubleArrowRight />
        </div>
      </div>

      <div className="sectionContent featured-cities">
        <div className="row">
          <div className="col-4">
            <div className="job-city-banner ">
              <a href="#">
                <div className="city-banner-inner">
                  <div
                    className="bg-banner"
                    style={{ backgroundImage: `url(${Dallas})` }}
                  ></div>
                  <div className="inner">
                    <h4 className="title">Dallas </h4>

                    <div className="number">
                      <span>0</span> jobs
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCities;
