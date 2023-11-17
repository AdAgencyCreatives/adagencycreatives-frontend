import Newyork from "../../assets/images/New-York.png";
import Miami from "../../assets/images/Miami.png";
import LosAngeles from "../../assets/images/Los-Angeles-1.png";
import Dallas from "../../assets/images/Dallas-e1681932281853.png";
import Chicago from "../../assets/images/Chicago-Nights-1-1.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../context/DataContext";

const FeaturedCities = () => {

  const {state:{featured_cities},getFeaturedCities} = useContext(Context);

  useEffect(() => {
    getFeaturedCities();
  },[])

  const getJobCount = (name) => {
    if(featured_cities.length){
      const city = featured_cities.find((item) => item.name == name);
      return city.count
    }
    return 0
  }

  return (
    <div id="cities">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Featured Cities</h1>
        <div>
          <Link className="browseAll" to="creative-jobs">
            browse all <MdKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>

      <div className="sectionContent featured-cities">
        <div className="row gx-3">
          <div className="col-12 col-md-4">
            <div className="job-city-banner ">
              <Link to={`/job-location/dallas`}>
                <div className="city-banner-inner">
                  <div
                    className="bg-banner"
                    style={{ backgroundImage: `url(${Dallas})` }}
                  ></div>
                  <div className="inner">
                    <h4 className="title">Dallas </h4>

                    <div className="number">
                      <span>{getJobCount("Dallas")}</span> jobs
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="job-city-banner job-banner-small  ">
              <Link to={`/job-location/los-angeles`}>
                <div className="city-banner-inner">
                  <div
                    className="bg-banner"
                    style={{ backgroundImage: `url(${LosAngeles})` }}
                  ></div>
                  <div className="inner">
                    <h4 className="title">Los Angeles </h4>

                    <div className="number">
                      <span>{getJobCount("Los Angeles")}</span> jobs
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="job-city-banner job-banner-small ">
              <Link to={`/job-location/new-york`}>
                <div className="city-banner-inner">
                  <div
                    className="bg-banner"
                    style={{ backgroundImage: `url(${Newyork})` }}
                  ></div>
                  <div className="inner">
                    <h4 className="title">New York </h4>

                    <div className="number">
                      <span>{getJobCount("New York")}</span> jobs
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="job-city-banner job-banner-small ">
              <Link to={`/job-location/chicago`}>
                <div className="city-banner-inner">
                  <div
                    className="bg-banner"
                    style={{ backgroundImage: `url(${Chicago})` }}
                  ></div>
                  <div className="inner">
                    <h4 className="title">Chicago </h4>

                    <div className="number">
                      <span>{getJobCount("Chicago")}</span> jobs
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="job-city-banner job-banner-small ">
              <Link to={`/job-location/miami`}>
                <div className="city-banner-inner">
                  <div
                    className="bg-banner"
                    style={{ backgroundImage: `url(${Miami})` }}
                  ></div>
                  <div className="inner">
                    <h4 className="title">Miami </h4>

                    <div className="number">
                      <span>{getJobCount("Miami")}</span> jobs
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCities;
