import express from "express";
import auth from "../middleware/auth.js";
import postsRouter from "./apiRoutes/postsRouter.js";
import usersRouter from "./apiRoutes/usersRouter.js";
import followsRouter from "./apiRoutes/followsRouter.js";
import commentsRouter from "./apiRoutes/commentsRouter.js";

const apiRouter = express.Router();

apiRouter.use(auth);
apiRouter.use(postsRouter);
apiRouter.use(usersRouter);
apiRouter.use(followsRouter);
apiRouter.use(commentsRouter);

export default apiRouter;
