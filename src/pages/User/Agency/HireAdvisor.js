import { useContext, useEffect, useRef, useState } from "react";
import "../../../styles/AgencyDashboard/Profile.scss";
import Select from "../../../components/Select";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { FiPaperclip, FiTrash2 } from "react-icons/fi";
import Loader from "../../../components/Loader";
import { CircularProgress } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFormData from "../../../hooks/useFormData";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";

const HireAdvisor = () => {
  const {
    state: { formSubmit },
    requestPackage,
  } = useContext(AgenciesContext);

  const {
    states: {
      employment_type,
      categoriesList,
      statesList,
      citiesList,
      strengthsList,
      media,
      employment,
      experience,
      industry,
      editorState,
      isMounted,
      fields,
      formData,
      user
    },
    changeState,
    handleTextChange,
    handleRadioChange,
    handleDateChange,
    handleMultiChange,
    handleEditorChange,
    handleDropdownChange,
    setFields,
    setFormData,
  } = useFormData();

  const [isLoading, setIsloading] = useState(true);

  const start_date = [
    { label: "ASAP", value: "ASAP" },
    { label: "In 2 days", value: "In 2 days" },
    { label: "In 1 week", value: "In 1 week" },
    { label: "In 1 month", value: "In 1 month" },
  ];

  // Set initial fields
  useEffect(() => {
    if (
      industry.length &&
      media.length &&
      statesList.length &&
      categoriesList.length &&
      employment_type.length &&
      strengthsList.length &&
      experience.length
    ) {
      setIsloading(false);

      setFields([
        {
          label: "Title",
          required: true,
          type: "dropdown",
          name: "category_id",
          data: categoriesList,
          callback: (item) => handleDropdownChange(item, "category_id"),
          placeholder: "Select Title",
        },

        {
          label: "Timing",
          required: true,
          type: "dropdown",
          name: "start_date",
          data: start_date,
          callback: (item) => handleDropdownChange(item, "start_date"),
          placeholder: "When do you need to start",
        },

        {
          label: "Job Location (State / Major City)",
          required: true,
          type: "dropdown",
          name: "state_id",
          data: statesList,
          callback: (item) => changeState(item, "state_id"),
          placeholder: "Select State",
        },
        {
          label: "",
          type: "dropdown",
          name: "city_id",
          data: citiesList,
          placeholder: "Select City",
          callback: (item) => handleDropdownChange(item, "city_id"),
        },
        {
          label: "Employment Type",
          required: true,
          type: "dropdown",
          data: employment,
          name: "employment_type",
          callback: (item) => handleDropdownChange(item, "employment_type"),
        },
        {
          label: "Salary Range",
          required: true,
          type: "text",
          name: "salary_range",
          placeholder: "if required by your state",
        },

        {
          label: "Industry Experience",
          required: true,
          type: "dropdown",
          data: industry,
          isMulti: true,
          name: "industry_experience",
          callback: (item) => handleMultiChange(item, "industry_experience"),
        },
        {
          label: "Media Experience",
          required: true,
          type: "dropdown",
          data: media,
          isMulti: true,
          name: "media_experience",
          callback: (item) => handleMultiChange(item, "media_experience"),
        },
        {
          label: "Open to Remote",
          required: true,
          type: "radio",
          name: "is_opentoremote",
        },
        {
          label: "Open to Relocation",
          required: true,
          type: "radio",
          name: "is_opentorelocation",
        },
        {
          label: "Additional Comments",
          required: false,
          type: "textarea",
          name: "comments",
          placeholder: "Specific needs for this opportunity",
        },
      ]);
    }
  }, [
    media,
    industry,
    statesList,
    categoriesList,
    employment,
    experience,
    strengthsList,
    citiesList
  ]);

  //Set initial form data
  useEffect(() => {
    setFormData({
      category_id: "",
      start_date: "",
      employment_type: "",
      industry_experience: [],
      media_experience: [],
      salary_range: "",
      is_opentoremote: 0,
      is_opentorelocation: 0,
      comments: "",
    });
  }, []);

  const handleSubmit = () => {
    formData.user_id = user.uuid;
    requestPackage(formData);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="agency-page-job-edit">
      <h3 className="page-title">Hire An Advisor</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Tell us about your creative needs</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {fields.map((field, index) => {
              switch (field.type) {
                case "text":
                  return (
                    <div className="col-sm-6" key={index}>
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
                    </div>
                  );

                case "textarea":
                  return (
                    <div className="col-sm-12" key={index}>
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      <textarea
                        className="form-control"
                        value={field.value}
                        onChange={(e) => handleTextChange(e, field.name)}
                        placeholder={field.placeholder}
                      ></textarea>
                    </div>
                  );
                case "date":
                  return (
                    <div className="col-sm-6" key={index}>
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      <br />
                      <DatePicker
                        className="form-control"
                        selected={field.value}
                        onChange={(date) => handleDateChange(date, field.name)}
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                  );
                case "dropdown":
                  return (
                    <div className="col-sm-6" key={index}>
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
                    </div>
                  );
                case "radio":
                  return (
                    <div className="col-sm-6" key={index}>
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
                        <label
                          className="form-check-label"
                          htmlFor={field.name}
                        >
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
                        <label
                          className="form-check-label"
                          htmlFor={field.name}
                        >
                          No
                        </label>
                      </div>
                    </div>
                  );

                case "editor":
                  return (
                    <div className="col-12" key={index}>
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
                    </div>
                  );
              }
            })}
          </div>
          <div className="submit-btn mt-4">
            <button
              className="btn btn-dark btn-hover-primary border-0 px-3 py-2"
              onClick={handleSubmit}
              disabled={formSubmit}
            >
              Send Request
              {formSubmit && <CircularProgress size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireAdvisor;
