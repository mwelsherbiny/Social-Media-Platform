import { mainApi } from "./axios";
import API_ROUTES from "../constants/apiRoutes";

const postService = {
  getPost: async (postId) => {
    if (!postId) {
      return;
    }

    const result = await mainApi.get(`${API_ROUTES.API.POSTS}/${postId}`);

    return result.data;
  },

  addPost: async (post) => {
    if (!post) {
      return;
    }

    const result = await mainApi.post(`${API_ROUTES.API.POSTS}`, post);

    return result.data;
  },

  getPostComments: async (postId, offset) => {
    if (!postId) {
      return;
    }

    const result = await mainApi.get(
      `${API_ROUTES.API.POSTS}/${postId}/comments?offset=${offset}`
    );

    return result.data.comments;
  },

  addPostComment: async ({ postId, content, parentId = null }) => {
    if (!postId) {
      return;
    }

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
    if (!postId) {
      return;
    }

    const results = await mainApi.get(
      `${API_ROUTES.API.POSTS}/${postId}/likes_details`
    );

    return results.data;
  },

  addPostLike: async (postId) => {
    if (!postId) {
      return;
    }

    await mainApi.post(`${API_ROUTES.API.POSTS}/${postId}/likes`, {});
  },

  deletePost: async (postId) => {
    if (!postId) {
      return;
    }

    await mainApi.delete(`${API_ROUTES.API.POSTS}/${postId}`);
  },

  deletePostLike: async (postId) => {
    if (!postId) {
      return;
    }

    await mainApi.delete(`${API_ROUTES.API.POSTS}/${postId}/likes`);
  },
};

export default postService;
