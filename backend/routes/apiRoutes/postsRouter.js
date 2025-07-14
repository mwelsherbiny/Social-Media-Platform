import express from "express";

const postsRouter = express.Router();

postsRouter.get("/posts/feed", async (req, res) => {
  res.json({ message: `Posts fetched successfully` });
});

export default postsRouter;
