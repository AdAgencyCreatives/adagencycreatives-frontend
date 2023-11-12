import { useEffect, useState, useContext, useRef } from "react";
import { Context as DataContext } from "../context/DataContext";
import { Context as JobsContext } from "../context/JobsContext";
import { Context as AuthContext } from "../context/AuthContext";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import moment from "moment";

const useFormData = (props = {}) => {
  const id = props.id;
  const setJobStatus = props.setJobStatus;
  const imageUploadRef = useRef();
  const logoRef = useRef();
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

  const {
    state: { single_job, formSubmit },
    getJobById,
    saveJob,
    createJob,
  } = useContext(JobsContext);

  const {
    state: {
      categories,
      states,
      cities,
      media_experiences,
      industry_experiences,
      employment_type,
      years_experience,
      strengths,
    },
    getCategories,
    getStates,
    getCities,
    getMediaExperiences,
    getIndustryExperiences,
    getEmploymentTypes,
    getYearsExperience,
    getStrengths,
  } = useContext(DataContext);

  useEffect(() => {
    if (token) {
      if (id) {
        getJobById(id);
      }
      getCategories();
      getStates();
      getMediaExperiences();
      getIndustryExperiences();
      getEmploymentTypes();
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
    setEmployment(
      employment_type.map((item) => ({ label: item, value: item }))
    );
  }, [employment_type]);

  useEffect(() => {
    setExperience(
      years_experience.map((item) => ({ label: item.name, value: item.name }))
    );
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

  const changeState = (item, name) => {
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
    setFormData((prev) => ({ ...prev, [name]: item.value }));
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

  const handleSubmit = () => {
    if (isEdit) {
      saveJob(id, formData);
    } else {
      formData.user_id = user.uuid;
      createJob(formData);
      setJobStatus("preview");
    }
    
  };

  const removeLogo = () => {
    logoRef.current.src = "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    logoRef.current.src = URL.createObjectURL(file);
    if (file) {
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
  };
};

export default useFormData;
