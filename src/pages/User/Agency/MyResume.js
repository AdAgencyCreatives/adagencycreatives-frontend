import { useEffect, useRef, useState } from "react";
import Select from "../../../components/Select";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Logo from "../../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import {
  FiChevronDown,
  FiChevronUp,
  FiPaperclip,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import "../../../styles/AgencyDashboard/MyResume.scss";

const MyResume = () => {
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

  const job_titles = [
    { value: 150, label: "Junior Art Director" },
    { value: 117, label: "3D Designer" },
    { value: 147, label: "Art Director" },
    { value: 148, label: "Copywriter" },
    { value: 149, label: "Digital Designer" },
  ];
  const experience = [
    { value: 150, label: "Junior 0-2 years" },
    { value: 117, label: "Mid-Level 2-5 years" },
    { value: 147, label: "Senior 5-10 years" },
    { value: 148, label: "Director 10+ years" },
    { value: 149, label: "Executive 15+ years" },
  ];

  const strengths = [];

  const employment_type = [
    { value: 150, label: "Full-Time" },
    { value: 117, label: "Part-Time" },
    { value: 147, label: "Freelance" },
    { value: 148, label: "Contract" },
    { value: 149, label: "Internship" },
  ];

  const [cities, setCities] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);
  const repeaterRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const changeState = ({ value }, { action }) => {
    if (action == "select-option") {
      setCities(citiesArray[value]);
    }
  };

  const [qualifications, setQualifications] = useState([
    {
      label: "Your Title",
      required: true,
      type: "text",
      name: "_employer_title",
      column: "12",
    },
    {
      label: "Industry Job Title",
      type: "dropdown",
      required: true,
      name: "job_title",
      data: job_titles,
      column: "6",
    },
    {
      label: "Years of Experience",
      type: "dropdown",
      required: true,
      name: "y_experience",
      data: experience,
      placeholder: "",
      column: "6",
    },
    {
      label: "Industry Experience",
      type: "dropdown",
      required: true,
      name: "experience",
      data: experience,
      placeholder: "",
      column: "6",
    },
    {
      label: "Media Experience",
      type: "dropdown",
      required: true,
      name: "m_experience",
      data: experience,
      placeholder: "",
      column: "6",
    },
    {
      label: "Location",
      required: true,
      type: "dropdown",
      name: "_employer_location1",
      data: states,
      callback: changeState,
      placeholder: "Select State",
      column: "6",
    },
    {
      label: "",
      type: "dropdown",
      name: "_employer_location2",
      data: cities,
      placeholder: "Select City",
      column: "6",
    },
    {
      label: "Character Strengths",
      required: true,
      type: "dropdown",
      name: "_employer_strenghts",
      data: strengths,
      placeholder: "Select strengths",
      column: "6",
    },
    {
      label: "Employment Type",
      required: true,
      type: "dropdown",
      name: "_employer_type",
      data: employment_type,
      column: "6",
    },
    {
      label: "Open to Relocation",
      required: true,
      type: "radio",
      name: "_employer_show_profile",
      column: "6",
    },
    {
      label: "Open to Remote",
      required: true,
      type: "radio",
      name: "_employer_profile_url",
      column: "6",
    },

    {
      label: "About Me and Why Advertising",
      required: true,
      type: "editor",
      name: "_employer_description",
      column: "12",
    },

    {
      label: "Education",
      required: false,
      type: "repeater",
      name: "_employer_education",
      column: "12",
      items: [
        {
          showDropdown: false,
          data: [
            {
              label: "Degree Program",
              type: "input",
              name: "_employer_title",
            },
            {
              label: "College or Institution",
              type: "input",
              name: "_employer_title",
            },
            {
              label: "Completion Date",
              type: "input",
              name: "_employer_title",
            },
          ],
        },
      ],
    },
    {
      label: "Experience",
      required: false,
      type: "repeater",
      name: "_employer_experience",
      column: "12",
      items: [
        {
          showDropdown: false,
          data: [
            {
              label: "Title",
              type: "input",
              name: "_employer_title",
            },
            {
              label: "Start Date",
              type: "input",
              name: "_employer_title",
            },
            {
              label: "End Date",
              type: "input",
              name: "_employer_title",
            },
            {
              label: "Company",
              type: "input",
              name: "_employer_title",
            },
            {
              label: "Description",
              type: "textarea",
              name: "_employer_title",
            },
          ],
        },
      ],
    },
  ]);

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
    let newQualifications = [...qualifications];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        item.items.push(Object.assign({}, item.items[0]));
      }
    });
    setQualifications(newQualifications);
  };

  const toggleDropdown = (field, index) => {
    console.log("toggling");
    let newQualifications = [...qualifications];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        item.items[index].showDropdown = !item.items[index].showDropdown;
      }
    });
    setQualifications(newQualifications);
  };

  const deleteDropdown = (field, index) => {
    let newQualifications = [...qualifications];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        console.log(item.items);
        item.items.splice(index, 1);
        console.log(item.items);
      }
    });
    setQualifications(newQualifications);
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
                <img src={Logo} className="w-100" />
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
            <input type="text" className="form-control" />
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
              onChange={field.callback}
              placeholder={field.placeholder}
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
                // control:(baseStyles) => ({
                //   ...baseStyles,
                //   backgroundColor:"#F6F6F6",
                //   borderColor:"white"
                // }),
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
                  console.log(newState);
                  setEditorState(newState);
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

  return (
    <div className="agency-page-my-resume mb-5">
      <h3 className="page-title">Edit Resume</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Qualifications</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {qualifications.map((field) => {
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
        >
          Save Resume
        </button>
      </div>
    </div>
  );
};

export default MyResume;
