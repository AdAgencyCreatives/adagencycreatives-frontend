import { useEffect, useRef, useState, useContext } from "react";
import Select from "../../../components/Select";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Editor as EditorTinyMCE } from '@tinymce/tinymce-react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Placeholder from "../../../assets/images/placeholder.png";
import { FiChevronDown, FiChevronUp, FiPaperclip, FiTrash2, FiX, FiFile, FiVideo } from "react-icons/fi";
import "../../../styles/AgencyDashboard/MyResume.scss";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Context as DataContext } from "../../../context/DataContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as CreativesContext } from "../../../context/CreativesContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import Loader from "../../../components/Loader";
import { CircularProgress } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import useUploadHelper from "../../../hooks/useUploadHelper";
import IconMessage from "../../../components/IconMessage";

const MyResume = () => {
  const editorRefTinyMCE = useRef(null);
  const cityRef = useRef();
  const resumeUploadRef = useRef();
  const resumeRef = useRef();

  const portfolioUploadRef = useRef();
  const portfolioRef = useRef();

  const videoUploadRef = useRef();
  const videoRef = useRef();
  const [videoItem, setVideoItem] = useState(false);

  const [useTinyMCE, setUseTinyMCE] = useState(true);
  const [isLoadingTinyMCE, setIsLoadingTinyMCE] = useState(true);

  const [categoriesList, setCategories] = useState([]);
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [media, setMedia] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [experience, setExperience] = useState([]);
  const [strengthsList, setStrengths] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [fieldsGenerated, setFieldsGenerated] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);
  const repeaterRef = useRef(null);
  const [showVideoItem, setShowVideoItem] = useState(false);

  const { isFileValid, getUploadGuide, getUploadGuideMessage } = useUploadHelper();
  const imageUploadGuide = getUploadGuide('image', 'my-resume');
  const videoUploadGuide = getUploadGuide('video', 'my-resume');
  const fileUploadGuide = getUploadGuide('application', 'my-resume');
  const imageUploadGuideMessage = getUploadGuideMessage(imageUploadGuide);
  const videoUploadGuideMessage = getUploadGuideMessage(videoUploadGuide);
  const fileUploadGuideMessage = getUploadGuideMessage(fileUploadGuide);

  const educationObject = {
    showDropdown: false,
    data: [
      {
        label: "",
        type: "hidden",
        name: "id",
      },
      {
        label: "Degree Program",
        type: "input",
        name: "degree",
      },
      {
        label: "College or Institution",
        type: "input",
        name: "college",
      },
      {
        label: "Completion Date",
        type: "date",
        name: "completed_at",
        value: new Date(),
      },
    ],
  };

  const experienceObject = {
    showDropdown: false,
    data: [
      {
        label: "",
        type: "hidden",
        name: "id",
      },
      {
        label: "Title",
        type: "input",
        name: "title",
      },
      {
        label: "Start Date",
        type: "date",
        name: "started_at",
      },
      {
        label: "End Date",
        type: "date",
        name: "completed_at",
      },
      {
        label: "Company",
        type: "input",
        name: "company",
      },
      {
        label: "Description",
        type: "textarea",
        name: "description",
      },
    ],
  };

  const {
    state: { single_creative, creative_experience, creative_education, resume, formSubmit, portfolio_items, video },
    getCreativeById,
    saveResume,
    saveAttachment,
    getResume,
    getPortfolio,
    getVideo,
    removeAttachment,
  } = useContext(CreativesContext);

  const {
    state: { categories, states, cities, media_experiences, industry_experiences, employment_type, years_experience, strengths },
    getCategories,
    getStates,
    getCities,
    getMediaExperiences,
    getIndustryExperiences,
    getEmploymentTypes,
    getYearsExperience,
    getStrengths,
  } = useContext(DataContext);

  const {
    state: { user, token },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

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
    if (user) {
      getCreativeById(user.uuid);
      getResume(user.uuid);
      getPortfolio(user.uuid);
      getVideo(user.uuid);
    }
  }, [user]);

  useEffect(() => {
    setVideoItem(video);
  }, [video]);

  //Fetch all fields
  useEffect(() => {
    if (token) {
      getCategories();
      getStates();
      getMediaExperiences();
      getIndustryExperiences();
      getEmploymentTypes();
      getYearsExperience();
      getStrengths();
    }
  }, [token]);

  // Set initial fields
  useEffect(() => {
    if (
      Object.keys(single_creative).length &&
      industry.length &&
      media.length &&
      statesList.length &&
      (single_creative.location && single_creative.location.state ? citiesList.length : true) &&
      categoriesList.length &&
      employment_type.length &&
      strengthsList.length &&
      experience.length
    ) {
      setIsloading(false);
      if (single_creative.about) {
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(single_creative.about).contentBlocks)));
      }
      setFields([
        {
          label: "Your Title",
          required: true,
          type: "text",
          name: "title",
          column: "12",
          value: single_creative.title || "",
        },
        {
          label: "Industry Job Title",
          type: "dropdown",
          required: true,
          column: "6",
          name: "category_id",
          data: categoriesList,
          callback: (item) => handleDropdownChange(item, "category_id"),
          placeholder: "Select Job Title",
          value: categoriesList.find((category) => category.label == single_creative.category),
        },
        {
          label: "Years of Experience",
          type: "dropdown",
          required: true,
          data: experience,
          name: "years_of_experience",
          callback: (item) => handleDropdownChange(item, "years_of_experience"),
          value: experience.find((item) => item.value == single_creative.years_of_experience),
          column: "6",
        },
        {
          label: "Industry Experience",
          type: "dropdown",
          required: true,
          data: industry,
          isMulti: true,
          name: "industry_experience",
          callback: (item) => handleMultiChange(item, "industry_experience"),
          value: industry.filter((item) => single_creative.industry_experience.includes(item.label)),
          column: "6",
        },
        {
          label: "Media Experience",
          type: "dropdown",
          required: true,
          data: media,
          isMulti: true,
          name: "media_experience",
          callback: (item) => handleMultiChange(item, "media_experience"),
          value: media.filter((item) => single_creative.media_experience.includes(item.label)),
          column: "6",
        },
        {
          label: "Location (State)",
          required: true,
          type: "dropdown",
          name: "state_id",
          data: statesList,
          callback: (item) => changeState(item, "state_id"),
          placeholder: "Select State",
          value: single_creative.location && statesList.find((state) => state.value == single_creative.location.state_id),
          column: "6",
        },
        {
          label: "Nearest Major City",
          type: "dropdown",
          name: "city_id",
          required: true,
          data: citiesList,
          placeholder: "Select City",
          callback: (item) => handleDropdownChange(item, "city_id"),
          value: single_creative.location && citiesList.find((city) => city.value == single_creative.location.city_id),
          column: "6",
        },
        {
          label: "Character Strengths",
          required: true,
          type: "dropdown",
          data: strengthsList,
          isMulti: true,
          name: "strengths",
          callback: (item) => handleMultiChange(item, "strengths"),
          value: strengthsList.filter((item) => single_creative.character_strengths.includes(item.label)),
          placeholder: "Select strengths",
          column: "6",
        },
        {
          label: "Employment Type",
          required: true,
          type: "dropdown",
          data: employment,
          name: "employment_type",
          callback: (item) => handleDropdownChange(item, "employment_type"),
          value: employment.find((item) => {
            return item.value == single_creative.employment_type;
          }),
          column: "6",
        },
        {
          label: "Open to Relocation",
          required: true,
          type: "radio",
          name: "is_opentorelocation",
          value: single_creative.is_opentorelocation,
          column: "6",
        },
        {
          label: "Open to Remote",
          required: true,
          type: "radio",
          name: "is_remote",
          value: single_creative.workplace_preference.is_remote,
          column: "6",
        },

        {
          label: "About Me and Why Advertising",
          required: true,
          type: "editor",
          name: "about",
          value: single_creative.about,
          column: "12",
        },

        {
          label: "Education",
          required: false,
          type: "repeater",
          name: "educations",
          column: "12",
          schema: { ...educationObject },
          items: creative_education.length
            ? creative_education.map((item) => {
              return {
                showDropdown: false,
                data: educationObject.data.map((ed) => {
                  return {
                    ...ed,
                    value: item[ed.name],
                  };
                }),
              };
            })
            : [structuredClone(educationObject)],
        },
        {
          label: "Experience",
          required: false,
          type: "repeater",
          name: "experiences",
          column: "12",
          schema: { ...experienceObject },
          items: creative_experience.length
            ? creative_experience.map((item) => {
              return {
                showDropdown: false,
                data: experienceObject.data.map((ed) => {
                  return {
                    ...ed,
                    value: item[ed.name],
                  };
                }),
              };
            })
            : [structuredClone(experienceObject)],
        },
      ]);
      setFieldsGenerated(true);
    }
  }, [single_creative, user, media, industry, statesList, categoriesList, citiesList, employment, experience, strengthsList, creative_education, creative_experience, fieldsGenerated]);

  //Set initial form data
  useEffect(() => {
    if (Object.keys(single_creative).length > 0 && !isLoading) {
      setFormData({
        state_id: single_creative.location && single_creative.location.state_id,
        city_id: single_creative.location && single_creative.location.city_id,
        about: single_creative.about,
        employment_type: single_creative.employment_type,
        years_of_experience: single_creative.years_of_experience,
        industry_experience: single_creative.industry_experience.map((item) => industry_experiences.find((j) => j.name == item).id),
        media_experience: single_creative.media_experience.map((item) => media_experiences.find((j) => j.name == item).id),
        strengths: single_creative.character_strengths.map((item) => strengths.find((j) => j.name == item).id),
        is_remote: single_creative.workplace_preference.is_remote,
        is_opentorelocation: single_creative.is_opentorelocation,
      });
    }
  }, [isLoading, media_experiences, industry_experiences, strengths]);

  //Set initial education form data
  useEffect(() => {
    setEducationList(
      creative_education.map((item) => ({
        id: item.id,
        degree: item.degree,
        college: item.college,
        completed_at: item.completed_at,
      }))
    );
  }, [creative_education]);

  useEffect(() => {
    setExperienceList(
      creative_experience.map((item) => ({
        id: item.id,
        title: item.title,
        company: item.company,
        started_at: item.started_at,
        description: item.description,
        completed_at: item.completed_at,
      }))
    );
  }, [creative_experience]);

  //Fetch initial Cities
  useEffect(() => {
    if (Object.keys(single_creative).length > 0 && single_creative.location && citiesList.length === 0) {
      if (single_creative.location.state_id) {
        getCities(single_creative.location.state_id);
      }
    }
  }, [single_creative, citiesList]);

  useEffect(() => {
    let data = categories;
    if (categories.length) {
      data = parseFieldsData(categories);
    }
    setCategories(data);
  }, [categories]);

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
    let data = strengths;
    if (strengths.length) {
      data = parseFieldsData(strengths);
    }
    setStrengths(data);
  }, [strengths]);

  useEffect(() => {
    setEmployment(employment_type.map((item) => ({ label: item, value: item })));
  }, [employment_type]);

  useEffect(() => {
    setExperience(years_experience.map((item) => ({ label: item.name, value: item.name })));
  }, [years_experience]);

  const parseFieldsData = (data) => {
    const parsedValue = data.map((item) => {
      return { label: item.name, value: item.uuid || item.id, key: item.name };
    });
    return parsedValue;
  };

  const changeState = (item, name) => {
    cityRef.current?.clearValue();
    getCities(item.value);
    handleDropdownChange(item, name);
  };

  const handleTextChange = (e, name) => {
    const value = e.target.value;
    updateFields(value, name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e, name) => {
    const value = parseInt(e.target.value);
    updateFields(value, name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateFields = (value, name) => {
    let newFields = [...fields];
    const fieldIndex = newFields.findIndex((item) => item.name == name);
    newFields[fieldIndex].value = value;
    setFields([...newFields]);
  };

  const handleDropdownChange = (item, name) => {
    if (item) {
      setFormData((prev) => ({ ...prev, [name]: item.value }));
    }
  };

  const handleMultiChange = (item, name) => {
    const values = item.map((i) => i.value);
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleEditorChange = (editorState, name) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const contentStateText = contentState.getPlainText(); // This gives you the plain text content
    const contentStateRaw = convertToRaw(contentState); // This gives you the content in a raw format
    const html = draftToHtml(contentStateRaw);
    setFormData((prev) => ({ ...prev, [name]: html }));
  };

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  const handleSubmit = async () => {
    console.log(educationList, experienceList);
    await saveResume(user.uuid, formData, educationList, experienceList);
    showAlert("Resume updated successfully");
  };

  const removeItem = (name, ref, uploadRef) => {
    let updated = [...portfolio];
    let index = updated.findIndex((p) => p.name == name);
    let item = { ...updated[index] };
    if (!item?.items?.length) {
      return;
    }
    let last = item.items.pop();
    updated[index] = item;
    setPortfolio([...updated]);
    removeAttachment(last.id);
    uploadRef.current.value = '';
  };

  const removeVideo = async (id) => {
    if (!id) {
      return;
    }
    await removeAttachment(id);
    setVideoItem(null);
    videoUploadRef.current.value = '';
    showAlert("Video removed successfully");
  };

  const handleFileChange = async (event, field) => {
    let name = field.name;
    let ref = field.ref;
    let uploadRef = field.uploadRef;
    const file = event.target.files[0];

    let validationResult = isFileValid(file, (name == "portfolio_item" ? "image" : (name == "creative_reel" ? "video" : "application")), "my-resume");
    if (!validationResult.status) {
      uploadRef.current.value = '';
      showAlert(validationResult.message);
      return;
    }

    let updated = [...portfolio];
    let index = updated.findIndex((p) => p.name == name);
    let item = { ...updated[index] };

    const filename = file.name;
    if (name == "resume") {
      item.items = [{ name: filename }];
    } else if (name == "portfolio_item") {

      if (item?.items?.length >= 5) {
        showAlert("Up to 5 images can be uploaded.");
        return;
      }
      item.items.push({ url: URL.createObjectURL(file) });
    }
    updated[index] = item;
    setPortfolio([...updated]);
    console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uuid);
      formData.append("resource_type", name);
      const result = await saveAttachment(formData);
      if (result.data) {
        if (name == "creative_reel") setVideoItem({ name: file.name, id: result.data.id });
        showAlert("Item uploaded successfully");
      }
    }
  };

  // Editor mounted
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const [portfolio, setPortfolio] = useState([
    {
      label: "Upload up to 5 image samples of your best work. A sneak peek.",
      required: false,
      type: "upload",
      name: "portfolio_item",
      items: [],
      accept: ".jpg, .jpeg, .png, .gif, .bmp, image/jpeg, image/png, image/gif, image/bmp",
      ref: portfolioRef,
      uploadRef: portfolioUploadRef,
    },
    {
      label: "Upload your resume here.",
      required: false,
      type: "upload",
      name: "resume",
      accept: ".doc, .docx, .pdf, .txt",
      items: [],
      ref: resumeRef,
      uploadRef: resumeUploadRef,
    },
    {
      label: "Upload your reel, spotlight or a video resume",
      required: false,
      type: "video",
      name: "company_video",
    },
  ]);

  useEffect(() => {
    let updated = [...portfolio];
    updated[1].items = [...resume];
    setPortfolio(updated);
  }, [resume]);

  useEffect(() => {
    let updated = [...portfolio];
    updated[0].items = [...portfolio_items];
    setPortfolio(updated);
  }, [portfolio_items]);

  const updateEducationList = (index, key_name, key_value) => {
    let updatedEducationList = [...educationList];
    if (updatedEducationList.length > 0) {
      updatedEducationList[index][key_name] = key_value;
    } else {
      updatedEducationList[0] = { id: '', degree: 'a', college: 'a', completed_at: '' }
    }

    setEducationList(updatedEducationList);
  };

  const updateExperienceList = (index, key_name, key_value) => {
    let updatedExperienceList = [...experienceList];
    updatedExperienceList[index][key_name] = key_value;
    setExperienceList(updatedExperienceList);
  };

  const addRepeaterList = (field) => {
    if (field.name == "educations") {
      const data = getRepeaterListMap(educationObject.data);
      setEducationList((prev) => [...prev, { ...data }]);
    }
    if (field.name == "experiences") {
      const data = getRepeaterListMap(experienceObject.data);
      setExperienceList((prev) => [...prev, { ...data }]);
    }
  };

  const getRepeaterListMap = (data) => {
    let map = {};
    data.forEach((item) => {
      map[item.name] = "";
    });
    return map;
  };

  const addRepeaterField = (field) => {
    addRepeaterList(field);
    let newQualifications = [...fields];
    const fieldIndex = newQualifications.findIndex((item) => item.name == field.name);
    let theField = { ...newQualifications[fieldIndex] };
    theField.items.push(structuredClone(theField.schema));
    newQualifications[fieldIndex] = { ...theField };
    setFields([...newQualifications]);
  };

  const handleRepeaterChange = (name, item_index, data_index, key_name, key_value) => {
    console.log(name, item_index, data_index, key_name, key_value);
    let updatedFields = [...fields];

    let repeaterField = updatedFields.find((field) => field.name === name);
    let fieldIndex = updatedFields.findIndex((field) => field.name === name);
    if (repeaterField && repeaterField.items && repeaterField.items[0] && repeaterField.items[0].data) {
      const childItem = repeaterField.items[item_index].data[data_index];
      if (childItem) {
        childItem.value = key_value;
        updatedFields[fieldIndex].items[item_index].data[data_index] = childItem;
        setFields([...updatedFields]);

        if (name == "educations") updateEducationList(item_index, key_name, key_value);
        else if (name == "experiences") updateExperienceList(item_index, key_name, key_value);
      }
    }
  };

  const toggleDropdown = (field, index) => {
    let newQualifications = [...fields];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        item.items[index].showDropdown = !item.items[index].showDropdown;
      }
    });
    setFields(newQualifications);
  };

  const deleteDropdown = (field, index) => {
    let newQualifications = [...fields];
    newQualifications.forEach((item) => {
      if (item.name == field.name) {
        item.items.splice(index, 1);
        if (field.name == "educations") {
          let list = [...educationList];
          list.splice(index, 1);
          setEducationList(list);
        }
        if (field.name == "experiences") {
          let list = [...experienceList];
          list.splice(index, 1);
          setExperienceList(list);
        }
      }
    });
    setFields(newQualifications);
  };

  const handleDateChange = (name, item_index, data_index, key_name, date) => {
    const value = moment(date).format("YYYY-MM-DD HH:mm:ss");
    handleRepeaterChange(name, item_index, data_index, key_name, value);
  };

  const getRepeaterField = (field) => (
    <div className="repeater-container">
      {field.items.map((item, index) => (
        <div className="repeater-field" field-id={index + 1} key={`repeater_${field.name}_${index}`}>
          <div className="close-btn" onClick={() => deleteDropdown(field, index)}>
            <FiX />
          </div>
          <div className="toggle-btn" onClick={() => toggleDropdown(field, index)}>
            {item.showDropdown ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          <div className="title" onClick={() => toggleDropdown(field, index)}>
            {field.label} {index + 1}
          </div>
          {item.showDropdown && (
            <div className="field-dropdown">
              {item.data.map((child, cindex) => (
                <div className="row align-items-start" key={`child_${field.name}_${index}_${child.name}`}>
                  <div className="col-sm-3">
                    <label>{child.label}</label>
                  </div>
                  <div className="col-sm-9">
                    {child.type == "input" ? (
                      <input
                        className="form-control"
                        name={child.name}
                        type="text"
                        value={child.value || ""}
                        onChange={(e) => handleRepeaterChange(field.name, index, cindex, child.name, e.target.value)}
                      />
                    ) : child.type == "textarea" ? (
                      <textarea className="form-control" rows={5} value={child.value || ""} onChange={(e) => handleRepeaterChange(field.name, index, cindex, child.name, e.target.value)}></textarea>
                    ) : child.type == "date" ? (
                      <DatePicker
                        className="form-control"
                        selected={child.value ? new Date(child.value) : ""}
                        onChange={(date) => handleDateChange(field.name, index, cindex, child.name, date)}
                        dateFormat="MMMM d, yyyy"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
              <div className="text-end">
                <button className="btn btn-secondary w-90 mb-2 text-uppercase ls-3 px-4" onClick={() => deleteDropdown(field, index)}>
                  Remove {field.label}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button className="btn btn-secondary w-90 mb-2 text-uppercase ls-3 mt-4 py-3 px-4" onClick={() => addRepeaterField(field)}>
        Add Another {field.label}
      </button>
    </div>
  );

  const getFormField = function (field) {
    switch (field.type) {
      case "video":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <div className="row align-items-center upload-box">
              <div className="col-md-12 col-sm-12 col-12">
                {videoItem && (
                  <>
                    <button className="btn btn-dark btn-hover-primary border-0 px-3 py-2 ls-3 me-3 mb-2" onClick={(e)=> setShowVideoItem(state => !state) }>
                      <span className="icon_type">
                        <FiVideo />
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
                <button className="btn btn-secondary w-100 mb-2 text-uppercase" onClick={() => videoUploadRef.current.click()}>
                  <FiPaperclip /> Upload
                </button>
                <button className="btn btn-secondary w-100 text-uppercase" onClick={() => removeVideo(videoItem?.id)}>
                  <FiTrash2 /> Remove
                </button>
              </div>
              <div className="col-md-9 col-sm-8 col-12">
                <IconMessage message={videoUploadGuideMessage} />
              </div>
              <input type="file" ref={videoUploadRef} className="d-none" accept=".mp4, .avi, .mov, video/*" onChange={(e) => handleFileChange(e, { name: "creative_reel", ref: videoRef, uploadRef: videoUploadRef })} />
            </div>
          </>
        );

      case "upload":
        return (
          <>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            <input type="hidden" className="input-text" name={field.name} value="" />
            <div className="row align-items-center upload-box">
              <div className="col-md-12 col-sm-4 col-12 mb-3">
                {field.items.map((item) =>
                  field.name == "resume" ? (
                    <button className="btn btn-dark btn-hover-primary border-0 px-3 py-2 ls-3 me-3 mb-2" key={item.name}>
                      <span className="icon_type">
                        <FiFile />
                      </span>
                      <div className="filename">{item.name}</div>
                    </button>
                  ) : (
                    <div className="portfolio_item">
                      <img src={item.url} key={item.name} className="w-100 h-100" alt="" />
                    </div>
                  )
                )}
              </div>
              <div className="col-md-3 col-sm-4 col-12 mt-md-0 mt-3 mb-2">
                <button className="btn btn-secondary w-100 mb-2 text-uppercase" onClick={() => field.uploadRef.current.click()}>
                  <FiPaperclip /> Upload
                </button>
                <button className="btn btn-secondary w-100 text-uppercase" onClick={() => removeItem(field.name, field.ref, field.uploadRef)}>
                  <FiTrash2 /> Remove
                </button>
              </div>
              <div className="col-md-9 col-sm-4 col-12">
                <IconMessage message={field.name == "resume" ? fileUploadGuideMessage : imageUploadGuideMessage} />
              </div>
              <input type="file" ref={field.uploadRef} className="d-none" accept={field.accept} onChange={(e) => handleFileChange(e, field)} />
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
            <input type="text" className="form-control" value={field.value} onChange={(e) => handleTextChange(e, field.name)} />
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
            <div className="form-check">
              <input type="radio" className="form-check-input me-2" name={field.name} value={1} checked={field.value} onChange={(e) => handleRadioChange(e, field.name)} />
              <label className="form-check-label" htmlFor={field.name}>
                Yes
              </label>
            </div>
            <div className="form-check">
              <input type="radio" className="form-check-input me-2" name={field.name} value={0} checked={!field.value} onChange={(e) => handleRadioChange(e, field.name)} />
              <label className="form-check-label" htmlFor={field.name}>
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
              isMulti={field.isMulti || false}
              onChange={field.callback}
              placeholder={field.placeholder}
              defaultValue={field.value}
              ref={(ref) => (field.name == "city_id" ? (cityRef.current = ref) : false)}
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
          </>
        );

      case "editor":
        return (
          <>
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
                      placeholder: 'What do you want to talk about?',
                    }}
                    value={formData[field.name]}
                    onEditorChange={(e) => {
                      setFormData((prev) => ({ ...prev, [field.name]: (editorRefTinyMCE.current ? editorRefTinyMCE.current.getContent() : "") }));
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
          </>
        );

      case "repeater":
        return (
          <div className="repeater-field" ref={repeaterRef}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            {getRepeaterField(field)}
          </div>
        );
      default:
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="my-resume mb-5">
      <h3 className="page-title">Edit Resume</h3>
      <div className="card">
        <h4 className="text-uppercase mb-4">Qualifications</h4>
        <div className="profile-edit-form">
          <div className="row gx-3 gy-5 align-items-end">
            {fields.map((field) => {
              return (
                <div className={`col-sm-${field.column}`} key={field.name}>
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
          <div className="row gx-3 gy-5 align-items-end">
            {portfolio.map((field) => {
              return (
                <div className={`col-${field.column}`} key={field.name}>
                  {getFormField(field)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="submit-btn mt-4">
        <button className="btn btn-dark btn-hover-primary border-0 px-3 py-2 ls-3 text-uppercase" style={{ fontSize: 20 }} onClick={handleSubmit} disabled={formSubmit}>
          Save Profile {formSubmit && <CircularProgress size={20} />}
        </button>
      </div>
    </div>
  );
};

export default MyResume;
