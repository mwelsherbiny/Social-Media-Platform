import express from "express";
import followsModel from "../../models/followsModel.js";
import logger from "../../util/logger.js";
import notificationsModel, {
  notificationTypes,
} from "../../models/notificationsModel.js";
import { ERROR_CODES } from "../../db.js";
import { sendNotification, webSocketServer } from "../../webSocketServer.js";

const followsRouter = express.Router();

followsRouter.post("/follows/:id", async (req, res) => {
  const followerId = req.user.id;
  const followedId = req.params.id;

  try {
    await followsModel.followUser(followerId, followedId);
    logger.info(`User ${followerId} followed ${followedId}`);

    // Add follow to notifications
    const notification = {
      userId: followedId,
      actorId: followerId,
      type: notificationTypes.FOLLOW,
    };
    const addedNotification = await notificationsModel.addNotification(
      notification
    );

    // send notification to client if they are online
    sendNotification(followedId, addedNotification);

    return res.status(201).json({ message: "User followed" });
  } catch (error) {
    if (error.code === ERROR_CODES.UNIQUE_VIOLATION) {
      return res.status(201).json({ message: "User followed" });
    }
    logger.error("Error during follow operation: " + error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

followsRouter.delete("/follows/:id", async (req, res) => {
  const followerId = req.user.id;
  const followedId = req.params.id;

  try {
    await followsModel.unfollowUser(followerId, followedId);
    logger.info(`User ${followerId} unfollowed ${followedId}`);
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during follow operation: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default followsRouter;
