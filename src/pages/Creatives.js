import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { IoLocationOutline } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const Creatives = () => {
  return (
    <div className="dark-container">
      <div className="container p-md-0 px-5">
        <h1 className="community-title text-white text-center mb-4">
          Creatives
        </h1>
        <SearchBar />
        <div className="row g-4">
          {Array.apply(11, { length: 10 }).map((value, index) => {
            return (
              <div className="col-md-4 col-sm-6 col-12" key={`ag-${index}`}>
                <div className="sliderContent agencies-slider">
                  <img
                    src={Nathan}
                    className="candidateLogo"
                    width={150}
                    height={150}
                  />
                  <div className="agencyName">
                    <Link className="text-dark" to="/creative/username">Nathan Walker</Link>
                  </div>
                  <div className="position">Design Lead</div>
                  <div className="job-location location">
                    <IoLocationOutline />
                    <a href="#">Austin,</a>
                    <a href="#">Texas</a>
                  </div>
                  <div className="profileLink">
                    <Link to="/creative/username">View Profile</Link>
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

export default Creatives;
