import express from "express";
import postsModel from "../../models/postsModel.js";
import logger from "../../util/logger.js";
import imageUpload from "../../middleware/imageUpload.js";
import uploadImage from "../../util/uploadImage.js";
import notificationsModel, {
  notificationTypes,
} from "../../models/notificationsModel.js";

const postsRouter = express.Router();

postsRouter.post("/posts", imageUpload.single("file"), async (req, res) => {
  const caption = req.body.caption;
  const userId = req.user.id;
  const file = req.file;

  try {
    const imageKey = await uploadImage(file);

    const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${imageKey}`;
    await postsModel.addPost({ caption, userId, imageUrl });

    res.status(201).json({});
  } catch (error) {
    logger.error("Error during uploading of post: " + error.message);
    return res.status(500).json({ error: "Error uploading post" });
  }
});

postsRouter.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await postsModel.getPost(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.status(200).json(post);
  } catch (error) {
    logger.error("Error during fetching of post: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

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

    const postOwnerId = await postsModel.getPostOwnerId(postId);
    // Add comment to notifications table if the comment is to a different user
    if (postOwnerId != userId) {
      const notification = {
        userId: postOwnerId,
        actorId: userId,
        postId: postId,
        type: notificationTypes.POST_COMMENT,
      };
      await notificationsModel.addNotification(notification);
    }

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

    const postOwnerId = await postsModel.getPostOwnerId(postId);
    // Add like to notifications table if the like is to a different user
    if (postOwnerId != userId) {
      const notification = {
        userId: postOwnerId,
        actorId: userId,
        postId: postId,
        type: notificationTypes.POST_LIKE,
      };
      await notificationsModel.addNotification(notification);
    }

    return res.status(201).json({ message: "Successfully added like to post" });
  } catch (error) {
    logger.error("Error during adding post like: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

postsRouter.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    await postsModel.deletePost(postId);
    return res.sendStatus(204);
  } catch (error) {
    logger.error("Error during deleting post: " + error.message);
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
