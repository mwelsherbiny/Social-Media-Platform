import express from "express";

const commentsRouter = express.Router();

commentsRouter.delete("/comments/:id", async (req, res) => {
  const commentId = req.params.id;

  if (!commentId) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    await postsModel.deletePostComment(commentId);
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting post comment: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

commentsRouter.post("/comments/:id/likes", async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

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

commentsRouter.delete("/comments/:id/likes", async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  try {
    await postsModel.deleteCommentLike({ commentId, userId });
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default commentsRouter;
