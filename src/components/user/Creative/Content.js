import portfolio from "../../../assets/images/portfolio.png";
import "../../../styles/User/ProfileContent.scss";

const Content = () => {
  return (
    <>
      <div className="content-section">
        <h1 className="content-title">Portfolio Site</h1>
        <a href="https://www.williambroussard.com/" target="_blank">
          <img src={portfolio} />
        </a>
      </div>
      {/* Education */}
      <div className="content-section">
        <h1 className="content-title">Education</h1>
        <div className="content-list">
          <div class="content">
            <div class="circle">P </div>
            <div class="top-info">
              <span class="edu_stats">Portfolio School</span>
              <span class="year">3/28/2028</span>
            </div>
            <div class="edu_center">
              <span class="university">Goodby Silverstein &amp; Partners</span>
            </div>
          </div>
          <div class="content">
            <div class="circle">B </div>
            <div class="top-info">
              <span class="edu_stats">
                Bachelor's of Applied Arts and Science
              </span>
              <span class="year">12/17/2021</span>
            </div>
            <div class="edu_center">
              <span class="university">University of Houston</span>
            </div>
          </div>
          <div class="content">
            <div class="circle">A </div>
            <div class="top-info">
              <span class="edu_stats">Associate of Arts and Sciences</span>
              <span class="year">6/14/2017</span>
            </div>
            <div class="edu_center">
              <span class="university">Lone Star Kingwood</span>
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="content-section">
        <h1 className="content-title">Work & Experience</h1>
        <div className="content-list">
          <div class="content">
            <div class="circle">A </div>
            <div class="top-info">
              <span class="edu_stats">Art Direction Intern</span>

              <span class="year">4/7/2023 - 7/28/2023 </span>
            </div>
            <div class="edu_center">
              <span class="university">Supernatural</span>
            </div>
            <p class="mb0">
              Help with executing ideas for Flossy and Worldcoin.
            </p>
          </div>
          <div class="content">
            <div class="circle">P </div>
            <div class="top-info">
              <span class="edu_stats">President</span>

              <span class="year">4/20/2020 - 4/14/2021 </span>
            </div>
            <div class="edu_center">
              <span class="university">
                American Advertising Federation at the University of Houston
              </span>
            </div>
          </div>
          <div class="content">
            <div class="circle">I </div>
            <div class="top-info">
              <span class="edu_stats">Intern</span>

              <span class="year">9/10/2020 - 12/12/2020 </span>
            </div>
            <div class="edu_center"></div>
          </div>
          <div class="content">
            <div class="circle">J </div>
            <div class="top-info">
              <span class="edu_stats">Jr Copywriter</span>

              <span class="year">6/12/2020 - 9/13/2020 </span>
            </div>
            <div class="edu_center">
              <span class="university">Strong Visuals</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
