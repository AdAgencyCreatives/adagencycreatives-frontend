import { api } from "../api/api";

export const getNotifications = async () => {
    try {
        const response = await api.get("/notifications?sort=-created_at");
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

export const updateNotification = async (id, data) => {
    try {
        const response = await api.patch("/notifications/"+id, data);
        return response.data;
    } catch (error) {
    }
    return null;
};

export const deleteNotification = async (id) => {
    try {
        const response = await api.del("/notifications/"+id);
        return response.data;
    } catch (error) {
    }
    return null;
};
