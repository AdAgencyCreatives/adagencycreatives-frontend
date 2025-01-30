import Select from "../../components/Select";
import Select2 from "react-select";

import "../../styles/Jobs.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBack, IoArrowForward, IoBriefcaseOutline, IoMenu, IoStar } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import JobList from "../../components/job/JobList";
import { Drawer } from "@mui/material";

import DelayedOutput from "../../components/DelayedOutput";

const emailFreq = [
  { value: 1, label: "Daily" },
  { value: 2, label: "Weekly" },
  { value: 3, label: "Monthly" },
];

const Jobs = () => {
  const selectRef = useRef({});
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [jobTitlesSelected, setJobTitlesSelected] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [media, setMedia] = useState([]);
  const [filters, setFilters] = useState({});
  const [notifCategory, setNotifCategory] = useState([]);
  const [agencyName, setAgencyName] = useState("");
  const params = useParams();

  const {
    state: { jobs, meta, links, categories, states, cities, employment_type, media_experiences, job_alerts },
    getJobs,
    getCategories,
    getStates,
    getCities,
    getEmploymentTypes,
    getMediaExperiences,
    filterJobs,
    searchJobs,
    paginateJob,
    requestNotifications,
    getJobAlerts,
  } = useContext(JobsContext);

  const {
    state: { token, user },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  const getLocationFilter = (field, params) => {
    return params[field]?.toLowerCase()?.replace(/ /g, "-");
  };

  useEffect(() => {
    if (Object.keys(params).length) {
      for (var field in params) {
        const filter = {
          [field]: {
            label: params[field].replace(/-/g, " "),
            value: field.indexOf("slug") >= 0 ? getLocationFilter(field, params) : params[field],
          },
        };
        setFilters(filter);
        if (field == "search") searchJobs(params[field], user);
        else filterJobs(filter, user);
      }
    } else {
      getJobs(user);
    }
    getCategories();
    user?.uuid && getJobAlerts(user?.uuid);
    getStates();
    getEmploymentTypes();
    getMediaExperiences();
  }, [user, params]);

  useEffect(() => {
    if (job_alerts.length) {
      const categories_selected = job_alerts.map((item) => {
        return item.category;
        // return { label: item.category, value: item.category_id };
      });
      console.log("categories_selected", categories_selected);
      setJobTitlesSelected(categories_selected);
    }
  }, [job_alerts]);

  useEffect(() => {
    //console.log({ selectRef });
  }, [selectRef]);

  /*   useEffect(() => {
    for (var field in params) {
      setFilters({ [field]: { label: params[field], value: params[field] } });
    }
  }, [params]);
 */

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

  const addFilter = (item, { action }, type) => {
    console.log(selectRef);
    let updatedFilters;
    if (action == "select-option") {
      updatedFilters = { ...filters, [type]: item };
      setFilters(updatedFilters);
      filterJobs(updatedFilters);
      setMobileOpen(false);
    }
  };

  const removeFilter = (item, key = false) => {

    if (item == 'agency') {
      setAgencyName("");
    }

    selectRef.current[item]?.clearValue();
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
    paginateJob(page, filters, () => {
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    });
  };

  const drawerWidth = "75%";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getFilters = (drawer = false) => (
    <div className="filters">
      <h1 className="jobs-filter-title">Search Jobs</h1>
      <div className="filter-item">
        <div className="filter-label">Industry Job Title</div>
        <div className="filter-box">
          <Select
            //
            key={"title"}
            name="title"
            isClearable={true}
            ref={(ref) => (selectRef.current["title" + (drawer ? "-d" : "")] = ref)}
            options={jobTitles}
            placeholder="select one"
            onChange={(item, action) => addFilter(item, action, "title")}
          />
        </div>
      </div>

      <div className="filter-item">
        <div className="filter-label">Job Location (State / Major City)</div>
        <div className="filter-box mb-3">
          <Select options={statesList} ref={(ref) => (selectRef.current["state" + (drawer ? "-d" : "")] = ref)} onChange={changeState} placeholder="Filter By State" />
        </div>
        <div className="filter-box">
          <Select
            options={citiesList}
            ref={(ref) => (selectRef.current["city" + (drawer ? "-d" : "")] = ref)}
            placeholder="Filter By City"
            onChange={(item, action) => addFilter(item, action, "city")}
          />
        </div>
      </div>

      <div className="filter-item">
        <div className="filter-label">Employment Type</div>
        <div className="filter-box">
          <Select
            options={employment}
            ref={(ref) => (selectRef.current["employment_type" + (drawer ? "-d" : "")] = ref)}
            placeholder="select one"
            onChange={(item, action) => addFilter(item, action, "employment_type")}
          />
        </div>
      </div>

      <div className="filter-item">
        <div className="filter-label">Media Experience</div>
        <div className="filter-box">
          <Select
            options={media}
            ref={(ref) => (selectRef.current["media_experience" + (drawer ? "-d" : "")] = ref)}
            isMulti
            placeholder="select up to three"
            onChange={(item, action) => addFilter(item, action, "media_experience")}
          />
        </div>
      </div>

      <div className="filter-item">
        <div className="filter-label">Remote Opportunity</div>
        <div className="filter-box">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="remote" value={1} onChange={() => addFilter({ label: "Remote: Yes", value: 1 }, { action: "select-option" }, "remote")} />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="remote" value={0} onChange={() => addFilter({ label: "Remote: No", value: 0 }, { action: "select-option" }, "remote")} />
            <label className="form-check-label">No</label>
          </div>
        </div>
      </div>

      <div className="filter-item">
        <div className="filter-label">Agency Name</div>
        <div className="filter-box">
          <input
            className="form-control"
            key={"agency"}
            type="text"
            name="agency"
            placeholder="Agency Name"
            value={agencyName}
            onChange={(e) => { setAgencyName(e.target.value) }}
          />
        </div>
      </div>

      <div className="filter-btn">
        <button className="btn btn-filter" onClick={(e) => {
          addFilter({ label: "Agency: " + agencyName, value: agencyName }, { action: "select-option" }, "agency")
        }}>Find Jobs</button>
      </div>

      {user && user.role !== 'agency' &&
        <div className="job_notification">
          <h1 className="jobs-filter-title">Request Job Notifications</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await requestNotifications(user.uuid, notifCategory.notif_title);
              showAlert("Job notifications enabled successfully");
            }}
          >
            <div className="notif-input-box">
              <h5 className="notif-title fw-normal">Title</h5>
              {/* {console.log(jobTitles.filter((item) => jobTitlesSelected.includes(item.label)))} */}
              <Select
                className="dropdown-container"
                options={jobTitles}
                isMulti={true}
                placeholder="Select title"
                onChange={(item) => handleMultiChange(item, "notif_title")}
                defaultValue={jobTitles && jobTitlesSelected && jobTitles.filter((item) => jobTitlesSelected.includes(item.label))}
                required={true}
                name="notif_title"
                ref={(ref) => (selectRef.current["notif_title" + (drawer ? "-d" : "")] = ref)}
              // value={1}
              />
            </div>
            <div className="job-alert-button">
              <button className="btn btn-filter w-100">Save Job Alert</button>
            </div>
          </form>
        </div>}
    </div>
  );

  const handleMultiChange = (item, name) => {
    const values = item.map((i) => i.value);
    setNotifCategory((prev) => ({ ...prev, [name]: values }));
  };

  const getDrawer = () => (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { sm: "block", md: "none" },
        "& .MuiDrawer-paper": {
          //boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      {getFilters(true)}
    </Drawer>
  );

  return (
    <div className="light-container page-jobs mb-2 mt-md-5 mt-4">
      <div className="container-fluid px-md-5 px-3">
        <div className="row">
          <div className="col-md-4">
            {/* Jobs Sidebar */}
            <div className="d-md-block d-none">{getFilters()}</div>
            {getDrawer()}
          </div>
          <div className="col-md-8">
            {/* Jobs List */}

            <div className="jobs-list-container">
              <div className="sidebar-toggle d-md-none d-inline-block">
                <IoMenu onClick={() => setMobileOpen((prevState) => !prevState)} />
              </div>
              {Object.keys(filters)?.length > 0 ? (
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
                                  <a href="javascript:void(0)" onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeFilter(item, key);
                                    return false;
                                  }}>
                                    <span className="close-value">x</span>
                                    &nbsp;{i.label}
                                  </a>
                                </li>
                              );
                            });
                          } else {
                            return (
                              <li key={item.value}>
                                <a href="javascript:void(0)" onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  removeFilter(item);
                                  return false;
                                }}>
                                  <span className="close-value">x</span>
                                  &nbsp;{filters[item].label}
                                </a>
                              </li>
                            );
                          }
                        })}
                      </ul>
                      <a
                        href="javascript:void(0)"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFilters({});
                          filterJobs({});
                          return false;
                        }}
                      >
                        Clear all
                      </a>
                    </div>
                  </div>
                  <div className="jobs-alert-ordering-wrapper">
                    <div className="results-count">Showing all {jobs.length} results</div>
                    <div className="jobs-ordering-wrapper"></div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="jobs-list-container">
                {meta && meta?.total > 9 && (
                  <div className="row mt-3">
                    <div className="col-12">
                      <p className="user-count">
                        Viewing {meta.from} - {meta.to} of {meta.total} Jobs
                      </p>
                      <div className="user-pagination">
                        <nav>
                          <ul className="pagination">
                            <li className={"page-item" + (meta.current_page == 1 ? " disabled" : "")} onClick={() => paginate(meta.current_page - 1)}>
                              <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            {Array.apply(null, { length: meta.last_page }).map((item, index) => (
                              <li className={"page-item " + (meta.current_page == index + 1 ? "active" : "")} onClick={() => paginate(index + 1)} key={"page" + index}>
                                <a className="page-link" href="javascript:void(0)">
                                  {index + 1}
                                </a>
                              </li>
                            ))}
                            <li className={"page-item" + (meta.current_page == meta.last_page ? " disabled" : "")} onClick={() => paginate(meta.current_page + 1)}>
                              <a className="page-link" href="javascript:void(0)" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
                {jobs?.length > 0 ? (
                  <JobList data={jobs} />
                ) : (<>
                  <DelayedOutput delay={5000}>
                    <p>No Jobs found</p>
                  </DelayedOutput>
                </>)}
                {meta && meta?.total > 9 && (
                  <div className="row mt-3">
                    <div className="col-12">
                      <p className="user-count">
                        Viewing {meta.from} - {meta.to} of {meta.total} Jobs
                      </p>
                      <div className="user-pagination">
                        <nav>
                          <ul className="pagination">
                            <li className={"page-item" + (meta.current_page == 1 ? " disabled" : "")} onClick={() => paginate(meta.current_page - 1)}>
                              <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            {Array.apply(null, { length: meta.last_page }).map((item, index) => (
                              <li className={"page-item " + (meta.current_page == index + 1 ? "active" : "")} onClick={() => paginate(index + 1)} key={"page" + index}>
                                <a className="page-link" href="javascript:void(0)">
                                  {index + 1}
                                </a>
                              </li>
                            ))}
                            <li className={"page-item" + (meta.current_page == meta.last_page ? " disabled" : "")} onClick={() => paginate(meta.current_page + 1)}>
                              <a className="page-link" href="javascript:void(0)" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
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
