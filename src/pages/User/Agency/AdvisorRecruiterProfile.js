import { useContext, useEffect, useRef, useState } from "react";
import "../../../styles/AgencyDashboard/Profile.scss";
import Select from "../../../components/Select";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Placeholder from "../../../assets/images/placeholder.png";
import { FiFile, FiPaperclip, FiTrash2, FiUnderline } from "react-icons/fi";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import Loader from "../../../components/Loader";
import { CircularProgress, filledInputClasses } from "@mui/material";

import useHelper from "../../../hooks/useHelper";
import useUploadHelper from "../../../hooks/useUploadHelper";
import IconMessage from "../../../components/IconMessage";

const AdvisorRecruiterProfile = () => {
  const editorRefTinyMCE = useRef(null);
  const cityRef = useRef();
  const imageUploadRef = useRef();
  const logoRef = useRef();
  const videoUploadRef = useRef();
  const videoRef = useRef();
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [selectChange, setSelectChange] = useState();
  const [media, setMedia] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);
  const [videoItem, setVideoItem] = useState(false);
  const [showVideoItem, setShowVideoItem] = useState(false);

  const [isLogoUploaded, setIsLogoUploaded] = useState(false);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  const [useTinyMCE, setUseTinyMCE] = useState(true);
  const [isLoadingTinyMCE, setIsLoadingTinyMCE] = useState(true);
  const [baseUrl, setBaseUrl] = useState([]);

  const { getNumericString, capitalize } = useHelper();
  const { isFileValid, getUploadGuide, getUploadGuideMessage } = useUploadHelper();
  const imageUploadGuide = getUploadGuide('image', 'agency-profile');
  const videoUploadGuide = getUploadGuide('video', 'agency-profile');
  const imageUploadGuideMessage = getUploadGuideMessage(imageUploadGuide);
  const videoUploadGuideMessage = getUploadGuideMessage(videoUploadGuide);

  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const baseUrl = window.location.origin;
    setBaseUrl(baseUrl);
  }, []);

  useEffect(() => {
    /* Hack to resolve focus issue with TinyMCE editor in bootstrap model dialog */
    const handler = (e) => {
      if (e.target.closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
        e.stopImmediatePropagation();
      }
    };
    document.addEventListener("focusin", handler);
    return () => document.removeEventListener("focusin", handler);
  }, []);

  const performInitTinyMCE = (evt, editor) => {
    setIsLoadingTinyMCE(false);
    editorRefTinyMCE.current = editor;
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const workplace_preference = [
    { label: "Remote", value: "remote", key: "is_remote" },
    { label: "Hybrid", value: "hybrid", key: "is_hybrid" },
    { label: "Onsite", value: "onsite", key: "is_onsite" },
  ];
  const showProfile = [
    { label: "Show", value: 1, key: "show" },
    { label: "Hide", value: 0, key: "hide" },
  ];

  const {
    state: { user, },
    reloadUserData,
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  const {
    state: { single_agency, formSubmit, video },
    getAgencyById,
    saveAdvisorRecruiter,
    uploadAttachment,
    getVideo,
    removeAttachment,
  } = useContext(AgenciesContext);

  const {
    state: { states, cities, media_experiences, industry_experiences },
    getStates,
    getCities,
    getMediaExperiences,
    getIndustryExperiences,
  } = useContext(DataContext);

  useEffect(() => {
    if (user) {
      getAgencyById(user, true);
      getVideo(user.uuid);
    }
  }, [user]);

  useEffect(() => {
    if (Object.keys(single_agency).length > 0 && single_agency.logo) {
      setIsLogoUploaded(single_agency.logo.length > 0);
      console.log("isLogoUploaded: " + isLogoUploaded);
    }
  }, [single_agency]);

  //Fetch initial Cities
  useEffect(() => {
    if (Object.keys(single_agency).length > 0 && single_agency.location && citiesList.length === 0) {
      getCities(single_agency.location?.state_id);
    }
  }, [single_agency, citiesList]);

  // Set initial fields
  useEffect(() => {
    if (Object.keys(single_agency).length > 0 && industry.length && media.length && statesList.length && (single_agency.location?.city_id ? citiesList.length : true)) {
      setIsloading(false);
      setEditorState(EditorState.createWithContent(ContentState.createFromText(single_agency.about ? single_agency.about : "")));
      console.log("single_agency", single_agency);
      setFields([
        {
          label: "Your Logo",
          required: true,
          type: "image",
          image: single_agency.logo,
          name: "company_logo",
          accept: ".jpg, .jpeg, .png, .bmp, image/jpeg, image/png",
          id: single_agency.logo_id,
          value: single_agency.logo ? single_agency.logo : "",
        },
        {
          label: "Company Name",
          required: true,
          type: "text",
          name: "company_name",
          value: single_agency.name,
        },
        {
          label: "Company LinkedIn",
          required: true,
          type: "text",
          name: "linkedin",
          value: single_agency.links.find((link) => link.label == "linkedin")?.url ?? "",
        },
        {
          label: "Contact First Name",
          required: true,
          type: "text",
          name: "first_name",
          value: user.first_name,
          pattern: "^[a-zA-Z \\-'\\._]{1,255}$",
        },
        {
          label: "Contact Last Name",
          required: true,
          type: "text",
          name: "last_name",
          value: user.last_name,
          pattern: "^[a-zA-Z \\-'\\._]{1,255}$",
        },
        // {
        //   label: "Company Website",
        //   required: true,
        //   type: "text",
        //   name: "website",
        //   value: single_agency.links.find((link) => link.label == "website")?.url ?? "",
        // },
        {
          label: "Contact Email",
          required: true,
          type: "text",
          name: "email",
          value: user.email,
        },
        {
          label: "Contact Phone Number",
          required: true,
          type: "text",
          name: "phone_number",
          value: single_agency.phone_number,
          placeholder: "###-###-####",
        },
        {
          label: "Location (State)",
          required: true,
          type: "dropdown",
          name: "state_id",
          data: statesList,
          callback: (item) => changeState(item, "state_id"),
          placeholder: "Select State",
          value: statesList.find((state) => state.value == single_agency.location?.state_id),
        },
        {
          label: "Nearest Major City",
          type: "dropdown",
          name: "city_id",
          required: true,
          data: citiesList,
          placeholder: "Select City",
          callback: (item) => changeCity(item, "city_id"),
          value: single_agency.location?.city_id && citiesList.find((city) => city.value == single_agency.location.city_id),
        },
        // {
        //   label: "About Your Company",
        //   required: true,
        //   type: "editor",
        //   name: "about",
        //   value: single_agency.about,
        // },
        // {
        //   label: "Industry Specialty",
        //   required: true,
        //   type: "dropdown",
        //   data: industry,
        //   isMulti: true,
        //   name: "industry_experience",
        //   callback: (item) => handleMultiChange(item, "industry_experience"),
        //   value: industry.filter((item) => single_agency.industry_experience.includes(item.label)),
        // },
        // {
        //   label: "Media Speciality",
        //   required: true,
        //   type: "dropdown",
        //   data: media,
        //   isMulti: true,
        //   name: "media_experience",
        //   callback: (item) => handleMultiChange(item, "media_experience"),
        //   value: media.filter((item) => single_agency.media_experience.includes(item.label)),
        // },
        // {
        //   label: "Workplace Preference",
        //   required: true,
        //   type: "dropdown",
        //   isMulti: true,
        //   data: workplace_preference,
        //   name: "workplace_preference",
        //   callback: (item) => handleWorkplaceChange(item, "workplace_preference"),
        //   value: workplace_preference.filter((item) => single_agency[item.key]),
        // },
        // {
        //   label: "Company Size",
        //   required: true,
        //   type: "text",
        //   name: "size",
        //   value: single_agency.size,
        // },
        // {
        //   label: "Show Company Profile",
        //   required: true,
        //   type: "dropdown",
        //   data: showProfile,
        //   name: "show_profile",
        //   callback: (item) => handleDropdownChange(item, "show_profile"),
        //   value: showProfile.filter((item) => item.value == user.is_visible),
        // },
        {
          label: "Company URL",
          required: false,
          type: "text",
          name: "website",
          value: single_agency.links.find((link) => link.label == "website")?.url ?? "",
        },
        {
          label: "Your Ad Agency Creatives Profile Link",
          required: true,
          type: "slug",
          name: "slug",
          value: single_agency.slug,
          baseUrl: baseUrl
        },
        // {
        //   label: "Upload your agency reel",
        //   required: false,
        //   type: "video",
        //   name: "company_video",
        //   value: videoItem ? videoItem.name : "",
        // },
      ]);
    }
  }, [single_agency, user, media, industry, statesList, citiesList]);

  //Set citiesList api form data
  useEffect(() => {
    if (statesList.length && (single_agency.location?.city_id ? citiesList.length : true)) {
      const newFields = [...fields];
      const fieldIndex = newFields.findIndex((item) => item.name == 'city_id');
      if (fieldIndex >= 0) {
        newFields[fieldIndex].data = citiesList;
        newFields[fieldIndex].value = single_agency.location?.city_id && citiesList.find((city) => city.value === single_agency.location.city_id);
        console.log("setFields in cities load");
        setFields(newFields);
      }
    }
  }, [citiesList]);

  //Set initial form data
  useEffect(() => {
    if (Object.keys(single_agency).length > 0 && !isLoading) {
      setFormData({
        company_name: single_agency.name,
        website: single_agency.links.find((link) => link.label == "website")?.url ?? "",
        state_id: single_agency.location?.state_id,
        city_id: single_agency.location?.city_id,
        linkedin: single_agency.links.find((link) => link.label == "linkedin")?.url ?? "",
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: "",
        about: single_agency.about,
        industry_experience: single_agency.industry_experience.map((item) => industry_experiences.find((j) => j.name == item).id),
        media_experience: single_agency.media_experience.map((item) => media_experiences.find((j) => j.name == item).id),
        is_onsite: single_agency.workplace_preference.is_onsite,
        is_hybrid: single_agency.workplace_preference.is_hybrid,
        is_remote: single_agency.workplace_preference.is_remote,
        size: single_agency.size,
        show_profile: user.is_visible,
        slug: single_agency.slug,
      });
    }
  }, [isLoading, media_experiences, industry_experiences]);

  useEffect(() => {
    getStates();
    getMediaExperiences();
    getIndustryExperiences();
  }, []);

  useEffect(() => {
    if (video) {
      setVideoItem(video);
      setIsVideoUploaded(true);
      console.log("isVideoUploaded: " + isVideoUploaded);
    }
  }, [video]);

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
    console.log("fields", fields);
  }, [fields]);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  useEffect(() => {
    console.log("selectChange", selectChange);
    selectChange && updateFieldValue(selectChange?.name, selectChange)
  }, [selectChange]);

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
    console.log("update Fields", fields);
    let field = getFieldByName(name);
    if (field) {
      field.value = value;
      setFields(fields.map((item) => item.name === field.name ? field : item));
    }
  };

  const parseFieldsData = (data) => {
    const parsedValue = data.map((item) => {
      return { label: item.name, value: item.uuid || item.id, key: item.name };
    });
    return parsedValue;
  };

  const changeState = (item, name) => {
    getCities(item.value);
    handleDropdownChange(item, name);
    cityRef.current?.clearValue();
    setFormData((prev) => ({ ...prev, 'city_id': '' }));
    // handleDropdownChange({ value: "" }, "city_id");
  };

  const changeCity = (item, name) => {
    handleDropdownChange(item, name);
  };

  const handleTextChange = (e, name) => {
    const value = e.target.value;
    let newFields = [...fields];
    console.log("newFields", newFields);
    const fieldIndex = newFields.findIndex((item) => item.name == name);
    newFields[fieldIndex].value = value;
    setFields([...newFields]);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (item, name) => {
    if (item) {
      console.log("onchange " + name, item);
      setFormData((prev) => ({ ...prev, [name]: item.value }));
      item.name = name;
      setSelectChange(item);
    }
  };

  const handleMultiChange = (item, name) => {
    const values = item.map((i) => i.value);
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleWorkplaceChange = (item, name) => {
    const result = {};

    item.forEach((item) => {
      result[item.key] = 1;
    });
    setFormData((prev) => ({
      ...prev,
      is_hybrid: result.hasOwnProperty("is_hybrid") ? 1 : 0,
      is_onsite: result.hasOwnProperty("is_onsite") ? 1 : 0,
      is_remote: result.hasOwnProperty("is_remote") ? 1 : 0,
    }));
  };

  const handleEditorChange = (editorState, name) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const contentStateText = contentState.getPlainText(); // This gives you the plain text content
    const contentStateRaw = convertToRaw(contentState); // This gives you the content in a raw format
    setFormData((prev) => ({ ...prev, [name]: contentStateText }));
  };

  const isObject = (value) => {
    return value?.constructor?.toString()?.indexOf("Object") > -1;
  };

  const validated = () => {
    console.log("validated", fields);
    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      let isValid = true;

      if (field.required) {
        isValid = field?.value?.length > 0;

        if (isObject(field?.value)) {
          isValid = Object.keys(field?.value).length > 0;
        }

        if (field.type == "dropdown" && (field.name == 'state_id' || field.name == 'city_id' || field.name == 'industry_experience' || field.name == 'media_experience')) {
          isValid = formData[field.name].length > 0;
        }

        if (field.name == "workplace_preference") {
          isValid = formData['is_remote'] == 1 || formData['is_hybrid'] == 1 || formData['is_onsite'] == 1;
        }
      }

      if (!isValid) {
        showAlert(field.label + " is required");
        return false;
      }

      if (field.name == "phone_number" && getNumericString(field.value).length != 10) {
        showAlert("Please enter your 10-digit number");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validated()) {
      return false;
    }

    let current_role = user?.role == 'recruiter' ? 'Recruiter' : 'Advisor';
    (async () => {
      await saveAdvisorRecruiter(current_role, user.uuid, formData, (message) => {
        reloadUserData(user.uuid);
        showAlert(message);
      }, (message) => {
        showAlert(message);
      });
    })();

    return false;
  };

  const handleFileChange = async (event, resource, ref, field) => {
    const file = event.target.files[0];
    if (file) {

      let validationResult = isFileValid(file, (resource == "agency_logo" ? "image" : "video"), "agency-profile");
      if (!validationResult.status) {
        if (resource == "agency_logo") {
          imageUploadRef.current.value = '';
        } else {
          videoUploadRef.current.value = '';
        }
        showAlert(validationResult.message);
        return;
      }

      if (resource == "agency_logo") {
        ref.current.src = URL.createObjectURL(file);
      } else {
        setVideoItem({ name: file.name });
      }

      const localFormData = new FormData();
      localFormData.append("file", file);
      localFormData.append("user_id", user.uuid);
      localFormData.append("resource_type", resource);
      setImageUploading(true);

      await uploadAttachment(localFormData);
      reloadUserData(user.uuid);

      if (field.name == "company_logo") {
        setIsLogoUploaded(true);
        console.log("isLogoUploaded: " + isLogoUploaded);
      } else if (field.name == "company_video") {
        setIsVideoUploaded(true);
        console.log("isVideoUploaded: " + isVideoUploaded);
      }

      updateFieldValue(field.name, file.name);

      // showAlert((resource == "agency_logo" ? "Logo" : "Video") + " uploaded successfully");
      showAlert(capitalize(user.role) + " profile updated successfully");
      setImageUploading(false);
    }
  };

  const removeVideo = async (id) => {
    if (!id) {
      return;
    }
    await removeAttachment(id);
    reloadUserData(user.uuid);
    setIsVideoUploaded(false);
    videoUploadRef.current.value = '';
    console.log("isVideoUploaded: " + isVideoUploaded);
    setVideoItem(null);
    showAlert("Video removed successfully");
  };

  const removeLogo = async (id) => {
    if (!id) {
      return;
    }
    console.log(id, 'id');
    imageUploadRef.current.value = '';
    logoRef.current.src = "";
    await removeAttachment(id);
    reloadUserData(user.uuid);
    setIsLogoUploaded(false);
    console.log("isLogoUploaded: " + isLogoUploaded);
    showAlert("Logo removed successfully");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="agency-page-profile">
      <h3 className="page-title">Edit Profile</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Edit Profile</h4>
        <div className="profile-edit-form">
          <form onSubmit={(e) => { return handleSubmit(e) }}>
            <div className="row gx-3 gy-5 align-items-end">
              {fields.map((field, index) => {
                switch (field.type) {
                  case "image":
                    return (
                      <div className="col-12" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && <span className="required">*</span>}
                          <IconMessage message={imageUploadGuideMessage} />
                        </label>
                        <input type="hidden" className="input-text" name={field.name} value="" />
                        <div className="row align-items-center upload-box">
                          <div className="col-md-2 col-sm-4 col-12">
                            <div className="img">
                              <img src={field.image} className="w-100" ref={logoRef} />
                            </div>
                            {imageUploading && (
                              <div style={{ margin: '10px 0px 0px 0px' }}>
                                <Loader fullHeight={false} />
                              </div>
                            )}
                          </div>
                          <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
                            <button type="button" className="btn btn-secondary w-100 mb-2 text-uppercase" onClick={() => imageUploadRef.current.click()}>
                              <FiPaperclip /> Upload
                            </button>
                            <button type="button" className="btn btn-secondary w-100 text-uppercase" onClick={() => removeLogo(field?.id)}>
                              <FiTrash2 /> Remove
                            </button>
                          </div>
                          <input type="file" ref={imageUploadRef} className="d-none" onChange={(e) => handleFileChange(e, "agency_logo", logoRef, field)} accept={field.accept} />
                        </div>
                      </div>
                    );
                  case "video":
                    return (
                      <div className="col-12" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && <span className="required">*</span>}
                          <IconMessage message={videoUploadGuideMessage} />
                        </label>
                        <div className="row align-items-center upload-box">
                          <div className="col-md-12 col-sm-12 col-12">
                            {videoItem && (
                              <>
                                <button type="button" className="btn btn-dark btn-hover-primary border-0 px-3 py-2 ls-3 me-3 mb-2" onClick={(e) => setShowVideoItem(state => !state)}>
                                  <span className="icon_type">
                                    <FiFile />
                                  </span>
                                  <div className="filename">{videoItem.name}</div>
                                </button>
                                {showVideoItem && videoItem?.url?.length && (
                                  <video controls muted playsInline>
                                    <source src={videoItem?.url} type={"video/" + videoItem?.url?.substring(videoItem?.url?.lastIndexOf('.') + 1)} />
                                    Sorry, your browser doesn't support videos.
                                  </video>
                                )}
                              </>
                            )}
                          </div>
                          <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
                            <button type="button" className="btn btn-secondary w-100 mb-2 text-uppercase" onClick={() => videoUploadRef.current.click()}>
                              <FiPaperclip /> Upload
                            </button>
                            <button type="button" className="btn btn-secondary w-100 text-uppercase" onClick={() => removeVideo(videoItem?.id)}>
                              <FiTrash2 /> Remove
                            </button>
                          </div>
                          <input type="file" ref={videoUploadRef} className="d-none" onChange={(e) => handleFileChange(e, "agency_reel", videoRef, field)} accept=".mp4, .avi, .mov, video/*" />
                        </div>
                      </div>
                    );

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
                          value={field.value || ""}
                          pattern={field?.pattern || "*"}
                          onChange={(e) => handleTextChange(e, field.name)}
                          placeholder={field.placeholder || ""}
                        />
                      </div>
                    );
                  case "slug":
                    return (
                      <div className="col-sm-6" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && <span className="required">*</span>}
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon3">{field.baseUrl}/agency/</span>
                          <input
                            type="text"
                            className="form-control"
                            value={field.value}
                            onChange={(e) => handleTextChange(e, field.name)}
                          />
                        </div>
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
                          className="dropdown-container"
                          options={field.data.map((option) => ({
                            ...option,
                            // isDisabled: formData.length ? formData[field.name].length > 7 : false,
                          }))}
                          isMulti={field.isMulti || false}
                          ref={(ref) => (field.name == "city_id" ? (cityRef.current = ref) : false)}
                          onChange={field.callback}
                          placeholder={field.placeholder}
                          defaultValue={field.value}
                          // value={field.value}
                          // isOptionDisabled={(option) => { return field.value.length > 7 }}
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
                      <div className="col-12" key={index}>
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && <span className="required">*</span>}
                        </label>
                        {isMounted && (<>
                          {useTinyMCE ? (
                            <>
                              <div className={"d-" + (isLoadingTinyMCE ? 'show' : 'none')}>
                                <CircularProgress />
                              </div>
                              <EditorTinyMCE
                                onInit={(evt, editor) => performInitTinyMCE(evt, editor)}
                                apiKey='0de1wvfzr5x0z7za5hi7txxvlhepurk5812ub5p0fu5tnywh'
                                init={{
                                  height: 400,
                                  menubar: false,
                                  // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                  // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                  plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace visualblocks wordcount',
                                  toolbar: 'bold italic underline strikethrough | blocks fontfamily fontsize | numlist bullist link | emoticons charmap | align lineheight | indent outdent | removeformat',
                                  content_style: 'body, * { font-family: "JOST", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important; font-size: 14pt }',
                                  placeholder: '',
                                }}
                                value={formData[field.name]}
                                onEditorChange={(e) => {
                                  let data = (editorRefTinyMCE.current ? editorRefTinyMCE.current.getContent() : "");
                                  setFormData((prev) => ({ ...prev, [field.name]: data }));
                                  updateFieldValue(field.name, data);
                                }
                                }
                              />
                            </>
                          ) : (
                            <Editor
                              editorState={editorState}
                              toolbarClassName="editorToolbar"
                              wrapperClassName="editorWrapper"
                              editorClassName="editorBody"
                              toolbar={{
                                options: ["inline", "blockType", "fontSize", "list", "textAlign", "link"],
                              }}
                              onEditorStateChange={(newState) => {
                                handleEditorChange(newState, field.name);
                              }}
                            />
                          )}
                        </>)}
                      </div>
                    );
                  default:
                }
              })}
            </div>
            <div className="submit-btn mt-4">
              <button type="submit" className="btn btn-dark btn-hover-primary border-0 px-3 py-2" disabled={formSubmit}>
                Save Profile {formSubmit && <CircularProgress size={20} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvisorRecruiterProfile;