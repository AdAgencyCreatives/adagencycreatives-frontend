import { useContext, useEffect, useRef, useState } from "react";
import "../../../styles/AgencyDashboard/Profile.scss";
import Select from "../../../components/Select";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Placeholder from "../../../assets/images/placeholder.png";
import { FiPaperclip, FiTrash2 } from "react-icons/fi";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import Loader from "../../../components/Loader";
import { CircularProgress } from "@mui/material";

const Profile = () => {
  const imageUploadRef = useRef();
  const logoRef = useRef();
  const videoUploadRef = useRef();
  const videoRef = useRef();
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [media, setMedia] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);

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
    state: { user },
    reloadUserData
  } = useContext(AuthContext);

  const {
    showAlert
  } = useContext(AlertContext);

  const {
    state: { single_agency, formSubmit },
    getAgencyById,
    saveAgency,
    saveAgencyImage,
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
      getAgencyById(user.uuid);
    }
  }, [user]);

  //Fetch initial Cities
  useEffect(() => {
    if (
      Object.keys(single_agency).length > 0 &&
      single_agency.location &&
      citiesList.length === 0
    ) {
      getCities(single_agency.location?.state_id);
    }
  }, [single_agency, citiesList]);

  // Set initial fields
  useEffect(() => {
    if (
      Object.keys(single_agency).length > 0 &&
      industry.length &&
      media.length &&
      statesList.length &&
      (single_agency.location?.city_id ? citiesList.length : true)
    ) {
      setIsloading(false);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(single_agency.about ? single_agency.about : "")
        )
      );
      setFields([
        {
          label: "Your Logo",
          required: true,
          type: "image",
          image: single_agency.logo,
          name: "company_logo",
        },
        {
          label: "Company Name",
          required: true,
          type: "text",
          name: "company_name",
          value: single_agency.name,
        },
        {
          label: "Company Website",
          required: true,
          type: "text",
          name: "website",
          value:
            single_agency.links.find((link) => link.label == "website")?.url ??
            "",
        },
        {
          label: "Location",
          required: true,
          type: "dropdown",
          name: "state_id",
          data: statesList,
          callback: (item) => changeState(item, "state_id"),
          placeholder: "Select State",
          value: statesList.find(
            (state) => state.value == single_agency.location?.state_id
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
            single_agency.location?.city_id &&
            citiesList.find(
              (city) => city.value == single_agency.location.city_id
            ),
        },
        {
          label: "Company LinkedIn",
          required: true,
          type: "text",
          name: "linkedin",
          value:
            single_agency.links.find((link) => link.label == "linkedin")?.url ??
            "",
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
        },
        {
          label: "About Your Company",
          required: true,
          type: "editor",
          name: "about",
          value: user.about,
        },
        {
          label: "Industry Specialty",
          required: true,
          type: "dropdown",
          data: industry,
          isMulti: true,
          name: "industry_experience",
          callback: (item) => handleMultiChange(item, "industry_experience"),
          value: industry.filter((item) =>
            single_agency.industry_experience.includes(item.label)
          ),
        },
        {
          label: "Media Speciality",
          required: true,
          type: "dropdown",
          data: media,
          isMulti: true,
          name: "media_experience",
          callback: (item) => handleMultiChange(item, "media_experience"),
          value: media.filter((item) =>
            single_agency.media_experience.includes(item.label)
          ),
        },
        {
          label: "Workplace Preference",
          required: true,
          type: "dropdown",
          isMulti: true,
          data: workplace_preference,
          name: "workplace_preference",
          callback: (item) =>
            handleWorkplaceChange(item, "workplace_preference"),
          value: workplace_preference.filter((item) => single_agency[item.key]),
        },
        {
          label: "Company Size",
          required: true,
          type: "text",
          name: "size",
          value: single_agency.size,
        },
        {
          label: "Show Company Profile",
          required: true,
          type: "dropdown",
          data: showProfile,
          name: "show_profile",
          value: showProfile.filter((item) => item.value == user.is_visible),
        },
        {
          label: "Your Ad Agency Creatives Profile URL",
          required: true,
          type: "text",
          name: "slug",
          value: single_agency.slug,
        },
        {
          label: "Upload your agency reel",
          required: true,
          type: "video",
          image: single_agency.logo,
          name: "company_video",
        },
      ]);
    }
  }, [single_agency, user, media, industry, statesList, citiesList]);

  // Cities update
  /*   useEffect(() => {
      if (citiesList.length > 0 && fields.length) {
        let updatedFields = [...fields];
        updatedFields[4].data = citiesList;
        setFields(updatedFields);
      }
    }, [citiesList, fields]); */

  //Set initial form data
  useEffect(() => {
    if (Object.keys(single_agency).length > 0 && !isLoading) {
      setFormData({
        company_name: single_agency.name,
        website:
          single_agency.links.find((link) => link.label == "website")?.url ??
          "",
        state_id: single_agency.location?.state_id,
        city_id: single_agency.location?.city_id,
        linkedin:
          single_agency.links.find((link) => link.label == "linkedin")?.url ??
          "",
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: "",
        about: single_agency.about,
        industry_experience: single_agency.industry_experience.map(
          (item) => industry_experiences.find((j) => j.name == item).id
        ),
        media_experience: single_agency.media_experience.map(
          (item) => media_experiences.find((j) => j.name == item).id
        ),
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
    let newFields = [...fields];
    const fieldIndex = newFields.findIndex((item) => item.name == name);
    newFields[fieldIndex].value = value;
    setFields([...newFields]);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (item, name) => {
    setFormData((prev) => ({ ...prev, [name]: item.value }));
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = () => {
    (async () => {
      await saveAgency(user.uuid, formData);
      reloadUserData(user.uuid);
      showAlert("Agency profile updated successfully.");
    })();

  };

  const removeLogo = () => {
    logoRef.current.src = "";
  };

  const handleFileChange = (event, resource) => {
    const file = event.target.files[0];
    logoRef.current.src = URL.createObjectURL(file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uuid);
      formData.append("resource_type", "agency_logo");
      (async () => {
        await saveAgencyImage(formData);
        reloadUserData(user.uuid);
        showAlert("Agency logo updated successfully.");
      })();
    }
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
                          onChange={(e) =>
                            handleFileChange(e, "agency_logo", logoRef)
                          }
                        />
                      </div>
                    </div>
                  );
                case "video":
                  return (
                    <div className="col-12" key={index}>
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      <div className="row align-items-center upload-box">
                        <div className="col-md-2 col-sm-4 col-12">
                          {/* <img
                            src={field.image}
                            className="w-100"
                            ref={videoRef}
                          /> */}
                        </div>
                        <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
                          <button
                            className="btn btn-secondary w-100 mb-2 text-uppercase"
                            onClick={() => videoUploadRef.current.click()}
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
                          ref={videoUploadRef}
                          className="d-none"
                          onChange={(e) =>
                            handleFileChange(e, "agency_reel", videoRef)
                          }
                        />
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
                        value={field.value}
                        onChange={(e) => handleTextChange(e, field.name)}
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
                        options={field.data.map((option) => ({
                          ...option,
                          // isDisabled: formData.length ? formData[field.name].length > 7 : false,
                        }))}
                        isMulti={field.isMulti || false}
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
              Save Profile {formSubmit && <CircularProgress size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
