import { useEffect, useState } from "react";
import "../../../styles/AgencyDashboard/Profile.scss";
import Select from "react-select";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Profile = () => {
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
    console.log("mounted")
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
      label: "Company Name",
      required: true,
      type: "text",
      name: "_employer_title",
    },
    {
      label: "Company Website",
      required: true,
      type: "text",
      name: "_employer_website",
    },
    {
      label: "Location",
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
      label: "Company LinkedIn",
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
    <div className="agency-page-profile">
      <h3 className="page-title">Edit Profile</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Edit Profile</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {fields.map((field) => {
              switch (field.type) {
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
                          control:(baseStyles) => ({
                            ...baseStyles,
                            padding:"11px",
                            backgroundColor:"#F6F6F6",
                            border:"none"
                          }),
                          valueContainer:(baseStyles) => ({
                            ...baseStyles,
                            padding:"0px",
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
