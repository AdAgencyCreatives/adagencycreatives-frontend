import Select from "react-select";
import "../styles/Jobs.css";
import { useState } from "react";

const job_titles = [
  { value: 150, label: "3D Designer" },
  { value: 117, label: "Art Director" },
  { value: 147, label: "Associate Creative Director Art Director" },
  { value: 148, label: "Associate Creative Director Copywriter" },
  { value: 149, label: "Chief Creative Officer (CCO)" },
];

const states = [
  { value: 150, label: "Alabama" },
  { value: 117, label: "Alaska" },
  { value: 147, label: "Arizona" },
  { value: 148, label: "Arkansas" },
  { value: 149, label: "Connecticut" },
];

const citiesArray = {
  148: [
    { id: 455, label: "Bentonville" },
    { id: 454, label: "Fayetteville" },
    { id: 453, label: "Fort Smith" },
    { id: 457, label: "Jonesboro" },
    { id: 452, label: "Little Rock" },
    { id: 456, label: "Springdale" },
  ],
  147: [
    { id: 451, label: "Avondale" },
    { id: 443, label: "Chandler" },
    { id: 446, label: "Gilbert" },
    { id: 444, label: "Glendale" },
    { id: 442, label: "Mesa" },
    { id: 448, label: "Peoria" },
    { id: 440, label: "Phoenix" },
    { id: 445, label: "Scottsdale" },
    { id: 449, label: "Surprise" },
    { id: 447, label: "Tempe" },
    { id: 441, label: "Tucson" },
    { id: 450, label: "Yuma" },
  ],
  117: [{ id: 439, label: "Anchorage" }],
  150: [
    { id: 433, label: "Birmingham" },
    { id: 438, label: "Hoover" },
    { id: 436, label: "Huntsville" },
    { id: 435, label: "Mobile" },
    { id: 434, label: "Montgomery" },
    { id: 437, label: "Tuscaloosa" },
  ],
  149: [
    { id: 590, label: "Bridgeport" },
    { id: 596, label: "Danbury" },
    { id: 592, label: "Hartford" },
    { id: 597, label: "New Britain" },
    { id: 591, label: "New Haven" },
    { id: 595, label: "Norwalk" },
    { id: 593, label: "Stamford" },
    { id: 594, label: "Waterbury" },
    { id: 2055, label: "Wilton" },
  ],
};

const employment = [
  { value: 150, label: "Contract" },
  { value: 117, label: "Freelance" },
  { value: 147, label: "Full-Time" },
  { value: 148, label: "Internship" },
  { value: 149, label: "Part-Time" },
];

const media = [
  { value: 150, label: "360 Activation" },
  { value: 117, label: "Bilingual" },
  { value: 147, label: "Branding" },
  { value: 148, label: "Conecpts" },
  { value: 149, label: "Digital" },
];

const titles = [
  { value: 150, label: "3D Designer" },
  { value: 117, label: "Art Director" },
  { value: 147, label: "Associate Creative Director Art Director" },
  { value: 148, label: "Associate Creative Director Copywriter" },
  { value: 149, label: "Chief Creative Officer (CCO)" },
];

const emailFreq = [
  { value: 1, label: "Daily" },
  { value: 2, label: "Weekly" },
  { value: 3, label: "Monthly" },
];

