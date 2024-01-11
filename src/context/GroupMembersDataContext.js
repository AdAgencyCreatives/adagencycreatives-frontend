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

export const leaveMembership = async (group_id, user_id) => {
    try {
        const response = await api.post("/leave/membership", {
            group_id: group_id,
            receiver_id: user_id,
        });
        return response.data;
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

export const getGroupInvitation = async (group_id, user_id) => {
    try {
        const response = await api.get("/group-invitations?filter[group_id]=" + group_id + "&filter[receiver_id]=" + user_id);
        return response.data.data[0];
    } catch (error) { 
        return null;
    }
    return null;
};

export const getGroupRequests = async (group_id, status = 0) => {
    try {
        const response = await api.get("/group-invitations?filter[group_id]=" + group_id + "&filter[status]=" + status);
        return response.data.data;
    } catch (error) { 
        return null;
    }
    return null;
};

export const respondGroupRequest = async (uuid, data) => {
    try {
        const response = await api.patch("/group-invitations/" + uuid, data);
        return response.data.data;
    } catch (error) { 
        return null;
    }
    return null;
};