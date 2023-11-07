import { api } from "../api/api";

export const getNotifications = async (user_id) => {
    try {
        const response = await api.get("/notifications?sort=-created_at&filter[user_id]="+user_id);
        return response.data.data;
    } catch (error) {
    }
    return null;
};

export const saveNotification = async (data) => {
    try {
        const response = await api.post("/notifications", data);
        return response.data;
    } catch (error) {
    }
    return null;
};

export const updateNotification = async (id) => {
    try {
        const response = await api.patch("/notifications/"+id);
        return response.data;
    } catch (error) {
    }
    return null;
};

export const deleteNotification = async (id) => {
    try {
        const response = await api.delete("/notifications/"+id);
        return response.data;
    } catch (error) {
    }
    return null;
};
