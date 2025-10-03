import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const userService = {
  searchByUsername: async (username) => {
    if (!username) {
      return;
    }

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
    if (!username) {
      return;
    }

    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/username/${username}`
    );
    return result.data.user;
  },

  getUserById: async (id) => {
    if (!id) {
      return;
    }

    const result = await mainApi.get(`${API_ROUTES.API.USERS}/id/${id}`);
    return result.data.user;
  },

  getCurrentUserPosts: async (createdAt) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/me/posts${
        createdAt ? `?createdAt=${createdAt}` : ""
      }`
    );
    return result.data.posts;
  },

  getUserPostsById: async (id, createdAt) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/${id}/posts${
        createdAt ? `?createdAt=${createdAt}` : ""
      }`
    );
    return result.data.posts;
  },

  addUserPost: async ({ imageUrl, caption }) => {
    const result = await mainApi.post(`${API_ROUTES.API.USERS}/posts`, {
      imageUrl,
      caption,
    });

    return result.data.id;
  },

  isFollowing: async (followedUserID) => {
    if (!followedUserID) {
      return;
    }

    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/${followedUserID}/is-following`
    );

    return result.data.isFollowing;
  },

  getNotifications: async () => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/me/notifications`
    );

    return result.data;
  },

  hasNotifications: async () => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/me/has-notifications`
    );

    return result.data.hasNotifications;
  },

  readNotification: async (notification) => {
    if (!notification) {
      return;
    }

    await mainApi.put(
      `${API_ROUTES.API.USERS}/me/notifications/${notification.id}`,
      { ...notification, is_read: true }
    );
  },

  updateUser: async (newUser) => {
    const result = await mainApi.put(`${API_ROUTES.API.USERS}/me`, newUser);
    return result.data;
  },

  getUserFeed: async (createdAt) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.USERS}/me/feed${
        createdAt ? `?createdAt=${createdAt}` : ""
      }`
    );
    return result.data;
  },
};

export default userService;
