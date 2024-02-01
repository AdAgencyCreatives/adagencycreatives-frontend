import { useEffect, useState, useContext, useRef } from "react";
import { Context as DataContext } from "../context/DataContext";
import { Context as JobsContext } from "../context/JobsContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AlertContext } from "../context/AlertContext";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import moment from "moment";

import useUploadHelper from "./useUploadHelper";

const useFormData = (props = {}) => {

  const { isFileValid } = useUploadHelper();

  const id = props.id;
  const [agenciesList, setAgencies] = useState([]);
  const setJobStatus = props.setJobStatus;
  const cityRef = useRef();
  const imageUploadRef = useRef();
  const logoRef = useRef();
  const linkRef = useRef();
  const [editorRef, setEditorRef] = useState();
  const [categoriesList, setCategories] = useState([]);
  const [statesList, setStates] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [strengthsList, setStrengths] = useState([]);
  const [media, setMedia] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [experience, setExperience] = useState([]);
  const [industry, setIndustry] = useState([]);
  //   const [isLoading, setIsloading] = useState(true);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);
  const isEdit = id !== undefined;

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const {
    state: { user, token },
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  const {
    state: { single_job, formSubmit },
    getJobById,
    saveJob,
    createJob,
  } = useContext(JobsContext);

  const {
    state: { agencies, categories, states, cities, media_experiences, industry_experiences, employment_type, years_experience, strengths },
    getAssignedAgencies,
    getCategories,
    getStates,
    getCities,
    getMediaExperiences,
    getIndustryExperiences,
    getResumeEmploymentTypes,
    getYearsExperience,
    getStrengths,
  } = useContext(DataContext);

  useEffect(() => {
    if (token) {
      if (id) {
        getJobById(id);
      }
      getAssignedAgencies();
      getCategories();
      getStates();
      getMediaExperiences();
      getIndustryExperiences();
      getResumeEmploymentTypes();
      getYearsExperience();
      getStrengths();
    }
  }, [token]);

  //Fetch initial Cities
  useEffect(() => {
    if (Object.keys(single_job).length > 0 && citiesList.length === 0) {
      getCities(single_job.location.state_id);
    }
  }, [single_job, citiesList]);

  useEffect(() => {
    let data = agencies;
    if (agencies.length) {
      data = parseAgenciesFieldsData(agencies);
    }
    setAgencies(data);
  }, [agencies]);

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
    let data = employment_type;
    if (employment_type.length) {
      data = parseEmployementTypeFieldsData(employment_type);
    }
    setEmployment(data);
  }, [employment_type]);

  const parseEmployementTypeFieldsData = (data) => {
    const parsedValue = data.map((item) => {
      return { label: item.name, value: item.name, key: item.name };
    });
    return parsedValue;
  };


  useEffect(() => {
    setExperience(years_experience.map((item) => ({ label: item.name, value: item.name })));
  }, [years_experience]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const parseFieldsData = (data) => {
    const parsedValue = data.map((item) => {
      return { label: item.name, value: item.uuid || item.id, key: item.name };
    });
    return parsedValue;
  };

  const parseAgenciesFieldsData = (data) => {
    const parsedValue = data.map((item) => {
      return { label: item.agency_name, value: item.agency_id, key: item.name, agency: item };
    });
    return parsedValue;
  };

  const changeState = (item, name) => {
    getCities(item.value);
    handleDropdownChange(item, name);
    cityRef.current?.clearValue();
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

  const handleDateChange = (date, name) => {
    const value = moment(date).format("YYYY-MM-DD HH:mm:ss");
    updateFields(date, name);
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
      if (name == "apply_type") {
        linkRef.current.style.display = item.value == "Internal" ? "none" : "";
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!props.useTinyMCE && !editorState.getCurrentContent().hasText()) {
      editorRef.focus();
      showAlert("The content cannot be empty");
    } else {
      let newFormData = { ...formData, 'employment_type': (formData['employment_type'] && formData['employment_type'].length ? (Array.isArray(formData['employment_type']) ? formData['employment_type'].join(',') : formData['employment_type']) : "") };
      if (isEdit) {
        await saveJob(id, newFormData);
        setJobStatus("preview");
      } else {
        newFormData.user_id = user.uuid;
        createJob(newFormData);
        setJobStatus("preview");
      }
    }
  };

  const removeLogo = () => {
    logoRef.current.src = "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      let validationResult = isFileValid(file, "image", props?.uploadGuidePage);
      if (!validationResult.status) {
        imageUploadRef.current.value = '';
        showAlert(validationResult.message);
        return;
      }

      logoRef.current.src = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uuid);
      formData.append("resource_type", "agency_logo");
      // saveAgencyImage(formData);
    }
  };

  return {
    states: {
      user,
      formData,
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
      editorRef,
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
    handleFileChange,
    setFields,
    setEditorState,
    setFormData,
    setEditorRef,
    formData,
  };
};

export default useFormData;
