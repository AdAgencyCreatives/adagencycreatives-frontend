import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { IoLocationOutline } from "react-icons/io5";

const Creatives = () => {
  return (
    <div className="dark-container">
      <div className="container">
        <div className="row g-4">
          {Array.apply(11, { length: 10 }).map((value, index) => {
            return (
              <div className="col-md-4 col-sm-3 col-12">
                <div className="sliderContent agencies-slider">
                  <img
                    src={Nathan}
                    className="candidateLogo"
                    width={150}
                    height={150}
                  />
                  <div className="agencyName">Nathan Walker</div>
                  <div className="position">Design Lead</div>
                  <div className="job-location location">
                    <IoLocationOutline />
                    <a href="#">Austin,</a>
                    <a href="#">Texas</a>
                  </div>
                  <div className="profileLink">
                    <a href="#">View Profile</a>
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
