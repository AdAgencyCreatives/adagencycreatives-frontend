import { api } from "../api/api";

export const getActivities = async (user_id) => {
    try {
        const response = await api.get("/activities?sort=-created_at&filter[user_id]="+user_id);
        return response.data.data;
    } catch (error) {
    }
    return null;
};

export const saveActivity = async (data) => {
    try {
        const response = await api.post("/activities", data);
        return response.data;
    } catch (error) {
    }
    return null;
};

export const updateActivity = async (id) => {
    try {
        const response = await api.patch("/activities/"+id);
        return response.data;
    } catch (error) {
    }
    return null;
};

export const deleteActivity = async (id) => {
    try {
        const response = await api.delete("/activities/"+id);
        return response.data;
    } catch (error) {
    }
    return null;
};
