import Placeholder from "../assets/images/placeholder.png";
import { IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import useAgencies from "../hooks/useAgencies";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import { useScrollLoader } from "../hooks/useScrollLoader";
import { useContext } from "react";

const Agencies = () => {
  const agencies = useAgencies();
  const { state, loadAgencies } = useContext(AgenciesContext);

  const loadMore = () => {
    if (state.nextPage) loadAgencies(state.nextPage);
  };

  useScrollLoader(state.loading, loadMore);

  return (
    <div className="dark-container">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">
          Agencies
        </h1>

        <SearchBar />
        <div className="row g-4">
          {agencies &&
            agencies.map((item, index) => {
              return (
                <div className="col-md-4 col-sm-6 col-12" key={`ag-${index}`}>
                  <div className="sliderContent adagencies-slider">
                    <Link to={`/agency/${item.slug}`} className="employer-logo">
                      <img
                        src={item.logo || Placeholder}
                        width={150}
                        height={150}
                        alt=""
                        onError={(e) => {
                          e.target.src = Placeholder;
                        }}
                      />
                    </Link>
                    <h3 className="employer-title">
                      <Link to={`/agency/${item.slug}`} className="text-dark">
                        {item.name}
                      </Link>
                    </h3>
                    {item.location && (
                      <div className="job-location location">
                        <IoLocationOutline />
                        <Link to={`/agency-location/${item.location.state}`}>
                          {item.location.state},
                        </Link>
                        <Link to={`/agency-location/${item.location.city}`}>
                          {item.location.city}
                        </Link>
                      </div>
                    )}
                    <div className="open-jobs-btn">
                      <Link to={`/agency/${item.slug}`} >Open Jobs - 0</Link>
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

export default Agencies;
