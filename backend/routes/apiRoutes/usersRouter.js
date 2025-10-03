import express from "express";
import userModel from "../../models/userModel.js";
import logger from "../../util/logger.js";
import excludeKeys from "../../util/excludeKeys.js";
import notificationsModel from "../../models/notificationsModel.js";
import imageUpload from "../../middleware/imageUpload.js";
import uploadImage from "../../util/uploadImage.js";

const usersRouter = express.Router();

usersRouter.get("/users/search/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const searchResults = await userModel.searchByUsername(username);
    const safeSearchResults = searchResults.map((result) =>
      excludeKeys(result, ["password_hash"])
    );

    return res.status(200).json({ searchResults: safeSearchResults });
  } catch (error) {
    logger.error("Server error during search for user: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/me", async (req, res) => {
  let userId = req.user.id;

  try {
    let userData = await userModel.getUserById(userId);
    userData = excludeKeys(userData, ["password_hash"]);
    userData.postsCount = await userModel.getUserPostsCount(userId);
    userData.followersCount = await userModel.getUserFollowersCount(userId);
    userData.followingCount = await userModel.getUserFollowingCount(userId);

    return res.status(200).json({ user: userData });
  } catch (error) {
    logger.error(
      `Server error during data fetching for user ${user.id}: ${error.message}`
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.put("/users/me", imageUpload.single("file"), async (req, res) => {
  const user = req.user;
  const file = req.file;
  let bio = req.body.bio;

  if (bio) {
    bio = bio.trim();
  }

  const updatedUser = {
    id: user.id,
    bio,
    profilePictureUrl: user.profile_picture_url,
  };

  try {
    if (file) {
      const imageKey = await uploadImage(file);
      const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${imageKey}`;
      updatedUser.profilePictureUrl = imageUrl;
    }

    await userModel.updateUser(updatedUser);

    res.status(201).json({
      message: "Successfuly updated profile",
      bio: updatedUser.bio,
      profilePictureUrl: updatedUser.profilePictureUrl,
    });
  } catch (error) {
    logger.error("Error during updating user: " + error.message);
    return res.status(500).json({ error: "Error uploading post" });
  }
});

usersRouter.get("/users/username/:username", async (req, res) => {
  let username = req.params.username;

  try {
    const userId = await userModel.getUserIdByUsername(username);
    let userData = await userModel.getUserById(userId);
    userData = excludeKeys(userData, ["password_hash"]);
    userData.postsCount = await userModel.getUserPostsCount(userId);
    userData.followersCount = await userModel.getUserFollowersCount(userId);
    userData.followingCount = await userModel.getUserFollowingCount(userId);

    return res.status(200).json({
      user: userData,
    });
  } catch (error) {
    logger.error(
      `Server error during data fetching for user ${userId}: ${error.message}`
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/id/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    let userData = await userModel.getUserById(userId);
    userData = excludeKeys(userData, ["password_hash"]);
    userData.postsCount = await userModel.getUserPostsCount(userId);
    userData.followersCount = await userModel.getUserFollowersCount(userId);
    userData.followingCount = await userModel.getUserFollowingCount(userId);

    return res.status(200).json({
      user: userData,
    });
  } catch (error) {
    logger.error(
      `Server error during data fetching for user ${userId}: ${error.message}`
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/id/minimal/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    let userData = await userModel.getUserById(userId);
    userData = excludeKeys(userData, ["password_hash"]);

    return res.status(200).json({
      user: userData,
    });
  } catch (error) {
    logger.error(
      `Server error during data fetching for user ${userId}: ${error.message}`
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/me/posts", async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const createdAt = req.query.createdAt ?? null;

  try {
    const posts = await userModel.getUserPosts(userId, createdAt);
    return res.status(200).json({ posts });
  } catch (error) {
    logger.error(
      `Server error during posts fetching for user ${userId}: ${error.message}`
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/:id/posts", async (req, res) => {
  const userId = req.params.id;
  const createdAt = req.query.createdAt ?? 0;

  try {
    const posts = await userModel.getUserPosts(userId, createdAt);
    return res.status(200).json({ posts });
  } catch (error) {
    logger.error(
      `Server error during posts fetching for user ${userId}: ${error.message}`
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.post("/users/me/posts", async (req, res) => {
  const userId = req.user.id;
  const { imageUrl, caption } = req.body;

  if (!imageUrl || !caption) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const postId = await userModel.addUserPost(userId, { imageUrl, caption });

    return res
      .status(201)
      .json({ id: postId, message: "Successfully added new post" });
  } catch (error) {
    logger.error("Error during adding post: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/:id/is-following", async (req, res) => {
  const followerUserId = req.user.id;
  const followedUserId = req.params.id;

  try {
    const isFollowing = await userModel.isFollowing(
      followerUserId,
      followedUserId
    );

    res.status(200).json({ isFollowing });
  } catch (error) {
    logger.error(
      "Error while checking if user is following another: " + error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

// gets notifications for a user and marks them as read
usersRouter.get("/users/me/notifications", async (req, res) => {
  const userId = req.user.id;

  try {
    await notificationsModel.readNotifications(userId);
    const notifications = await notificationsModel.getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    logger.error(
      "Error while fetching notifications for user " + userId + error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/me/has-notifications", async (req, res) => {
  const userId = req.user.id;

  try {
    const hasNotifications = await notificationsModel.hasNotifications(userId);
    res.status(200).json({ hasNotifications });
  } catch (error) {
    logger.error(
      "Error while fetching notifications for user " + userId + error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.put("/users/me/notifications/:id", async (req, res) => {
  const notificationId = req.params.id;

  try {
    await notificationsModel.readNotification(notificationId);
    res
      .status(201)
      .json({ message: "Successfully read notification " + notificationId });
  } catch (error) {
    logger.error("Error while reading notifications " + notificationId);
    res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/users/me/feed", async (req, res) => {
  const userId = req.user.id;
  const createdAt = req.query.createdAt;

  try {
    const posts = await userModel.getUserFeed(userId, createdAt);
    return res.status(200).json(posts);
  } catch (error) {
    logger.error("Error while fetching user feed " + error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default usersRouter;
