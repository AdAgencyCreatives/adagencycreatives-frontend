import { useContext, useEffect, useRef, useState } from "react";
import "../../styles/AgencyDashboard/Profile.scss";
import Select from "../../components/Select";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { FiPaperclip, FiTrash2 } from "react-icons/fi";
import Loader from "../../components/Loader";
import { CircularProgress } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import useFormData from "../../hooks/useFormData";

const JobPostForm = ({ id, setJobStatus }) => {

  const {
    states: {
      single_job,
      employment_type,
      categoriesList,
      statesList,
      citiesList,
      strengthsList,
      media,
      employment,
      experience,
      industry,
      media_experiences,
      industry_experiences,
      strengths,
      editorState,
      isMounted,
      fields,
      formSubmit,
      imageUploadRef,
      logoRef,
      linkRef,
    },
    changeState,
    handleTextChange,
    handleRadioChange,
    handleDateChange,
    handleMultiChange,
    handleEditorChange,
    handleDropdownChange,
    handleSubmit,
    removeLogo,
    handleFileChange,
    setFields,
    setEditorState,
    setFormData,
    setEditorRef
  } = useFormData({ id, setJobStatus });

  const [isLoading, setIsloading] = useState(true);
  const isEdit = id !== undefined;

  const apply_type = [
    { label: "Internal", value: "Internal" },
    { label: "External URL", value: "External" },
  ];

  // Set initial fields
  useEffect(() => {
    if (
      (Object.keys(single_job).length || !isEdit) &&
      (!isEdit || citiesList.length) &&
      industry.length &&
      media.length &&
      statesList.length &&
      categoriesList.length &&
      employment_type.length &&
      strengthsList.length &&
      experience.length
    ) {
      setIsloading(false);
      if (id) {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              htmlToDraft(single_job.description).contentBlocks
            )
          )
        );
      }
      setFields([
        {
          label:
            "Agency Logo only upload if it's different from your profile logo",
          required: false,
          type: "image",
          image: isEdit ? single_job.agency.logo : "",
          name: "company_logo",
        },
        {
          label: "Agency Job Title",
          required: true,
          type: "text",
          name: "title",
          value: isEdit ? single_job.title : "",
        },
        {
          label: "Industry Job Title",
          required: true,
          type: "dropdown",
          name: "category_id",
          data: categoriesList,
          callback: (item) => handleDropdownChange(item, "category_id"),
          placeholder: "Select Job Title",
          value:
            isEdit &&
            categoriesList.find(
              (category) => category.value == single_job.category_id
            ),
        },

        {
          label: "Job Location (State / Major City)",
          required: true,
          type: "dropdown",
          name: "state_id",
          data: statesList,
          callback: (item) => changeState(item, "state_id"),
          placeholder: "Select State",
          value:
            isEdit &&
            statesList.find(
              (state) => state.value == single_job.location.state_id
            ),
        },
        {
          label: "",
          type: "dropdown",
          name: "city_id",
          data: citiesList,
          placeholder: "Select City",
          callback: (item) => handleDropdownChange(item, "city_id"),
          value:
            isEdit &&
            citiesList.find(
              (city) => city.value == single_job.location.city_id
            ),
        },
        {
          label: "Employment Type",
          required: true,
          type: "dropdown",
          data: employment,
          name: "employment_type",
          callback: (item) => handleDropdownChange(item, "employment_type"),
          value:
            isEdit &&
            employment.find((item) => {
              return item.value == single_job.employment_type;
            }),
        },
        {
          label: "Salary Range",
          required: false,
          type: "text",
          name: "salary_range",
          placeholder: "if required by your state",
          value: isEdit ? single_job.salary_range || "" : "",
        },

        {
          label: "Industry Experience",
          required: true,
          type: "dropdown",
          data: industry,
          isMulti: true,
          name: "industry_experience",
          callback: (item) => handleMultiChange(item, "industry_experience"),
          value:
            isEdit &&
            industry.filter((item) =>
              single_job.industry_experience.includes(item.label)
            ),
        },
        {
          label: "Media Experience",
          required: true,
          type: "dropdown",
          data: media,
          isMulti: true,
          name: "media_experience",
          callback: (item) => handleMultiChange(item, "media_experience"),
          value:
            isEdit &&
            media.filter((item) =>
              single_job.media_experience.includes(item.label)
            ),
        },

        /* {
          label: "Strengths",
          required: true,
          type: "dropdown",
          data: strengthsList,
          isMulti: true,
          name: "strengths",
          callback: (item) => handleMultiChange(item, "strengths"),
          value:
            isEdit &&
            strengthsList.filter((item) =>
              single_job.character_strengths.includes(item.label)
            ),
        }, */
        {
          label: "Years Experience",
          required: true,
          type: "dropdown",
          data: experience,
          name: "years_of_experience",
          callback: (item) => handleDropdownChange(item, "years_of_experience"),
          value:
            isEdit &&
            experience.find((item) => item.value == single_job.experience),
        },

        {
          label: "Job Post Expires",
          type: "date",
          name: "expired_at",
          required:true,
          value: isEdit ? new Date(single_job.expired_at) : new Date(),
        },
        {
          label: "Job Description",
          required: true,
          type: "editor",
          name: "description",
          value: isEdit ? single_job.description : "",
        },
        {
          label: "Remote Opportunity",
          required: true,
          type: "radio",
          name: "is_remote",
          value: isEdit && single_job.workplace_preference.is_remote,
        },
        {
          label: "Hybrid Opportunity",
          required: true,
          type: "radio",
          name: "is_hybrid",
          value: isEdit && single_job.workplace_preference.is_hybrid,
        },
        {
          label: "How do creatives apply?",
          required: true,
          type: "dropdown",
          data: apply_type,
          name: "apply_type",
          placeholder: "internal or external application",
          callback: (item) => handleDropdownChange(item, "apply_type"),
          value:
            isEdit &&
            apply_type.find((item) => item.value == single_job.apply_type),
        },
        {
          label: "External Job Application Link",
          required: false,
          type: "text",
          name: "external_link",
          placeholder: "applicants use this link",
          value: isEdit ? single_job.external_link || "" : "",
          hidden: true,
          ref:linkRef
        },
      ]);
    }
  }, [
    single_job,
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
    if (!isLoading) {
      setFormData({
        category_id: (isEdit && single_job.category_id) || "",
        title: (isEdit && single_job.title) || "",
        city_id: (isEdit && single_job.location.city_id) || "",
        state_id: (isEdit && single_job.location.state_id) || "",
        description: (isEdit && single_job.description) || "",
        industry_experience:
          (isEdit &&
            single_job.industry_experience.map(
              (item) => industry_experiences.find((j) => j.name == item).id
            )) ||
          [],
        media_experience:
          (isEdit &&
            single_job.media_experience.map(
              (item) => media_experiences.find((j) => j.name == item).id
            )) ||
          [],
        strengths:
          (isEdit &&
            single_job.character_strengths.map(
              (item) => strengths.find((j) => j.name == item).id
            )) ||
          [],
        is_onsite: (isEdit && single_job.workplace_preference.is_onsite) || 0,
        is_hybrid: (isEdit && single_job.workplace_preference.is_hybrid) || 0,
        is_remote: (isEdit && single_job.workplace_preference.is_remote) || 0,
        is_urgent: (isEdit && single_job.workplace_preference.is_urgent) || 0,
        is_featured:
          (isEdit && single_job.workplace_preference.is_featured) || 0,
        salary_range: (isEdit && single_job.salary_range) || "",
        expired_at: (isEdit && single_job.expired_at) || new Date(),
        external_link: (isEdit && single_job.external_link) || "",
        apply_type: (isEdit && single_job.apply_type) || "",
        years_of_experience: (isEdit && single_job.experience) || "",
        employment_type: (isEdit && single_job.employment_type) || "",
      });
    }
  }, [isLoading, media_experiences, industry_experiences]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="agency-page-job-edit">
      <h3 className="page-title">Post a Job Form</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">
          Opportunity Details
        </h4>
        <div className="profile-edit-form">
          <form onSubmit={handleSubmit}>
            <div className="row gx-3 gy-5 align-items-end">
              {fields.map((field, index) => {
                switch (field.type) {
                  case "image":
                    return (
                      <div className="col-12" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <input
                          type="hidden"
                          className="input-text"
                          name={field.name}
                          value=""
                        />
                        <div className="row align-items-center upload-box">
                          <div className="col-md-2 col-sm-4 col-12">
                            <img
                              src={field.image}
                              className="w-100"
                              ref={logoRef}
                            />
                          </div>
                          <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
                            <button
                              className="btn btn-secondary w-100 mb-2 text-uppercase"
                              onClick={() => imageUploadRef.current.click()}
                            >
                              <FiPaperclip /> Upload
                            </button>
                            <button
                              className="btn btn-secondary w-100 text-uppercase"
                              onClick={removeLogo}
                            >
                              <FiTrash2 /> Remove
                            </button>
                          </div>
                          <input
                            type="file"
                            ref={imageUploadRef}
                            className="d-none"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    );
                  case "text":
                    return (
                      <div
                        className={"col-sm-6"}
                        ref={field.ref || null}
                        key={index}
                        style={{display:(field.hidden ? "none" : "")}}
                      >
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name={field.name}
                          defaultValue={field.value}
                          // value={field.value}
                          required={field.required}
                          onChange={(e) => handleTextChange(e, field.name)}
                        />
                      </div>
                    );
                  case "date":
                    return (
                      <div className="col-sm-6" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <br />
                        <DatePicker
                          className="form-control"
                          selected={field.value}
                          onChange={(date) =>
                            handleDateChange(date, field.name)
                          }
                          dateFormat="MMMM d, yyyy"
                        />
                      </div>
                    );
                  case "dropdown":
                    return (
                      <div className="col-sm-6" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <Select
                          options={field.data}
                          isMulti={field.isMulti || false}
                          onChange={field.callback}
                          placeholder={field.placeholder}
                          defaultValue={field.value}
                          required={field.required}
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
                  case "radio":
                    return (
                      <div className="col-sm-6" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <br />
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input me-2"
                            name={field.name}
                            value={1}
                            checked={field.value}
                            required={field.required}
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
                            required={field.required}
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
                          {field.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        {isMounted && (
                          <Editor
                            editorState={editorState}
                            toolbarClassName="editorToolbar"
                            wrapperClassName="editorWrapper"
                            editorClassName="editorBody"
                            editorRef={(ref) => setEditorRef(ref)}
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
                disabled={formSubmit}
              >
                {isEdit ? "Update" : "Save & Preview"}
                {formSubmit && <CircularProgress size={20} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;
