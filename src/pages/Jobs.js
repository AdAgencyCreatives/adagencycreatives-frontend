import Select from "react-select";
import "../styles/Jobs.scss";
import { useContext, useEffect, useState } from "react";
import {
  IoArrowBack,
  IoArrowForward,
  IoBriefcaseOutline,
  IoStar,
} from "react-icons/io5";
import moment from "moment";
import Tooltip from "../components/Tooltip";
import { Link } from "react-router-dom";
import { Context as JobsContext } from "../context/JobsContext";


const emailFreq = [
  { value: 1, label: "Daily" },
  { value: 2, label: "Weekly" },
  { value: 3, label: "Monthly" },
];

const Jobs = () => {
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [media, setMedia] = useState([]);
  const [filters, setFilters] = useState({});

  const {
    state: {
      jobs,
      meta,
      links,
      categories,
      states,
      cities,
      employment_type,
      media_experiences,
    },
    getJobs,
    getCategories,
    getStates,
    getCities,
    getEmploymentTypes,
    getMediaExperiences,
    filterJobs,
    paginateJob,
  } = useContext(JobsContext);

  useEffect(() => {
    getJobs();
    getCategories();
    getStates();
    getEmploymentTypes();
    getMediaExperiences();
  }, []);

  useEffect(() => {
    let data = categories;
    if (categories.length) {
      data = parseFieldsData(categories);
    }
    setJobTitles(data);
  }, [categories]);

  useEffect(() => {
    let data = states;
    if (states.length) {
      data = parseFieldsData(states);
    }
    setStates(data);
  }, [states]);

  useEffect(() => {
    let data = cities;
    if (cities.length) {
      data = parseFieldsData(cities);
    }
    setCities(data);
  }, [cities]);

  useEffect(() => {
    let data = media_experiences;
    if (media_experiences.length) {
      data = parseFieldsData(media_experiences);
    }
    setMedia(data);
  }, [media_experiences]);

  useEffect(() => {
    let data = employment_type;
    if (employment_type.length) {
      data = employment_type.map((item) => {
        return { label: item, value: item };
      });
    }
    setEmployment(data);
  }, [employment_type]);

  const parseFieldsData = (data) => {
    const parsedValue = data.map((item) => {
      return { label: item.name, value: item.uuid || item.id };
    });
    return parsedValue;
  };

  const changeState = (item, { action }) => {
    if (action == "select-option") {
      getCities(item.value);
      addFilter(item, "state");
    }
  };

  const addFilter = (item, type) => {
    let updatedFilters = { ...filters, [type]: item };
    setFilters(updatedFilters);
    filterJobs(updatedFilters);
  };

  const removeFilter = (item, key = false) => {
    console.log({ filters });

    let updatedFilters = { ...filters };

    if (key) {
      updatedFilters[item].splice(key);
    } else {
      delete updatedFilters[item];
    }

    console.log({ updatedFilters });
    setFilters(updatedFilters);
    filterJobs(updatedFilters);
  };

  const paginate = (page) => {
    paginateJob(page, filters);
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
                  <Select
                    options={jobTitles}
                    placeholder="select one"
                    onChange={(item) => addFilter(item, "title")}
                  />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">
                  Job Location (State / Major City)
                </div>
                <div className="filter-box mb-3">
                  <Select
                    options={statesList}
                    onChange={changeState}
                    placeholder="Filter By State"
                  />
                </div>
                <div className="filter-box">
                  <Select
                    options={citiesList}
                    placeholder="Filter By City"
                    onChange={(item) => addFilter(item, "city")}
                  />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">Employment Type</div>
                <div className="filter-box">
                  <Select
                    options={employment}
                    placeholder="select one"
                    onChange={(item) => addFilter(item, "employment_type")}
                  />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">Media Experience</div>
                <div className="filter-box">
                  <Select
                    options={media}
                    isMulti
                    placeholder="select up to three"
                    onChange={(item) => addFilter(item, "media_experience")}
                  />
                </div>
              </div>

              <div className="filter-item">
                <div className="filter-label">Remote Opportunity</div>
                <div className="filter-box">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="remote"
                      value={1}
                      onChange={() =>
                        addFilter({ label: "Yes", value: 1 }, "remote")
                      }
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="remote"
                      value={0}
                      onChange={() =>
                        addFilter({ label: "No", value: 0 }, "remote")
                      }
                    />
                    <label className="form-check-label">No</label>
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
                  <Select options={jobTitles} placeholder="Select title" />
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
              {Object.keys(filters).length ? (
                <>
                  <div className="results-filter-wrapper">
                    <h3 className="title">Filters</h3>
                    <div className="inner">
                      <ul className="results-filter">
                        {Object.keys(filters).map((item) => {
                          if (Array.isArray(filters[item])) {
                            return filters[item].map((i, key) => {
                              return (
                                <li key={i.value}>
                                  <a
                                    href="#"
                                    onClick={() => removeFilter(item, key)}
                                  >
                                    <span className="close-value">x</span>
                                    {i.label}
                                  </a>
                                </li>
                              );
                            });
                          } else {
                            return (
                              <li key={item.value}>
                                <a href="#" onClick={() => removeFilter(item)}>
                                  <span className="close-value">x</span>
                                  {filters[item].label}
                                </a>
                              </li>
                            );
                          }
                        })}
                      </ul>
                      <a
                        href="#"
                        onClick={() => {
                          setFilters({});
                          filterJobs({});
                        }}
                      >
                        Clear all
                      </a>
                    </div>
                  </div>
                  <div className="jobs-alert-ordering-wrapper">
                    <div className="results-count">
                      Showing all {jobs.length} results
                    </div>
                    <div className="jobs-ordering-wrapper"></div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="jobs-list-container">
                {jobs.length ? (
                  jobs.map((item) => (
                    <div className="job-item" key={item.id}>
                      <div className="d-flex align-items-center flex-md-nowrap flex-wrap gap-md-0 gap-3">
                        <div className="inner-left">
                          <div className="employer-logo">
                            <Link to={"/job/" + item.slug}>
                              <img
                                width="150"
                                height="150"
                                src={item.agency.logo}
                                className=""
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="meta row w-100 align-items-center">
                            <div className="job-list-content col-md-8">
                              <div className="title-wrapper flex-middle-sm">
                                <h5 className="employer-name mb-0">
                                  <Link
                                    className="link-dark"
                                    to={"/agency/" + item.agency.slug}
                                  >
                                    {item.agency.name}
                                  </Link>
                                </h5>
                                <h2 className="job-title">
                                  <Link to={"/job/" + item.slug}>
                                    {item.title}
                                  </Link>
                                </h2>
                              </div>
                              <div className="job-metas">
                                <div className="d-flex flex-wrap">
                                  <div className="category-job">
                                    <div className="job-category with-icon">
                                      <IoBriefcaseOutline />
                                      <Link
                                        to={
                                          "/job-category/" +
                                          item.category
                                            .toLowerCase()
                                            .replace(" ", "-")
                                        }
                                      >
                                        {item.category}
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="job-deadline with-icon">
                                    <i className="flaticon-wall-clock"></i>
                                    {moment(item.expired_at).format("MMMM D, YYYY")}
                                  </div>
                                </div>
                                <div>
                                  <div className="job-type with-title">
                                    <Link
                                      className="type-job"
                                      to={"/job-type/" + item.employment_type}
                                    >
                                      {item.employment_type}
                                    </Link>
                                  </div>
                                  {Object.keys(item.priority).map((key) => {
                                    if (item.priority[key]) {
                                      let parts = key.split("_");
                                      let type = parts[1];
                                      return (
                                        <Tooltip title={type} type={type}>
                                          <button className="btn p-0 border-0 me-2">
                                            <IoStar
                                              size={20}
                                              className={
                                                "icon-rounded star-badge " +
                                                type
                                              }
                                            />
                                          </button>
                                        </Tooltip>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                                <a className="btn-follow btn-action-job btn-add-job-shortlist">
                                  <i className="flaticon-bookmark"></i>
                                </a>
                                <Link
                                  to={item.external_link}
                                  target="_blank"
                                  className="btn btn-apply btn-apply-job-external "
                                >
                                  Apply Now
                                  <i className="next flaticon-right-arrow"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Jobs found</p>
                )}
                {meta.total > 10 ? (
                  <div className="row mt-3">
                    <div className="col-12">
                      <p className="user-count">
                        Viewing {meta.from} - {meta.to} of {meta.total} Jobs
                      </p>
                      <div className="user-pagination">
                        <nav>
                          <ul className="pagination">
                            <li
                              className={
                                "page-item" +
                                (meta.current_page == 1 ? " disabled" : "")
                              }
                              onClick={() => paginate(meta.current_page - 1)}
                            >
                              <a
                                className="page-link"
                                href="#"
                                aria-label="Previous"
                              >
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            {Array.apply(null, { length: meta.last_page }).map(
                              (item, index) => (
                                <li
                                  className={
                                    "page-item " +
                                    (meta.current_page == index + 1
                                      ? "active"
                                      : "")
                                  }
                                  onClick={() => paginate(index + 1)}
                                >
                                  <a className="page-link" href="#">
                                    {index + 1}
                                  </a>
                                </li>
                              )
                            )}
                            <li
                              className={
                                "page-item" +
                                (meta.current_page == meta.last_page
                                  ? " disabled"
                                  : "")
                              }
                              onClick={() => paginate(meta.current_page + 1)}
                            >
                              <a
                                className="page-link"
                                href="#"
                                aria-label="Next"
                              >
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
