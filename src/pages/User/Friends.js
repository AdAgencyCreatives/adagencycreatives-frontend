import { Link, useParams } from "react-router-dom";
import Header from "../../components/user/Header";
import "../../styles/User.scss";
import LeftSidebar from "../../components/community/LeftSidebar";
import {
  IoArrowBack,
  IoArrowForward,
  IoLocationOutline,
  IoMailOpen,
  IoPersonAdd,
} from "react-icons/io5";
import Nathan from "../../assets/images/NathanWalker_ProfilePic-150x150.jpg";

const Friends = () => {
  const { username } = useParams();
  return (
    <div className="dark-container">
      <div className="container-fluid px-2 px-md-5">
        <div className="row">
          <div className="col-12">
            <Header username={username} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 mb-3">
            <LeftSidebar />
          </div>
          <div className="col-md-10">
            <div className="row g-4">
              {Array.apply(11, { length: 10 }).map((value, index) => {
                return (
                  <div className="col-md-4 col-sm-3 col-12" key={`ag-${index}`}>
                    <div className="sliderContent friends-list">
                      <Link to="">
                        <img
                          src={Nathan}
                          className="candidateLogo"
                          width={150}
                          height={150}
                        />
                      </Link>
                      <Link className="text-black" to="">
                        <div className="agencyName">Nathan Walker</div>
                      </Link>
                      <div className="position">Design Lead</div>
                      <div className="job-location location">
                        <IoLocationOutline />
                        <a href="#">Austin,</a>
                        <a href="#">Texas</a>
                      </div>

                      <div className="user-actions">
                        <button className="btn">
                          <IoPersonAdd />
                        </button>
                        <button className="btn btn-outline">
                          <IoMailOpen />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <p className="user-count">Viewing 1 - 11 of 11 members</p>
                <div className="user-pagination">
                  <div className="page next">
                    <IoArrowBack />
                  </div>
                  <div className="page current">1</div>
                  <div className="page">2</div>
                  <div className="page next">
                    <IoArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
