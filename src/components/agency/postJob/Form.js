import { useEffect, useState } from "react";
import Select from "react-select";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Logo from "../../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { FiPaperclip, FiTrash2 } from "react-icons/fi";

const Form = () => {
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

  const fields = [
    {
      label: "Agency Logo only upload if it’s different from your profile logo",
      required: false,
      type: "image",
      name: "_employer_featured_image",
    },
    {
      label: "Agency Job Title",
      required: true,
      type: "text",
      name: "_employer_title",
    },
    {
      label: "Job Location (State / Major City)",
      required: true,
      type: "dropdown",
      name: "_employer_location1",
      data: states,
      callback: changeState,
      placeholder: "Select State",
    },
    {
      label: "",
      type: "dropdown",
      name: "_employer_location2",
      data: cities,
      placeholder: "Select City",
    },
    {
      label: "Employment Type",
      type: "dropdown",
      name: "_employer_location2",
      data: cities,
      placeholder: "Select City",
    },
    {
      label: "Salary Range",
      required: true,
      type: "text",
      name: "linkedinlink",
    },
    {
      label: "Contact Email",
      required: true,
      type: "text",
      name: "_employer_email",
    },
    {
      label: "Contact First Name",
      required: true,
      type: "text",
      name: "employer-contact-firstname",
    },
    {
      label: "Contact Last Name",
      required: true,
      type: "text",
      name: "employer-contact-lastname",
    },
    {
      label: "Contact Phone Number *",
      required: true,
      type: "text",
      name: "_employer_phone",
    },
    {
      label: "About Your Company",
      required: true,
      type: "editor",
      name: "_employer_description",
    },
    {
      label: "Industry Specialty",
      required: true,
      type: "dropdown",
      name: "_employer_category",
    },
    {
      label: "Company Size",
      required: true,
      type: "text",
      name: "_employer_company_size",
    },
    {
      label: "Show Company Profile",
      required: true,
      type: "dropdown",
      name: "_employer_show_profile",
    },
    {
      label: "Your Ad Agency Creatives Profile URL",
      required: true,
      type: "text",
      name: "_employer_profile_url",
    },
  ];
  return (
    <div className="agency-page-postjob">
      <h3 className="page-title">Post a New Job</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Opportunity Details</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {fields.map((field) => {
              switch (field.type) {
                case "image":
                  return (
                    <div className="col-12" key={field.name}>
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
                    </div>
                  );
                case "text":
                  return (
                    <div className="col-6" key={field.name}>
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  );
                case "dropdown":
                  return (
                    <div className="col-6" key={field.name}>
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
                    </div>
                  );

                case "editor":
                  return (
                    <div className="col-12" key={field.name}>
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
                    </div>
                  );
              }
            })}
          </div>
          <div className="submit-btn mt-4">
            <button className="btn btn-dark btn-hover-primary border-0 px-3 py-2">
              Save & Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
