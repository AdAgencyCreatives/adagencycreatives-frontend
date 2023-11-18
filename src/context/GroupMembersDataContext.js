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

export const leaveGroup = async (data) => {
    try {
        const response = await api.post("/group-members", data);
        return response.data.data;
    } catch (error) { 
        return null;
    }
    return null;
};

export const getGroupMembership = async (data) => {
    try {
        const response = await api.post("/group-members", data);
        return response.data.data;
    } catch (error) { 
        return null;
    }
    return null;
};
