import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const followService = {
  followUser: async (userId) => {
    if (!userId) {
      return;
    }

    await mainApi.post(`${API_ROUTES.API.FOLLOWS}/${userId}`, {});
  },

  unfollowUser: async (userId) => {
    if (!userId) {
      return;
    }

    await mainApi.delete(`${API_ROUTES.API.FOLLOWS}/${userId}`);
  },
};

export default followService;
