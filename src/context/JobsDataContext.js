import { api } from "../api/api";

export const getJobById = async (id) => {
    try {
        const response = await api.get("/jobs/" + id);
        return response.data.data;
    } catch (error) {
        return null;
    }
    return null;
};