const Jobs = () => {
  const [cities, setCities] = useState([]);

  const changeState = ({ value }, { action }) => {
    if (action == "select-option") {
      setCities(citiesArray[value]);
    }
  };

  return (
    <div className="light-container page-jobs mb-2 mt-md-5 mt-4">
      <div className="container-fluid px-md-5 px-3">
        <div className="row">
          <div className="col-md-4">
            {/* Jobs Sidebar */}
            <div className="filters">
              <h1 className="jobs-filter-title">Search Jobs</h1>
              <div className="filter-item">
                <div className="filter-label">Industry Job Title</div>
                <div className="filter-box">
                  <Select options={job_titles} placeholder="select one" />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">
                  Job Location (State / Major City)
                </div>
                <div className="filter-box mb-3">
                  <Select
                    options={states}
                    onChange={changeState}
                    placeholder="Filter By State"
                  />
                </div>
                <div className="filter-box">
                  <Select options={cities} placeholder="Filter By City" />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">Employment Type</div>
                <div className="filter-box">
                  <Select options={employment} placeholder="select one" />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">Media Experience</div>
                <div className="filter-box">
                  <Select
                    options={media}
                    isMulti
                    placeholder="select up to three"
                  />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">Remote Opportunity</div>
                <div className="filter-box">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="remote"
                      value={1}
                    />
                    <label class="form-check-label">Yes</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="remote"
                      value={0}
                    />
                    <label class="form-check-label">No</label>
                  </div>
                </div>
              </div>

              <div className="filter-btn">
                <button className="btn btn-filter">Find Jobs</button>
              </div>

              <div className="job_notification">
                <h1 className="jobs-filter-title">Request Job Notifications</h1>
                <div className="notif-input-box">
                  <h5 className="notif-title fw-normal">Title</h5>
                  <Select options={titles} placeholder="Select title" />
                </div>
                <div className="notif-input-box">
                  <h5 className="notif-title fw-normal">Email Frequency</h5>
                  <Select options={emailFreq} />
                </div>
                <div className="job-alert-button">
                  <button className="alert-btn btn">Save Job Alert</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {/* Jobs List */}

            <div className="jobs-list-container">
              <div class="results-filter-wrapper">
                <h3 class="title">Filters</h3>
                <div class="inner">
                  <ul class="results-filter">
                    <li>
                      <a href="#">
                        <span class="close-value">x</span>Yes
                      </a>
                    </li>
                  </ul>
                  <a href="#">Clear all</a>
                </div>
              </div>
              <div class="jobs-alert-ordering-wrapper">
                <div class="results-count">Showing all results</div>
                <div class="jobs-ordering-wrapper"></div>
              </div>
              <div className="job-item">
                <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
                  <div className="inner-left">
                    <div className="employer-logo">
                      <a href="#">
                        <img
                          width="150"
                          height="150"
                          src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/04/160over90-150x150.png"
                          className=""
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="job-list-content">
                      <div className="title-wrapper flex-middle-sm">
                        <h2 className="job-title">
                          <a href="#" rel="bookmark">
                            160over90
                          </a>
                        </h2>
                      </div>
                      <div className="job-metas">
                        <div className="category-job">
                          <div className="job-category with-icon">
                            <i className="flaticon-briefcase-1"></i>
                            <a href="#">Senior Art Director</a>
                          </div>
                        </div>
                        <div className="job-deadline with-icon">
                          <i className="flaticon-wall-clock"></i> August 14,
                          2023
                        </div>
                        <div className="job-type with-title">
                          <a className="type-job" href="#">
                            Full-Time
                          </a>
                        </div>
                        <span className="urgent">Urgent</span>
                      </div>
                    </div>
                  </div>
                  <div className="ali-right">
                    <div className="flex-middle">
                      <a
                        className="btn-follow btn-action-job btn-add-job-shortlist"
                        data-job_id="4545"
                        data-nonce="a33de480b9"
                      >
                        <i className="flaticon-bookmark"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                        target="_blank"
                        rel="nofollow, noindex"
                        className="btn btn-apply btn-apply-job-external "
                      >
                        Apply Now<i className="next flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-item">
                <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
                  <div className="inner-left">
                    <div className="employer-logo">
                      <a href="#">
                        <img
                          width="150"
                          height="150"
                          src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/04/160over90-150x150.png"
                          className=""
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="job-list-content">
                      <div className="title-wrapper flex-middle-sm">
                        <h2 className="job-title">
                          <a href="#" rel="bookmark">
                            160over90
                          </a>
                        </h2>
                      </div>
                      <div className="job-metas">
                        <div className="category-job">
                          <div className="job-category with-icon">
                            <i className="flaticon-briefcase-1"></i>
                            <a href="#">Senior Art Director</a>
                          </div>
                        </div>
                        <div className="job-deadline with-icon">
                          <i className="flaticon-wall-clock"></i> August 14,
                          2023
                        </div>
                        <div className="job-type with-title">
                          <a className="type-job" href="#">
                            Full-Time
                          </a>
                        </div>
                        <span className="urgent">Urgent</span>
                      </div>
                    </div>
                  </div>
                  <div className="ali-right">
                    <div className="flex-middle">
                      <a
                        className="btn-follow btn-action-job btn-add-job-shortlist"
                        data-job_id="4545"
                        data-nonce="a33de480b9"
                      >
                        <i className="flaticon-bookmark"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                        target="_blank"
                        rel="nofollow, noindex"
                        className="btn btn-apply btn-apply-job-external "
                      >
                        Apply Now<i className="next flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="job-item">
                <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
                  <div className="inner-left">
                    <div className="employer-logo">
                      <a href="#">
                        <img
                          width="150"
                          height="150"
                          src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/04/160over90-150x150.png"
                          className=""
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="job-list-content">
                      <div className="title-wrapper flex-middle-sm">
                        <h2 className="job-title">
                          <a href="#" rel="bookmark">
                            160over90
                          </a>
                        </h2>
                      </div>
                      <div className="job-metas">
                        <div className="category-job">
                          <div className="job-category with-icon">
                            <i className="flaticon-briefcase-1"></i>
                            <a href="#">Senior Art Director</a>
                          </div>
                        </div>
                        <div className="job-deadline with-icon">
                          <i className="flaticon-wall-clock"></i> August 14,
                          2023
                        </div>
                        <div className="job-type with-title">
                          <a className="type-job" href="#">
                            Full-Time
                          </a>
                        </div>
                        <span className="urgent">Urgent</span>
                      </div>
                    </div>
                  </div>
                  <div className="ali-right">
                    <div className="flex-middle">
                      <a
                        className="btn-follow btn-action-job btn-add-job-shortlist"
                        data-job_id="4545"
                        data-nonce="a33de480b9"
                      >
                        <i className="flaticon-bookmark"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                        target="_blank"
                        rel="nofollow, noindex"
                        className="btn btn-apply btn-apply-job-external "
                      >
                        Apply Now<i className="next flaticon-right-arrow"></i>
                      </a>
                    </div>
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

export default Jobs;
