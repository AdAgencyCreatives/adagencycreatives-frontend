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
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);

  const [isLogoUploaded, setIsLogoUploaded] = useState(false);

  const [useTinyMCE, setUseTinyMCE] = useState(true);
  const [isLoadingTinyMCE, setIsLoadingTinyMCE] = useState(true);
  const [baseUrl, setBaseUrl] = useState([]);

  const { getNumericString } = useHelper();
  const { isFileValid, getUploadGuide, getUploadGuideMessage } = useUploadHelper();
  const imageUploadGuide = getUploadGuide('image', 'agency-profile');
  const imageUploadGuideMessage = getUploadGuideMessage(imageUploadGuide);

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
    state: { single_agency, formSubmit },
    getAgencyById,
    saveAdvisorRecruiter,
    uploadAttachment,
    removeAttachment,
  } = useContext(AgenciesContext);

  const {
    state: { states, cities, },
    getStates,
    getCities,
  } = useContext(DataContext);

  useEffect(() => {
    if (user) {
      getAgencyById(user, true);
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
    if (Object.keys(single_agency).length > 0) {
      setIsloading(false);
      console.log(single_agency, 'single_agency');
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
          callback: (item) => handleDropdownChange(item, "city_id"),
          value: single_agency.location?.city_id && citiesList.find((city) => city.value == single_agency.location.city_id),
        },
        {
          label: "Company LinkedIn",
          required: true,
          type: "text",
          name: "linkedin",
          value: single_agency.links.find((link) => link.label == "linkedin")?.url ?? "",
        },
        {
          label: "Contact Email",
          required: true,
          type: "text",
          name: "email",
          value: user.email,
        },
        {
          label: "Contact First Name",
          required: true,
          type: "text",
          name: "first_name",
          value: user.first_name,
        },
        {
          label: "Contact Last Name",
          required: true,
          type: "text",
          name: "last_name",
          value: user.last_name,
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
          label: "Show Company Profile",
          required: true,
          type: "dropdown",
          data: showProfile,
          name: "show_profile",
          callback: (item) => handleDropdownChange(item, "show_profile"),
          value: showProfile.filter((item) => item.value == user.is_visible),
        },
        {
          label: "Your Ad Agency Creatives Profile Link",
          required: true,
          type: "slug",
          name: "slug",
          value: single_agency.slug,
          baseUrl: baseUrl
        },
      ]);
    }
  }, [single_agency, user]);

  //Set citiesList api form data
  useEffect(() => {
    if (statesList.length && (single_agency.location?.city_id ? citiesList.length : true)) {
      console.log("load List Cities", citiesList);
      console.log(fields);
      let newFields = [...fields];
      const fieldIndex = newFields.findIndex((item) => item.name == 'city_id');
      if (fieldIndex >= 0) {
        newFields[fieldIndex].data = citiesList;
        setFields([...newFields]);
      }
    }
  }, [statesList, citiesList]);

  //Set initial form data
  useEffect(() => {
    if (Object.keys(single_agency).length > 0 && !isLoading) {
      setFormData({
        company_name: single_agency.name,
        state_id: single_agency.location?.state_id,
        city_id: single_agency.location?.city_id,
        linkedin: single_agency.links.find((link) => link.label == "linkedin")?.url ?? "",
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: "",
        show_profile: user.is_visible,
        slug: single_agency.slug,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    getStates();
  }, []);

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
    field.value = value;
    console.log("fields", fields);
    setFields(fields.map((item) => item.name == field.name ? field : item));
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
    // handleDropdownChange({ value: "" }, "city_id");
  };

  const handleTextChange = (e, name) => {
    const value = e.target.value;
    let newFields = [...fields];
    const fieldIndex = newFields.findIndex((item) => item.name == name);
    newFields[fieldIndex].value = value;
    setFields([...newFields]);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (item, name) => {
    if (item) {
      setFormData((prev) => ({ ...prev, [name]: item.value }));
      // updateFieldValue(name, item.value);
    }
  };

  const handleEditorChange = (editorState, name) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const contentStateText = contentState.getPlainText(); // This gives you the plain text content
    const contentStateRaw = convertToRaw(contentState); // This gives you the content in a raw format
    setFormData((prev) => ({ ...prev, [name]: contentStateText }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const isObject = (value) => {
    return value?.constructor?.toString()?.indexOf("Object") > -1;
  };

  const validated = () => {

    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      let isValid = true;

      if (field.required) {
        isValid = field?.value?.length > 0;

        if (isObject(field?.value)) {
          isValid = Object.keys(field?.value).length > 0;
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

  const handleSubmit = () => {
    if (!validated()) {
      return;
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
  };

  const handleFileChange = async (event, resource, ref, field) => {
    const file = event.target.files[0];
    if (file) {

      let validationResult = isFileValid(file, (resource == "agency_logo" ? "image" : ""), "agency-profile");
      if (!validationResult.status) {
        if (resource == "agency_logo") {
          imageUploadRef.current.value = '';
        }
        showAlert(validationResult.message);
        return;
      }

      if (resource == "agency_logo") {
        ref.current.src = URL.createObjectURL(file);
      }

      const localFormData = new FormData();
      localFormData.append("file", file);
      localFormData.append("user_id", user.uuid);
      localFormData.append("resource_type", resource);
      await uploadAttachment(localFormData);
      reloadUserData(user.uuid);

      if (field.name == "company_logo") {
        setIsLogoUploaded(true);
        console.log("isLogoUploaded: " + isLogoUploaded);
      }

      updateFieldValue(field.name, file.name);

      showAlert((resource == "agency_logo" ? "Logo" : "") + " uploaded successfully");
    }
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
                        </div>
                        <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
                          <button className="btn btn-secondary w-100 mb-2 text-uppercase" onClick={() => imageUploadRef.current.click()}>
                            <FiPaperclip /> Upload
                          </button>
                          <button className="btn btn-secondary w-100 text-uppercase" onClick={() => removeLogo(field?.id)}>
                            <FiTrash2 /> Remove
                          </button>
                        </div>
                        <input type="file" ref={imageUploadRef} className="d-none" onChange={(e) => handleFileChange(e, "agency_logo", logoRef, field)} accept={field.accept} />
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
                        // isOptionDisabled={(option) => {return field.value.length > 7}}
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
                                content_style: 'body { font-family: "JOST", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; font-size: 14pt }',
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
            <button className="btn btn-dark btn-hover-primary border-0 px-3 py-2" onClick={handleSubmit} disabled={formSubmit}>
              Save Profile {formSubmit && <CircularProgress size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorRecruiterProfile;
