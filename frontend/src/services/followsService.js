import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const followsService = {
  followUser: async (userId) => {
    await mainApi.post(`${API_ROUTES.API.FOLLOW}/${userId}`);
  },

  unfollowUser: async (userId) => {
    await mainApi.delete(`${API_ROUTES.API.UNFOLLOW}/${userId}`);
  },
};

export default followsService;
