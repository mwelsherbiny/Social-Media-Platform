import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const commentService = {
  deleteComment: async (commentId) => {
    await mainApi.delete(`${API_ROUTES.API.COMMENTS}/${commentId}`);
  },

  addCommentLike: async (commentId) => {
    await mainApi.post(`${API_ROUTES.API.COMMENTS}/${commentId}/likes`, {});
  },

  deleteCommentLike: async (commentId) => {
    await mainApi.delete(`${API_ROUTES.API.COMMENTS}/${commentId}/likes`);
  },
};

export default commentService;
