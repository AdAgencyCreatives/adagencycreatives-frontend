import { api } from "../api/api";

export const getSingleFriendship = async (sender_id, receiver_id) => {
    try {
        const response = await api.get("/friendships?filter[sender_id]=" + sender_id + "&filter[receiver_id]=" + receiver_id + "&sort=-created_at");
        return response.data.data[0];
    } catch (error) {
    }
    return null;
};

export const getFriendships = async (sender_id, receiver_id) => {
    try {
        const response = await api.get("/friendships?filter[sender_id]=" + sender_id + "&filter[receiver_id]=" + receiver_id + "&sort=-created_at");
        return response.data.data[0];
    } catch (error) {
    }
    return null;
};

export const getMyFriends = async () => {
    try {
        const response = await api.get("/my-friends");
        return response.data.data;
    } catch (error) {
    }
    return null;
};

export const getMyFriendShips = async (id, status) => {
    try {
        console.log(id);
        console.log(status);
        const response = await api.get("/friendships?filter[sender_id]="+id+"&filter[status]="+status);
        return response.data.data;
    } catch (error) {
    }
    return null;
};

export const requestFriendship = async (data) => {
    try {
        const response = await api.post("/friendships", data);
        return { "status": "success", "data": response.data };
    } catch (error) {
        return { "status": "error", "data": error };
    }
    return { "status": "error", "data": null };
};

export const cancelFriendship = async (data) => {
    try {
        const response = await api.patch("/friendships", data);
        return { "status": "success", "data": response.data };
    } catch (error) {
        return { "status": "error", "data": error };
    }
    return { "status": "error", "data": null };
};

export const getCreativeById = async (id) => {
      try {
        const response = await api.get("/creatives?filter[user_id]=" + id);
        return response.data.data[0];
    } catch (error) {
    }
    return null;
  };

