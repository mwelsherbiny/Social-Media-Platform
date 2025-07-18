import express from "express";
import userModel from "../../models/userModel.js";
import logger from "../../util/logger.js";
import excludeKeys from "../../util/excludeKeys.js";

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

usersRouter.get("/users/me", async (req, res) => {
  let user = req.user;

  try {
    user.postsCount = await userModel.getUserPostsCount(user.id);
    user.followersCount = await userModel.getUserFollowersCount(user.id);
    user.followingCount = await userModel.getUserFollowingCount(user.id);

    return res.status(200).json({ user });
  } catch (error) {
    logger.error(
      `Server error during data fetching for user ${user.id}: ${error.message}`
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

usersRouter.get("/users/me/posts", async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const startId = req.query.startId ?? 0;

  try {
    const posts = await userModel.getUserPosts(userId, startId);
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
  const startId = req.query.startId ?? 0;

  try {
    const posts = await userModel.getUserPosts(userId, startId);
    return res.status(200).json({ posts });
  } catch (error) {
    logger.error(
      `Server error during posts fetching for user ${userId}: ${error.message}`
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default usersRouter;
