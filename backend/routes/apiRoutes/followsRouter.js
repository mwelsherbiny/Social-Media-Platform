import express from "express";
import followsModel from "../../models/followsModel.js";
import logger from "../../util/logger.js";

const followsRouter = express.Router();

followsRouter.post("/follow/:id", async (req, res) => {
  const followerId = req.user.id;
  const followedId = req.params.id;

  try {
    await followsModel.followUser(followerId, followedId);
    logger.info(`User ${followerId} followed ${followedId}`);
    return res.status(201).json({ message: "User followed" });
  } catch (error) {
    logger.error("Error during follow operation: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

followsRouter.delete("/unfollow/:id", async (req, res) => {
  const followerId = req.user.id;
  const followedId = req.params.id;

  try {
    await followsModel.unfollowUser(followerId, followedId);
    logger.info(`User ${followerId} unfollowed ${followedId}`);
    return res.status(204).send();
  } catch (error) {
    logger.error("Error during follow operation: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default followsRouter;
