import { authApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const authService = {
  login: async ({ email, password }) => {
    const res = await authApi.post(API_ROUTES.AUTH.LOGIN, { email, password });
    return res.data;
  },

  register: async ({ email, password, username, name }) => {
    const res = await authApi.post(API_ROUTES.AUTH.SIGNUP, {
      email,
      password,
      username,
      name,
    });
    return res.data;
  },
};

export default authService;
