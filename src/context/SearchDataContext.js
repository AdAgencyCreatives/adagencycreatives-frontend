import { api } from "../api/api";

export const getData = async (path, callback = () => { }) => {
    try {
        const response = await api.get(path);
        callback(response.data, null);
    } catch (error) {
        callback(null, error);
    }
};

export const getSearchItems = async (callback = () => { }) => {
    return getData("/get_search_items?per_page=-1", callback);
};


export const getCategories = async (callback = () => { }) => {
    return getData("/get_categories?per_page=-1", callback);
};

export const getStates = async (callback = () => { }) => {
    return getData("/get_states?per_page=-1", callback);
};

export const getCities = async (callback = () => { }) => {
    return getData("/get_cities?per_page=-1", callback);
};

export const getEmploymentTypes = async (callback = () => { }) => {
    return getData("/employment_types?per_page=-1", callback);
};

export const getYearsOfExperience = async (callback = () => { }) => {
    return getData("/years-of-experience?per_page=-1", callback);
};

export const getMediaExperiences = async (callback = () => { }) => {
    return getData("/get_media-experiences?per_page=-1", callback);
};

export const getStrengths = async (callback = () => { }) => {
    return getData("/get_strengths?per_page=-1", callback);
};

export const getIndustryExperiences = async (callback = () => { }) => {
    return getData("/get_industry-experiences?per_page=-1", callback);
};