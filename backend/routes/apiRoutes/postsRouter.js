import express from "express";
import postsModel from "../../models/postsModel.js";
import logger from "../../util/logger.js";

const postsRouter = express.Router();

postsRouter.get("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const startId = req.query.startId ?? 0;

  try {
    const comments = await postsModel.getPostComments(postId, startId);

    return res.status(200).json({ comments });
  } catch (error) {
    logger.error("Error during fetching of post comments: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.post("/posts/comments", async (req, res) => {
  const { postId, userId, parentId, content } = req.body;

  if (!postId || !userId || !content) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const commentId = await postsModel.addPostComment({
      postId,
      userId,
      parentId,
      content,
    });

    res
      .status(201)
      .json({ id: commentId, message: "Successfully added comment" });
  } catch (error) {
    logger.error("Error during adding post comment: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.delete("/posts/comments", async (req, res) => {
  const { commentId } = req.body;

  if (!commentId) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    await postsModel.delete(commentId);
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting post comment: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.post("/posts/likes", async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    await postsModel.addPostLike({ postId, userId });
    return res.status(201).json({ message: "Successfully added like to post" });
  } catch (error) {
    logger.error("Error during adding post like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.delete("/posts/likes", async (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    await postsModel.deletePostLike({ postId, userId });
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting post like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.post("/posts/comments/likes", async (req, res) => {
  const { commentId, userId } = req.body;

  if (!commentId || !userId) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    await postsModel.addCommentLike({ commentId, userId });
    return res
      .status(201)
      .json({ message: "Successfully added like to comment" });
  } catch (error) {
    logger.error("Error during adding comment like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.delete("/posts/comments/likes", async (req, res) => {
  const { commentId, userId } = req.body;

  if (!commentId || !userId) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    await postsModel.deleteCommentLike({ commentId, userId });
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default postsRouter;
