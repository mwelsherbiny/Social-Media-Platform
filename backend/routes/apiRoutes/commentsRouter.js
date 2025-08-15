import express from "express";
import commentsModel from "../../models/commentsModel.js";
import logger from "../../util/logger.js";

const commentsRouter = express.Router();

commentsRouter.get("/comments/:id/replies", async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  try {
    const replies = await commentsModel.getCommentReplies(commentId, userId);
    return res.status(200).json({ replies });
  } catch (error) {
    logger.error("Error during getting comment: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentsRouter.delete("/comments/:id", async (req, res) => {
  const commentId = req.params.id;

  try {
    await commentsModel.deleteComment(commentId);
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting comment: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentsRouter.post("/comments/:id/likes", async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  try {
    await commentsModel.addCommentLike({ commentId, userId });
    return res
      .status(201)
      .json({ message: "Successfully added like to comment" });
  } catch (error) {
    logger.error("Error during adding comment like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentsRouter.delete("/comments/:id/likes", async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  try {
    await commentsModel.deleteCommentLike({ commentId, userId });
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default commentsRouter;
