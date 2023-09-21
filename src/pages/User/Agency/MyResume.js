import { useEffect, useState } from "react";
import Select from "react-select";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Logo from "../../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { FiPaperclip, FiTrash2 } from "react-icons/fi";

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

  const [cities, setCities] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log("mounted");
    return () => {
      setIsMounted(false);
    };
  }, []);

  const changeState = ({ value }, { action }) => {
    if (action == "select-option") {
      setCities(citiesArray[value]);
    }
  };

  const qualifications = [
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
      name: "experience",
      data: experience,
      placeholder: "",
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
      name: "experience",
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
  ];

  const getFormField = function (field) {
    switch (field.type) {
      case "image":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input
              type="hidden"
              class="input-text"
              name="_employer_featured_image"
              value=""
            />
            <div className="row align-items-center upload-box">
              <div className="col-2">
                <img src={Logo} />
              </div>
              <div className="col-3">
                <button className="btn btn-secondary w-100 mb-2 text-uppercase">
                  <FiPaperclip /> Upload
                </button>
                <button className="btn btn-secondary w-100 text-uppercase">
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
            <div class="form-check">
              <input
                type="radio"
                className="form-check-input me-2"
                name={field.name}
                value={1}
              />
              <label class="form-check-label" for={field.name}>
                Yes
              </label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                className="form-check-input me-2"
                name={field.name}
                value={0}
              />
              <label class="form-check-label" for={field.name}>
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
    }
  };

  return (
    <div className="agency-page-my-resume">
      <h3 className="page-title">Edit Resume</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Qualifications</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {qualifications.map((field) => {
              return (
                <div className={`col-${field.column}`} key={field.name}>
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
          <div className="row gx-3 gy-5 align-items-end"></div>
          <div className="submit-btn mt-4">
            {/* <button className="btn btn-dark btn-hover-primary border-0 px-3 py-2">
              Save Resume
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResume;
