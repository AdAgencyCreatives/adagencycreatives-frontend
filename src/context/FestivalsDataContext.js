import { api } from "../api/api";

export const getFestivals = async (user_id) => {
    try {
        const response = await api.get("/festivals?sort=-created_at&filter[user_id]=" + user_id);
        return response.data.data;
    } catch (error) {
    }
    return null;
};

export const saveFestival = async (data) => {
    try {
        const response = await api.post("/festivals", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
    return null;
};

export const updateFestival = async (id) => {
    try {
        const response = await api.patch("/festivals/" + id);
        return response.data;
    } catch (error) {
    }
    return null;
};

export const deleteFestival = async (id) => {
    try {
        const response = await api.delete("/festivals/" + id);
        return response.data;
    } catch (error) {
    }
    return null;
};
