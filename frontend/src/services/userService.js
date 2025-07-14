import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const userService = {
  searchByUsername: async (username) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/search/${username}`
    );
    return result.data.searchResults;
  }, 

  getCurrentUser: async () => {
    const result = await mainApi.get(`${API_ROUTES.API.USERS}/me`);
    return result.data.user;
  },

  getUserByUsername: async (username) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/username/${username}`
    );
    return result.data.user;
  },

  getUserById: async (id) => {
    const result = await mainApi.get(`${API_ROUTES.API.USERS}/id/${id}`);
    return result.data.user;
  },

  getCurrentUserPosts: async (startId) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/me/posts?startId=${startId}`
    );
    return result.data.posts;
  },

  getUserPostsById: async (id, startId) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/${id}/posts?startId=${startId}`
    );
    return result.data.posts;
  },
};

export default userService;
