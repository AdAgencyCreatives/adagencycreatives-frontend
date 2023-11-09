import { api } from "../api/api";

export const getGroups = async (user_id) => {
    try {
        const response = await api.get("/groups?sort=-created_at&filter[user_id]="+user_id);
        return response.data.data;
    } catch (error) {
    }
    return null;
};

export const saveGroup = async (data) => {
    try {
        const response = await api.post("/groups", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;
};

export const updateGroup = async (id) => {
    try {
        const response = await api.patch("/groups/"+id);
        return response.data;
    } catch (error) {
    }
    return null;
};

export const deleteGroup = async (id) => {
    try {
        const response = await api.delete("/groups/"+id);
        return response.data;
    } catch (error) {
    }
    return null;
};
