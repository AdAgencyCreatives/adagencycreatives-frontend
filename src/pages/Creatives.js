import Placeholder from "../assets/images/placeholder.png";
import { IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useCreatives from "../hooks/useCreatives";
import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import { useScrollLoader } from "../hooks/useScrollLoader";

const Creatives = () => {
  const creatives = useCreatives();
  const { state, loadCreatives } = useContext(CreativesContext);

  const loadMore = () => {
    if (state.nextPage) loadCreatives(state.nextPage);
  };

  useScrollLoader(state.loading, loadMore);

  return (
    <div className="dark-container">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">
          Creatives
        </h1>
        <SearchBar />
        <div className="row g-4">
          {creatives &&
            creatives.map((item, index) => {
              return (
                <div className="col-md-4 col-sm-6 col-12" key={`cv-${index}`}>
                  <div className="sliderContent agencies-slider">
                    <img
                      src={item.profile_image || Placeholder}
                      className="candidateLogo"
                      width={150}
                      height={150}
                      alt=""
                      onError={(e) => {
                        e.target.src = Placeholder; // Set the backup image source
                      }}
                    />
                    <div className="agencyName">
                      <Link className="text-dark" to={`/creative/${item.slug}`}>
                        {item.name}
                      </Link>
                    </div>
                    <div className="position">{item.title}</div>
                    {item.location && (
                      <div className="job-location location">
                        <IoLocationOutline />
                        <Link to={`/creative-location/${item.location.state}`}>
                          {item.location.state},
                        </Link>
                        <Link to={`/creative-location/${item.location.city}`}>
                          {item.location.city}
                        </Link>
                      </div>
                    )}
                    <div className="profileLink">
                      <Link to={`/creative/${item.slug}`}>View Profile</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="load-more text-center">
            {state.loading && (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creatives;
