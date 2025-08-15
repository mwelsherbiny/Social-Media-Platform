import express from "express";
import postsModel from "../../models/postsModel.js";
import logger from "../../util/logger.js";

const postsRouter = express.Router();

postsRouter.get("/posts/:id/comments", async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const offset = Number(req.query.offset) ?? 0;

  try {
    const comments = await postsModel.getPostComments(postId, userId, offset);

    return res.status(200).json({ comments });
  } catch (error) {
    logger.error("Error during fetching of post comments: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { parentId, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const commentId = await postsModel.addPostComment({
      postId,
      userId,
      parentId,
      content,
    });

    res.status(201).json({
      id: commentId,
      message: "Successfully added comment",
    });
  } catch (error) {
    logger.error("Error during adding post comment: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.get("/posts/:id/likes_details", async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const likesDetails = await postsModel.getPostLikesDetails(postId, userId);
    likesDetails.likes_count = parseInt(likesDetails.likes_count);
    return res.status(200).json(likesDetails);
  } catch (error) {
    logger.error("Error during adding post like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.post("/posts/:id/likes", async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    await postsModel.addPostLike({ postId, userId });
    return res.status(201).json({ message: "Successfully added like to post" });
  } catch (error) {
    logger.error("Error during adding post like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.delete("/posts/:id/likes", async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    await postsModel.deletePostLike({ postId, userId });
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting post like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default postsRouter;
