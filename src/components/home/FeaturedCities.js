import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { Context } from "../../context/DataContext";
import { useContext, useEffect } from "react";

const FeaturedCities = () => {

  const {
    state: { featured_cities },
    getFeaturedCities
  } = useContext(Context);

  useEffect(() => {
    getFeaturedCities();
  }, []);

  useEffect(() => {
    //console.log(featured_cities);
  }, [featured_cities]);

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
          {featured_cities && featured_cities.map((item, index) => {
            if (index > 0) {
              return <></>;
            }
            return (
              <div key={'featured_city_' + index} className="col-12 col-md-4">
                <div className={`job-city-banner`}>
                  <Link to={`/job-location-city/${item.slug}`}>
                    <div className="city-banner-inner">
                      <div
                        className="bg-banner"
                        style={{ backgroundImage: `url(${item.preview_link})` }}
                      ></div>
                      <div className="inner">
                        <h4 className="title">{item.name}</h4>
                        {/* <div className="number">
                          <span>{item.count}</span> jobs
                        </div> */}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
          <div key={"featured_cities_right"} className="col-12 col-md-8">
            <div className="row">
              {featured_cities && featured_cities.map((item, index) => {
                if (index === 0) {
                  return <></>;
                }
                return (
                  <div key={'featured_city_2_' + index} className="col-12 col-md-6">
                    <div className={`job-city-banner job-banner-small`}>
                      <Link to={`/job-location-city/${item.slug}`}>
                        <div className="city-banner-inner">
                          <div
                            className="bg-banner"
                            style={{ backgroundImage: `url(${item.preview_link})` }}
                          ></div>
                          <div className="inner">
                            <h4 className="title">{item.name}</h4>
                            {/* <div className="number">
                              <span>{`${item.count} job${item.count == 1 ? '' : 's'}`}</span>
                            </div> */}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCities;
