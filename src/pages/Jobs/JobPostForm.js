import { useContext, useEffect, useRef, useState } from "react";
import "../../styles/AgencyDashboard/Profile.scss";
import Select from "../../components/Select";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Editor as EditorTinyMCE } from "@tinymce/tinymce-react";
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
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import useUploadHelper from "../../hooks/useUploadHelper";
import IconMessage from "../../components/IconMessage";
import { Context as AgenciesContext } from "../../context/AgenciesContext";
import { Context as SubscriptionContext } from "../../context/SubscriptionContext";

const JobPostForm = ({ id, setJobStatus, isRepost = false }) => {
  const editorRefTinyMCE = useRef(null);
  const [useTinyMCE, setUseTinyMCE] = useState(true);
  const [isLoadingTinyMCE, setIsLoadingTinyMCE] = useState(true);
  const [isJobPostAllowed, setIsJobPostAllowed] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(false);
  const { isFileValid, getUploadGuide, getUploadGuideMessage } =
    useUploadHelper();
  const imageUploadGuide = getUploadGuide("image", "job-post-form");
  const imageUploadGuideMessage = getUploadGuideMessage(imageUploadGuide);

  const {
    state: { user, token },
  } = useContext(AuthContext);

  const {
    state: { subscription },
    getSubscription,
  } = useContext(SubscriptionContext);

  const {
    states: {
      single_job,
      employment_type,
      agenciesList,
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
      cityRef,
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
    setFields,
    setEditorState,
    setFormData,
    setEditorRef,
    formData,
    setIsLogoUploaded,
  } = useFormData({
    id,
    setJobStatus,
    useTinyMCE,
    uploadGuidePage: "job-post-form",
    isRepost,
  });

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    /* Hack to resolve focus issue with TinyMCE editor in bootstrap model dialog */
    const handler = (e) => {
      if (
        e.target.closest(
          ".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root"
        ) !== null
      ) {
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
  }, []);

  const changeAgency = (item, name) => {
    let selected_agency = agenciesList.find(
      (agency) => agency.value == item.value
    );
    setSelectedAgency(selected_agency);
    setIsJobPostAllowed(
      selected_agency?.agency?.status?.status == "active" &&
      selected_agency?.agency?.status?.quota_left > 0
    );
    handleDropdownChange(item, name);
  };

  const handleSubmitCurrent = (e) => {
    e.preventDefault();
    if (formData.description == "" || formData.description == null) {
      showAlert("The Job Description cannot be empty");
    } else if (
      formData.expired_at == "" ||
      formData.expired_at == "Invalid date"
    ) {
      showAlert("The Job Post Expires date is invalid");
    } else if (!isJobPostAllowed) {
      showAlert("Post A Job Package Required");
    } else {
      handleSubmit(e);
    }
  };

  const performInitTinyMCE = (evt, editor) => {
    setIsLoadingTinyMCE(false);
    editorRefTinyMCE.current = editor;
  };

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
      // console.log("single_job", single_job);
      // console.log("agenciesList", agenciesList);
      setFields([
        {
          label: "Agency Name",
          required: false,
          type: "text",
          name: "agency_name",
          value: single_job?.agency?.name,
          skip: user?.role != "recruiter",
        },
        {
          label: "Agency Website",
          required: false,
          type: "text",
          name: "agency_website",
          value: single_job?.agency?.website,
          skip: user?.role != "recruiter",
        },
        {
          label: "Assigned Agencies",
          required: true,
          type: "dropdown",
          name: "agency_id",
          data: agenciesList,
          callback: (item) => changeAgency(item, "agency_id"),
          placeholder: "Select Agency",
          value:
            isEdit &&
            agenciesList.find((agency) => agency.value == single_job.agency.id),
        },
        {
          label:
            "Agency Logo only upload if it's different from your profile logo",
          required: false,
          type: "image",
          image: isEdit
            ? single_job.agency.logo || single_job.agency.fallback_image
            : "",
          name: "attachment_id",
          accept: ".jpg, .jpeg, .png, .bmp, image/jpeg, image/png",
          id: single_job?.agency?.logo_id || "",
        },
        {
          label: "Agency Job Title",
          required: true,
          type: "text",
          name: "title",
          value: isEdit ? single_job.title + (isRepost ? " Repost" : "") : "",
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
          label: "Job Location (State)",
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
          label: "Nearest Major City",
          type: "dropdown",
          name: "city_id",
          required: true,
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
          isMulti: true,
          name: "employment_type",
          callback: (item) => handleMultiChange(item, "employment_type"),
          value: employment?.filter((item) =>
            single_job?.employment_type?.includes(item.label)
          ),
          placeholder: "Select employment type",
          column: "6",
        },
        {
          // label: "Salary Range",
          label: "This Opportunity Pays",
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
          required: true,
          disablePast: true,
          maxDate: subscription?.ends_at
            ? new Date(subscription?.ends_at)
            : null,
          value: isEdit
            ? new Date(single_job.expired_at)
            : subscription?.ends_at
              ? new Date(subscription?.ends_at)
              : new Date(),
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
        // {
        //   label: "How do creatives apply?",
        //   required: true,
        //   type: "dropdown",
        //   data: apply_type,
        //   name: "apply_type",
        //   placeholder: "internal or external application",
        //   callback: (item) => handleDropdownChange(item, "apply_type"),
        //   value:
        //     isEdit &&
        //     apply_type.find((item) => item.value == single_job.apply_type),
        // },
        // {
        //   label: "External Job Application Link",
        //   required: false,
        //   type: "url",
        //   name: "external_link",
        //   placeholder: "applicants use this link",
        //   value: isEdit ? single_job.external_link || "" : "",
        //   hidden: true,
        //   ref: linkRef,
        // },
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
        title: (isEdit && single_job.title + (isRepost ? " Repost" : "")) || "",
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
        expired_at: isEdit
          ? new Date(single_job.expired_at)
          : subscription?.ends_at
            ? new Date(subscription?.ends_at)
            : new Date(),
        external_link: (isEdit && single_job.external_link) || "",
        apply_type: (isEdit && single_job.apply_type) || "",
        years_of_experience: (isEdit && single_job.experience) || "",
        employment_type: (isEdit && single_job.employment_type) || "",
      });
    }
  }, [isLoading, media_experiences, industry_experiences]);

  useEffect(() => {
    if (single_job?.agency?.id) {
      setIsJobPostAllowed(true);
    }
  }, [agenciesList, single_job]);

  const { uploadAttachment } = useContext(AgenciesContext);

  const getFieldByName = (name) => {
    for (let index = 0; index < fields.length; index++) {
      const element = fields[index];
      if (element.name == name) {
        return element;
      }
    }
    return null;
  };

  const updateFieldValue = (name, value) => {
    let field = getFieldByName(name);
    if (field) {
      field.value = value;
      setFields(
        fields.map((item) => (item.name === field.name ? field : item))
      );
    }
  };

  const handleFileChange = async (event, resource, ref, field) => {
    const file = event.target.files[0];
    if (file) {
      let validationResult = isFileValid(
        file,
        resource == "sub_agency_logo" ? "image" : "video",
        "agency-profile"
      );
      if (!validationResult.status) {
        if (resource == "sub_agency_logo") {
          imageUploadRef.current.value = "";
        }
        showAlert(validationResult.message);
        return;
      }

      if (resource == "sub_agency_logo") {
        ref.current.src = URL.createObjectURL(file);
      }

      const localFormData = new FormData();
      localFormData.append("file", file);
      localFormData.append("user_id", user.uuid);
      localFormData.append("resource_type", resource);

      await uploadAttachment(localFormData, (response) => {
        if (field.name == "company_logo") {
          setIsLogoUploaded(true);
        }

        // console.log("responnse", response);

        setFormData((prev) => ({
          ...prev,
          ["attachment_id"]: response.data.data.id,
        }));

        // updateFieldValue("attachment_id", response.data.data.id);
        updateFieldValue(field.name, file.name);

        showAlert(
          (resource == "sub_agency_logo" ? "Logo" : "Video") +
          " uploaded successfully"
        );
      });
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);

  useEffect(() => {
    const isNewJob =
      single_job?.status !== "approved" && single_job?.status !== "expired";
    if (subscription && isNewJob) {
      setIsJobPostAllowed(
        subscription.status == "active" && subscription.quota_left > 0
      );
    }
  }, [subscription]);

  const handleUpload = (e) => {
    imageUploadRef.current.click();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="agency-page-job-edit">
      <h3 className="page-title">
        {isRepost ? "Job Repost Form" : "Post a Job Form"}
      </h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Opportunity Details</h4>
        <div className="profile-edit-form">
          <form onSubmit={handleSubmitCurrent}>
            <div className="row gx-3 gy-5 align-items-end">
              {fields.map((field, index) => {
                if (
                  (user?.role != "advisor" && field.name == "agency_id") ||
                  field?.skip
                ) {
                  return <></>;
                }
                switch (field.type) {
                  case "image":
                    return (
                      <div className="col-12" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && (
                            <span className="required">*</span>
                          )}
                          <IconMessage message={imageUploadGuideMessage} />
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
                              alt=""
                            />
                          </div>
                          <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
                            <button
                              type="button"
                              className="btn btn-secondary w-100 mb-2 text-uppercase"
                              onClick={(e) => handleUpload(e)}
                            >
                              <FiPaperclip /> Upload
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary w-100 text-uppercase"
                              onClick={() =>
                                removeLogo(
                                  single_job?.id,
                                  field?.id,
                                  single_job?.agency?.fallback_image
                                )
                              }
                              disabled={field?.id ? "" : "disabled"}
                            >
                              <FiTrash2 /> Remove
                            </button>
                          </div>
                          <input
                            type="file"
                            ref={imageUploadRef}
                            className="d-none"
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                "sub_agency_logo",
                                logoRef,
                                field
                              )
                            }
                            accept={field.accept}
                          />
                        </div>
                      </div>
                    );
                  case "url":
                    return (
                      <div
                        className={"col-sm-6"}
                        ref={field.ref || null}
                        key={index}
                        style={{ display: field.hidden ? "none" : "" }}
                      >
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          name={field.name}
                          defaultValue={field.value}
                          // value={field.value}
                          required={field.required}
                          onChange={(e) => handleTextChange(e, field.name)}
                          autoFocus={field.name === "title"}
                        />
                      </div>
                    );
                  case "text":
                    return (
                      <div
                        className={"col-sm-6"}
                        ref={field.ref || null}
                        key={index}
                        style={{ display: field.hidden ? "none" : "" }}
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
                          autoFocus={
                            user?.role == "agency" && field.name === "title"
                          }
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
                          selected={
                            field?.name == "expired_at" && field.value > field?.maxDate
                              ? field.maxDate
                              : field.value
                          }
                          onChange={(date) =>
                            handleDateChange(date, field.name)
                          }
                          minDate={field?.disablePast ? moment().toDate() : ""}
                          maxDate={field?.maxDate ?? null}
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
                          autoFocus={
                            user?.role == "advisor" &&
                            field.name === "agency_id"
                          }
                          className="dropdown-container"
                          options={field.data}
                          isMulti={field.isMulti || false}
                          onChange={field.callback}
                          placeholder={field.placeholder}
                          defaultValue={field.value}
                          required={field.required}
                          ref={(ref) =>
                            field.name == "city_id"
                              ? (cityRef.current = ref)
                              : false
                          }
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
                        {field.name == "agency_id" && selectedAgency && (
                          <>
                            <span
                              className={
                                "badge job-post-badge" +
                                (isJobPostAllowed ? " gold" : " red")
                              }
                            >
                              Status: {selectedAgency?.agency?.status?.status}
                            </span>
                            <span
                              className={
                                "badge job-post-badge" +
                                (isJobPostAllowed ? " gold" : " red")
                              }
                            >
                              Posts Remaining:{" "}
                              {selectedAgency?.agency?.status?.quota_left}
                            </span>
                          </>
                        )}
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
                          <>
                            {useTinyMCE ? (
                              <>
                                <div
                                  className={
                                    "d-" + (isLoadingTinyMCE ? "show" : "none")
                                  }
                                >
                                  <CircularProgress />
                                </div>
                                <EditorTinyMCE
                                  onInit={(evt, editor) =>
                                    performInitTinyMCE(evt, editor)
                                  }
                                  apiKey='niqd0bqfftqm2iti1rxdr0ddt1b46akht531kj0uv4snnaie'
                                  init={{
                                    height: 400,
                                    menubar: false,
                                    // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                    // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                    plugins:
                                      "anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount",
                                    toolbar:
                                      "bold italic underline strikethrough | blocks fontfamily fontsize | numlist bullist link | emoticons charmap | align lineheight | indent outdent | removeformat",
                                    content_css: [
                                      "https://fonts.googleapis.com/css?family=Jost:400,500,600,700,800&#038;subset=latin%2Clatin-ext",
                                    ],
                                    font_family_formats: "JOST=JOST",
                                    content_style:
                                      'body, * { font-family: "JOST", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important; font-size: 14pt } a { color: #d3a11f; cursor: pointer; } a:hover { color: #000; }',
                                    placeholder: "",
                                    paste_block_drop: true,
                                    forced_root_block: false, // Disable wrapping content in paragraph tags 
                                    setup: (editor) => {
                                      editor.on('keydown', (e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) { // Enter key without Shift 
                                          e.preventDefault();
                                          editor.execCommand('InsertLineBreak');
                                        } else if (e.key === 'Enter' && e.shiftKey) { // Enter key with Shift
                                          e.preventDefault();
                                          editor.execCommand('InsertParagraph');
                                        }
                                      });
                                    },
                                  }}
                                  value={formData[field.name]}
                                  onEditorChange={(e) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      [field.name]: editorRefTinyMCE.current
                                        ? editorRefTinyMCE.current.getContent()
                                        : "",
                                    }));
                                  }}
                                />
                              </>
                            ) : (
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
                          </>
                        )}
                      </div>
                    );
                  default:
                }
              })}
            </div>
            <div className="submit-btn mt-4">
              <button
                className="btn btn-dark btn-hover-primary border-0 px-3 py-2"
                disabled={formSubmit}
              >
                {isEdit && !isRepost ? "Update" : "Save & Preview"}
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
