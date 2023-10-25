import { useEffect, useRef, useState, useContext } from "react";
import Select from "../../../components/Select";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Placeholder from "../../../assets/images/placeholder.png";
import {
  FiChevronDown,
  FiChevronUp,
  FiPaperclip,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import "../../../styles/AgencyDashboard/MyResume.scss";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import Loader from "../../../components/Loader";
import { CircularProgress } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";

const MyResume = () => {
  const imageUploadRef = useRef();
  const logoRef = useRef();
  const [categoriesList, setCategories] = useState([]);
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [media, setMedia] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [experience, setExperience] = useState([]);
  const [strengthsList, setStrengths] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);
  const repeaterRef = useRef(null);

  const {
    state: { single_creative, formSubmit },
    getCreativeById,
    saveCreative,
    saveCreativeImage,
  } = useContext(CreativesContext);

  const {
    state: {
      categories,
      states,
      cities,
      media_experiences,
      industry_experiences,
      employment_type,
      years_experience,
      strengths,
    },
    getCategories,
    getStates,
    getCities,
    getMediaExperiences,
    getIndustryExperiences,
    getEmploymentTypes,
    getYearsExperience,
    getStrengths,
  } = useContext(DataContext);

  const {
    state: { user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getCreativeById(user.uuid);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      console.log("yes");
      getCategories();
      getStates();
      getMediaExperiences();
      getIndustryExperiences();
      getEmploymentTypes();
      getYearsExperience();
      getStrengths();
    }
    console.log("asd");
  }, [token]);

  // Set initial fields
  useEffect(() => {
    if (
      Object.keys(single_creative).length &&
      industry.length &&
      media.length &&
      statesList.length &&
      (single_creative.location ? citiesList.length : true) &&
      categoriesList.length &&
      employment_type.length &&
      strengthsList.length &&
      experience.length
    ) {
      setIsloading(false);
      if (single_creative.about) {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              htmlToDraft(single_creative.about).contentBlocks
            )
          )
        );
      }
      setFields([
        {
          label: "Your Title",
          required: true,
          type: "text",
          name: "title",
          column: "12",
          value: single_creative.title || "",
        },
        {
          label: "Industry Job Title",
          type: "dropdown",
          required: true,
          column: "6",
          name: "category_id",
          data: categoriesList,
          callback: (item) => handleDropdownChange(item, "category_id"),
          placeholder: "Select Job Title",
          value: categoriesList.find(
            (category) => category.label == single_creative.category
          ),
        },
        {
          label: "Years of Experience",
          type: "dropdown",
          required: true,
          data: experience,
          name: "years_of_experience",
          callback: (item) => handleDropdownChange(item, "years_of_experience"),
          value: experience.find(
            (item) => item.value == single_creative.years_of_experience
          ),
          column: "6",
        },
        {
          label: "Industry Experience",
          type: "dropdown",
          required: true,
          data: industry,
          isMulti: true,
          name: "industry_experience",
          callback: (item) => handleMultiChange(item, "industry_experience"),
          value: industry.filter((item) =>
            single_creative.industry_experience.includes(item.label)
          ),
          column: "6",
        },
        {
          label: "Media Experience",
          type: "dropdown",
          required: true,
          data: media,
          isMulti: true,
          name: "media_experience",
          callback: (item) => handleMultiChange(item, "media_experience"),
          value: media.filter((item) =>
            single_creative.media_experience.includes(item.label)
          ),
          column: "6",
        },
        {
          label: "Location",
          required: true,
          type: "dropdown",
          name: "state_id",
          data: statesList,
          callback: (item) => changeState(item, "state_id"),
          placeholder: "Select State",
          value:
            single_creative.location &&
            statesList.find(
              (state) => state.value == single_creative.location.state_id
            ),
          column: "6",
        },
        {
          label: "",
          type: "dropdown",
          name: "city_id",
          data: citiesList,
          placeholder: "Select City",
          callback: (item) => handleDropdownChange(item, "city_id"),
          value:
            single_creative.location &&
            citiesList.find(
              (city) => city.value == single_creative.location.city_id
            ),
          column: "6",
        },
        {
          label: "Character Strengths",
          required: true,
          type: "dropdown",
          data: strengthsList,
          isMulti: true,
          name: "strengths",
          callback: (item) => handleMultiChange(item, "strengths"),
          value: strengthsList.filter((item) =>
            single_creative.character_strengths.includes(item.label)
          ),
          placeholder: "Select strengths",
          column: "6",
        },
        {
          label: "Employment Type",
          required: true,
          type: "dropdown",
          data: employment,
          name: "employment_type",
          callback: (item) => handleDropdownChange(item, "employment_type"),
          value: employment.find((item) => {
            return item.value == single_creative.employment_type;
          }),
          column: "6",
        },
        {
          label: "Open to Relocation",
          required: true,
          type: "radio",
          name: "is_opentorelocation",
          value: single_creative.is_opentorelocation,
          column: "6",
        },
        {
          label: "Open to Remote",
          required: true,
          type: "radio",
          name: "is_remote",
          value: single_creative.workplace_preference.is_remote,
          column: "6",
        },

        {
          label: "About Me and Why Advertising",
          required: true,
          type: "editor",
          name: "about",
          value: single_creative.about,
          column: "12",
        },

        {
          label: "Education",
          required: false,
          type: "repeater",
          name: "educations",
          column: "12",
          items: [
            {
              showDropdown: false,
              data: [
                {
                  label: "Degree Program",
                  type: "input",
                  name: "degree",
                },
                {
                  label: "College or Institution",
                  type: "input",
                  name: "college",
                },
                {
                  label: "Completion Date",
                  type: "input",
                  name: "completed_at",
                },
              ],
            },
          ],
        },
        {
          label: "Experience",
          required: false,
          type: "repeater",
          name: "experiences",
          column: "12",
          items: [
            {
              showDropdown: false,
              data: [
                {
                  label: "Title",
                  type: "input",
                  name: "title",
                },
                {
                  label: "Start Date",
                  type: "input",
                  name: "started_at",
                },
                {
                  label: "End Date",
                  type: "input",
                  name: "completed_at",
                },
                {
                  label: "Company",
                  type: "input",
                  name: "company",
                },
                {
                  label: "Description",
                  type: "textarea",
                  name: "description",
                },
              ],
            },
          ],
        },
      ]);
    }
  }, [
    single_creative,
    user,
    media,
    industry,
    statesList,
    categoriesList,
    citiesList,
    employment,
    experience,
    strengthsList,
  ]);

  //Set initial form data
  useEffect(() => {
    if (Object.keys(single_creative).length > 0 && !isLoading) {
      setFormData({
        state_id: single_creative.location && single_creative.location.state_id,
        city_id: single_creative.location && single_creative.location.city_id,
        about: single_creative.about,
        employment_type: single_creative.employment_type,
        years_of_experience: single_creative.years_of_experience,
        industry_experience: single_creative.industry_experience.map(
          (item) => industry_experiences.find((j) => j.name == item).id
        ),
        media_experience: single_creative.media_experience.map(
          (item) => media_experiences.find((j) => j.name == item).id
        ),
        strengths: single_creative.character_strengths.map(
          (item) => strengths.find((j) => j.name == item).id
        ),
        is_remote: single_creative.workplace_preference.is_remote,
        is_opentorelocation: single_creative.is_opentorelocation,
      });
    }
  }, [isLoading, media_experiences, industry_experiences, strengths]);

  //Fetch initial Cities
  useEffect(() => {
    if (
      Object.keys(single_creative).length > 0 &&
      single_creative.location &&
      citiesList.length === 0
    ) {
      getCities(single_creative.location.state_id);
    }
  }, [single_creative, citiesList]);

  useEffect(() => {
    let data = categories;
    if (categories.length) {
      data = parseFieldsData(categories);
    }
    setCategories(data);
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
    let data = industry_experiences;
    if (industry_experiences.length) {
      data = parseFieldsData(industry_experiences);
    }
    setIndustry(data);
  }, [industry_experiences]);

  useEffect(() => {
    let data = strengths;
    if (strengths.length) {
      data = parseFieldsData(strengths);
    }
    setStrengths(data);
  }, [strengths]);

  useEffect(() => {
    setEmployment(
      employment_type.map((item) => ({ label: item, value: item }))
    );
  }, [employment_type]);

  useEffect(() => {
    setExperience(
      years_experience.map((item) => ({ label: item.name, value: item.name }))
    );
  }, [years_experience]);

  const parseFieldsData = (data) => {
    const parsedValue = data.map((item) => {
      return { label: item.name, value: item.uuid || item.id, key: item.name };
    });
    return parsedValue;
  };

  const changeState = (item, name) => {
    getCities(item.value);
    handleDropdownChange(item, name);
  };

  const handleTextChange = (e, name) => {
    const value = e.target.value;
    updateFields(value, name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e, name) => {
    const value = parseInt(e.target.value);
    updateFields(value, name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateFields = (value, name) => {
    let newFields = [...fields];
    const fieldIndex = newFields.findIndex((item) => item.name == name);
    newFields[fieldIndex].value = value;
    setFields([...newFields]);
  };

  const handleDropdownChange = (item, name) => {
    setFormData((prev) => ({ ...prev, [name]: item.value }));
  };

  const handleMultiChange = (item, name) => {
    const values = item.map((i) => i.value);
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleEditorChange = (editorState, name) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const contentStateText = contentState.getPlainText(); // This gives you the plain text content
    const contentStateRaw = convertToRaw(contentState); // This gives you the content in a raw format
    const html = draftToHtml(contentStateRaw);
    setFormData((prev) => ({ ...prev, [name]: html }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = () => {
    saveCreative(user.uuid, formData);
  };

  const removeLogo = () => {
    logoRef.current.src = "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    logoRef.current.src = URL.createObjectURL(file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uuid);
      formData.append("resource_type", "agency_logo");
      // saveAgencyImage(formData);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const portfolio = [
    {
      label: "Upload up to 5 samples of your best work. A sneak peak.",
      required: true,
      type: "upload",
      name: "_employer_featured_image",
    },
    {
      label: "Upload your resume here.",
      required: true,
      type: "upload",
      name: "_employer_resume",
    },
  ];

  const addRepeaterField = (field) => {
    let newQualifications = [...fields];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        item.items.push(Object.assign({}, item.items[0]));
      }
    });
    setFields(newQualifications);
  };

  const toggleDropdown = (field, index) => {
    console.log("toggling");
    let newQualifications = [...fields];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        item.items[index].showDropdown = !item.items[index].showDropdown;
      }
    });
    setFields(newQualifications);
  };

  const deleteDropdown = (field, index) => {
    let newQualifications = [...fields];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        console.log(item.items);
        item.items.splice(index, 1);
        console.log(item.items);
      }
    });
    setFields(newQualifications);
  };

  const RepeaterField = ({ field }) => (
    <div className="repeater-container">
      {field.items.map((item, index) => (
        <div
          className="repeater-field"
          field-id={index + 1}
          key={`repeater${index}`}
        >
          <div
            className="close-btn"
            onClick={() => deleteDropdown(field, index)}
          >
            <FiX />
          </div>
          <div
            className="toggle-btn"
            onClick={() => toggleDropdown(field, index)}
          >
            {item.showDropdown ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          <div className="title" onClick={() => toggleDropdown(field, index)}>
            {field.label} {index + 1}
          </div>
          {item.showDropdown && (
            <div className="field-dropdown">
              {item.data.map((child, index) => (
                <div className="row align-items-start" key={`child${index}`}>
                  <div className="col-sm-3">
                    <label>{child.label}</label>
                  </div>
                  <div className="col-sm-9">
                    {child.type == "input" ? (
                      <input
                        className="form-control"
                        name={child.name}
                        type="text"
                      />
                    ) : (
                      <textarea className="form-control" rows={5}></textarea>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-end">
                <button
                  className="btn btn-secondary w-90 mb-2 text-uppercase ls-3 px-4"
                  onClick={() => deleteDropdown(field, index)}
                >
                  Remove {field.label}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        className="btn btn-secondary w-90 mb-2 text-uppercase ls-3 mt-4 py-3 px-4"
        onClick={() => addRepeaterField(field)}
      >
        Add Another {field.label}
      </button>
    </div>
  );

  const getFormField = function (field) {
    switch (field.type) {
      case "upload":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="hidden"
              className="input-text"
              name="_employer_featured_image"
              value=""
            />
            <div className="row align-items-center upload-box">
              <div className="col-md-2 col-sm-4 col-12">
                <img src={Placeholder} className="w-100" />
              </div>
              <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
                <button className="btn btn-secondary w-90 mb-2 text-uppercase">
                  <FiPaperclip /> Upload
                </button>
                <button className="btn btn-secondary w-90 text-uppercase">
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          </>
        );
      case "text":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="text"
              className="form-control"
              value={field.value}
              onChange={(e) => handleTextChange(e, field.name)}
            />
          </>
        );
      case "radio":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <br />
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input me-2"
                name={field.name}
                value={1}
                checked={field.value}
                onChange={(e) => handleRadioChange(e, field.name)}
              />
              <label className="form-check-label" htmlFor={field.name}>
                Yes
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input me-2"
                name={field.name}
                value={0}
                checked={!field.value}
                onChange={(e) => handleRadioChange(e, field.name)}
              />
              <label className="form-check-label" htmlFor={field.name}>
                No
              </label>
            </div>
          </>
        );
      case "dropdown":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <Select
              options={field.data}
              isMulti={field.isMulti || false}
              onChange={field.callback}
              placeholder={field.placeholder}
              defaultValue={field.value}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  padding: "11px",
                  backgroundColor: "#F6F6F6",
                  border: "none",
                }),
                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  padding: "0px",
                  fontSize: 20,
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "#696969",
                }),
              }}
            />
          </>
        );

      case "editor":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            {isMounted && (
              <Editor
                editorState={editorState}
                toolbarClassName="editorToolbar"
                wrapperClassName="editorWrapper"
                editorClassName="editorBody"
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "link",
                  ],
                }}
                onEditorStateChange={(newState) => {
                  handleEditorChange(newState, field.name);
                }}
              />
            )}
          </>
        );

      case "repeater":
        return (
          <div className="repeater-field" ref={repeaterRef}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <RepeaterField field={field} />
          </div>
        );
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="agency-page-my-resume mb-5">
      <h3 className="page-title">Edit Resume</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Qualifications</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {fields.map((field) => {
              return (
                <div className={`col-sm-${field.column}`} key={field.name}>
                  {getFormField(field)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-uppercase mb-4">Portfolio</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {portfolio.map((field) => {
              return (
                <div className={`col-${field.column}`} key={field.name}>
                  {getFormField(field)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="submit-btn mt-4">
        <button
          className="btn btn-dark btn-hover-primary border-0 px-3 py-2 ls-3 text-uppercase"
          style={{ fontSize: 20 }}
          onClick={handleSubmit}
          disabled={formSubmit}
        >
          Save Profile {formSubmit && <CircularProgress size={20} />}
        </button>
      </div>
    </div>
  );
};

export default MyResume;
