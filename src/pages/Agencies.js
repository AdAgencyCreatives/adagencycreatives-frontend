import Mischief from "../assets/images/Mischief-1.png";
import { IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";

const Agencies = () => {
  return (
    <div className="dark-container">
      <div className="container p-md-0 px-5">
        <SearchBar />
        <div className="row g-4">
          {Array.apply(11, { length: 10 }).map((value, index) => {
            return (
              <div className="col-md-4 col-sm-3 col-12" key={`ag-${index}`}>
                <div className="sliderContent adagencies-slider">
                  <a href="#" className="employer-logo">
                    <img src={Mischief} width={150} height={150} />
                  </a>
                  <h3 className="employer-title">
                    <a href="#">Mischief</a>
                  </h3>
                  <div className="job-location location">
                    <IoLocationOutline />
                    <a href="#">Austin,</a>
                    <a href="#">Texas</a>
                  </div>
                  <div className="open-jobs-btn">
                    <a href="#">Open Jobs - 0</a>
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
