import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const postService = {
  getPost: async (postId) => {
    const result = await mainApi.get(`${API_ROUTES.API.POSTS}/${postId}`);

    return result.data;
  },

  addPost: async (post) => {
    const result = await mainApi.post(`${API_ROUTES.API.POSTS}`, post);

    return result.data;
  },

  getPostComments: async (postId, offset) => {
    const result = await mainApi.get(
      `${API_ROUTES.API.POSTS}/${postId}/comments?offset=${offset}`
    );

    return result.data.comments;
  },

  addPostComment: async ({ postId, content, parentId = null }) => {
    const result = await mainApi.post(
      `${API_ROUTES.API.POSTS}/${postId}/comments`,
      {
        content,
        parentId,
      }
    );

    return result.data.id;
  },

  getPostLikeDetails: async (postId) => {
    const results = await mainApi.get(
      `${API_ROUTES.API.POSTS}/${postId}/likes_details`
    );

    return results.data;
  },

  addPostLike: async (postId) => {
    await mainApi.post(`${API_ROUTES.API.POSTS}/${postId}/likes`, {});
  },

  deletePost: async (postId) => {
    await mainApi.delete(`${API_ROUTES.API.POSTS}/${postId}`);
  },

  deletePostLike: async (postId) => {
    await mainApi.delete(`${API_ROUTES.API.POSTS}/${postId}/likes`);
  },
};

export default postService;
