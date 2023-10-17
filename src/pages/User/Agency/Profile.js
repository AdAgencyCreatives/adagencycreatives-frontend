import { useContext, useEffect, useState } from "react";
import "../../../styles/AgencyDashboard/Profile.scss";
import Select from "react-select";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Logo from "../../../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { FiPaperclip, FiTrash2 } from "react-icons/fi";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import Loader from "../../../components/Loader";

const Profile = () => {
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [media, setMedia] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [fields, setFields] = useState([]);

  const workplace_preference = [
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Onsite", value: "onsite" },
  ];
  const showProfile = [
    { label: "Show", value: 1 },
    { label: "Hide", value: 0 },
  ];

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { single_agency },
    getAgency,
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
      getAgency(user.username);
    }
  }, [user]);

  useEffect(() => {
    if (Object.keys(single_agency).length > 0 && citiesList.length === 0) {
      console.log("fetching cities");
      getCities(single_agency.location.state_id);
    }
  }, [single_agency, citiesList]);

  useEffect(() => {
    if (Object.keys(single_agency).length > 0) {
      setIsloading(false);
      setFields([
        {
          label: "Your Logo",
          required: true,
          type: "image",
          image: single_agency.logo,
          name: "_employer_featured_image",
        },
        {
          label: "Company Name",
          required: true,
          type: "text",
          name: "_employer_title",
          value: single_agency.name,
        },
        {
          label: "Company Website",
          required: true,
          type: "text",
          name: "_employer_website",
          value: single_agency.links.find((link) => link.label == "website")
            .url,
        },
        {
          label: "Location",
          required: true,
          type: "dropdown",
          name: "_employer_location1",
          data: statesList,
          callback: changeState,
          placeholder: "Select State",
          value: statesList.find(
            (state) => (state.label = single_agency.location.state)
          ),
        },
        {
          label: "",
          type: "dropdown",
          name: "_employer_location2",
          data: citiesList,
          placeholder: "Select City",
          value: citiesList.find(
            (city) => (city.value = single_agency.location.city_id)
          ),
        },
        {
          label: "Company LinkedIn",
          required: true,
          type: "text",
          name: "_employer_linkedin",
          value: single_agency.links.find((link) => link.label == "linkedin")
            .url,
        },
        {
          label: "Contact Email",
          required: true,
          type: "text",
          name: "_employer_email",
          value: user.email,
        },
        {
          label: "Contact First Name",
          required: true,
          type: "text",
          name: "employer-contact-firstname",
          value: user.first_name,
        },
        {
          label: "Contact Last Name",
          required: true,
          type: "text",
          name: "employer-contact-lastname",
          value: user.last_name,
        },
        {
          label: "Contact Phone Number",
          required: true,
          type: "text",
          name: "_employer_phone",
          value: user.first_name,
        },
        {
          label: "About Your Company",
          required: true,
          type: "editor",
          name: "_employer_description",
          value: user.about,
        },
        {
          label: "Industry Specialty",
          required: true,
          type: "dropdown",
          data: industry,
          isMulti: true,
          name: "_employer_category",
          value: single_agency.industry_experience,
        },
        {
          label: "Media Experience",
          required: true,
          type: "dropdown",
          data: media,
          isMulti: true,
          name: "_employer_category",
          value: single_agency.media_experience,
        },
        {
          label: "Workplace Preference",
          required: true,
          type: "dropdown",
          isMulti: true,
          data: workplace_preference,
          name: "_employer_category",
          value: single_agency.workplace_preference,
        },
        {
          label: "Company Size",
          required: true,
          type: "text",
          name: "_employer_company_size",
          value: single_agency.size,
        },
        {
          label: "Show Company Profile",
          required: true,
          type: "dropdown",
          data: showProfile,
          name: "_employer_show_profile",
          value: "",
        },
        {
          label: "Your Ad Agency Creatives Profile URL",
          required: true,
          type: "text",
          name: "_employer_profile_url",
          value: single_agency.slug,
        },
      ]);
    }
  }, [single_agency, user]);

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
      return { label: item.name, value: item.uuid || item.id };
    });
    return parsedValue;
  };

  const changeState = (item, { action }) => {
    if (action == "select-option") {
      getCities(item.value);
    }
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="agency-page-profile">
      <h3 className="page-title">Edit Profile</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Edit Profile</h4>
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
                        className="input-text"
                        name="_employer_featured_image"
                        value=""
                      />
                      <div className="row align-items-center upload-box">
                        <div className="col-md-2 col-sm-4 col-12">
                          <img src={field.image} className="w-100" />
                        </div>
                        <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3">
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
                    <div className="col-sm-6" key={field.name}>
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                        {field.required && <span className="required">*</span>}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={field.value}
                      />
                    </div>
                  );
                case "dropdown":
                  return (
                    <div className="col-sm-6" key={field.name}>
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
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
