import Select from "react-select";
import "../styles/Jobs.css";

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
  { value: 149, label: "California" },
];

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

const Jobs = () => {
  return (
    <div className="light-container page-jobs mb-2 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-4">
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
                <div className="filter-box">
                  <Select options={states} placeholder="Filter By State" />
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
            </div>
          </div>
          <div className="col-8">
            {/* Jobs List */}

            <div className="jobs-list-container">
              <div className="job-item">
                <div class="d-flex align-items-center">
                  <div class="inner-left">
                    <div class="employer-logo">
                      <a href="https://adagencycreatives.com/job/160over90-georgia-atlanta-fulltime-160over90/">
                        <img
                          width="150"
                          height="150"
                          src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/04/160over90-150x150.png"
                          className=""
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="job-list-content">
                      <div class="title-wrapper flex-middle-sm">
                        <h2 class="job-title">
                          <a
                            href="https://adagencycreatives.com/job/160over90-georgia-atlanta-fulltime-160over90/"
                            rel="bookmark"
                          >
                            160over90
                          </a>
                        </h2>
                      </div>
                      <div class="job-metas">
                        <div class="category-job">
                          <div class="job-category with-icon">
                            <i class="flaticon-briefcase-1"></i>
                            <a
                              href="https://adagencycreatives.com/job-category/senior-art-director/"
                            >
                              Senior Art Director
                            </a>
                          </div>
                        </div>
                        <div class="job-deadline with-icon">
                          <i class="flaticon-wall-clock"></i> August 14, 2023
                        </div>
                        <div class="job-type with-title">
                          <a
                            class="type-job"
                            href="https://adagencycreatives.com/job-type/fulltime/"
                          >
                            Full-Time
                          </a>
                        </div>
                        <span class="urgent">Urgent</span>
                      </div>
                    </div>
                  </div>
                  <div class="ali-right">
                    <div class="flex-middle">
                      <a
                        href="javascript:void(0);"
                        class="btn-follow btn-action-job btn-add-job-shortlist"
                        data-job_id="4545"
                        data-nonce="a33de480b9"
                      >
                        <i class="flaticon-bookmark"></i>
                      </a>{" "}
                      <a
                        href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                        target="_blank"
                        rel="nofollow, noindex"
                        class="btn btn-apply btn-apply-job-external "
                      >
                        Apply Now<i class="next flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-item">
                <div class="d-flex align-items-center">
                  <div class="inner-left">
                    <div class="employer-logo">
                      <a href="https://adagencycreatives.com/job/160over90-georgia-atlanta-fulltime-160over90/">
                        <img
                          width="150"
                          height="150"
                          src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/04/160over90-150x150.png"
                          className=""
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="job-list-content">
                      <div class="title-wrapper flex-middle-sm">
                        <h2 class="job-title">
                          <a
                            href="https://adagencycreatives.com/job/160over90-georgia-atlanta-fulltime-160over90/"
                            rel="bookmark"
                          >
                            160over90
                          </a>
                        </h2>
                      </div>
                      <div class="job-metas">
                        <div class="category-job">
                          <div class="job-category with-icon">
                            <i class="flaticon-briefcase-1"></i>
                            <a
                              href="https://adagencycreatives.com/job-category/senior-art-director/"
                            >
                              Senior Art Director
                            </a>
                          </div>
                        </div>
                        <div class="job-deadline with-icon">
                          <i class="flaticon-wall-clock"></i> August 14, 2023
                        </div>
                        <div class="job-type with-title">
                          <a
                            class="type-job"
                            href="https://adagencycreatives.com/job-type/fulltime/"
                          >
                            Full-Time
                          </a>
                        </div>
                        <span class="urgent">Urgent</span>
                      </div>
                    </div>
                  </div>
                  <div class="ali-right">
                    <div class="flex-middle">
                      <a
                        href="javascript:void(0);"
                        class="btn-follow btn-action-job btn-add-job-shortlist"
                        data-job_id="4545"
                        data-nonce="a33de480b9"
                      >
                        <i class="flaticon-bookmark"></i>
                      </a>{" "}
                      <a
                        href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                        target="_blank"
                        rel="nofollow, noindex"
                        class="btn btn-apply btn-apply-job-external "
                      >
                        Apply Now<i class="next flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="job-item">
                <div class="d-flex align-items-center">
                  <div class="inner-left">
                    <div class="employer-logo">
                      <a href="https://adagencycreatives.com/job/160over90-georgia-atlanta-fulltime-160over90/">
                        <img
                          width="150"
                          height="150"
                          src="https://adagencycreatives.com/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/04/160over90-150x150.png"
                          className=""
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="job-list-content">
                      <div class="title-wrapper flex-middle-sm">
                        <h2 class="job-title">
                          <a
                            href="https://adagencycreatives.com/job/160over90-georgia-atlanta-fulltime-160over90/"
                            rel="bookmark"
                          >
                            160over90
                          </a>
                        </h2>
                      </div>
                      <div class="job-metas">
                        <div class="category-job">
                          <div class="job-category with-icon">
                            <i class="flaticon-briefcase-1"></i>
                            <a
                              href="https://adagencycreatives.com/job-category/senior-art-director/"
                            >
                              Senior Art Director
                            </a>
                          </div>
                        </div>
                        <div class="job-deadline with-icon">
                          <i class="flaticon-wall-clock"></i> August 14, 2023
                        </div>
                        <div class="job-type with-title">
                          <a
                            class="type-job"
                            href="https://adagencycreatives.com/job-type/fulltime/"
                          >
                            Full-Time
                          </a>
                        </div>
                        <span class="urgent">Urgent</span>
                      </div>
                    </div>
                  </div>
                  <div class="ali-right">
                    <div class="flex-middle">
                      <a
                        href="javascript:void(0);"
                        class="btn-follow btn-action-job btn-add-job-shortlist"
                        data-job_id="4545"
                        data-nonce="a33de480b9"
                      >
                        <i class="flaticon-bookmark"></i>
                      </a>{" "}
                      <a
                        href="https://www.linkedin.com/jobs/view/3649027671/?alternateChannel=search&amp;refId=w7BE3gGca8PklL6PqfKYw&amp;trackingId=rgVKVC9elfj17yZ4bPTusg"
                        target="_blank"
                        rel="nofollow, noindex"
                        class="btn btn-apply btn-apply-job-external "
                      >
                        Apply Now<i class="next flaticon-right-arrow"></i>
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
