import Mischief from "../assets/images/Mischief-1.png";
import { IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const Agencies = () => {
  return (
    <div className="dark-container">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">
          Agencies
        </h1>

        <SearchBar />
        <div className="row g-4">
          {Array.apply(11, { length: 10 }).map((value, index) => {
            return (
              <div className="col-md-4 col-sm-6 col-12" key={`ag-${index}`}>
                <div className="sliderContent adagencies-slider">
                  <Link to="/agency/username" className="employer-logo">
                    <img src={Mischief} width={150} height={150} />
                  </Link>
                  <h3 className="employer-title">
                    <Link to="/agency/username" className="text-dark">
                      Mischief
                    </Link>
                  </h3>
                  <div className="job-location location">
                    <IoLocationOutline />
                    <a href="#">Austin,</a>
                    <a href="#">Texas</a>
                  </div>
                  <div className="open-jobs-btn">
                    <Link to="/agency/username">Open Jobs - 0</Link>
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

export default Agencies;
