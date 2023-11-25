import { api } from "../api/api";

export const joinGroup = async (data) => {
    try {
        const response = await api.post("/group-members", data);
        return response.data.data;
    } catch (error) { 
        return null;
    }
    return null;
};

export const leaveGroup = async (id) => {
    try {
        const response = await api.delete("/group-members/" + id);
        return response.data.data;
    } catch (error) { 
        return null;
    }
    return null;
};

export const getGroupMembership = async (group_id, user_id) => {
    try {
        const response = await api.get("/group-members?filter[group_id]=" + group_id + "&filter[user_id]=" + user_id);
        return response.data.data[0];
    } catch (error) { 
        return null;
    }
    return null;
};