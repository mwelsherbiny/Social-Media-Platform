import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const followService = {
  followUser: async (userId) => {
    await mainApi.post(`${API_ROUTES.API.FOLLOWS}/${userId}`, {});
  },

  unfollowUser: async (userId) => {
    await mainApi.delete(`${API_ROUTES.API.FOLLOWS}/${userId}`);
  },
};

export default followService;
