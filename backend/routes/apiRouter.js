import express from "express";
import authMiddware from "../middleware/authMiddlware.js";
import postsRouter from "./apiRoutes/postsRouter.js";
import usersRouter from "./apiRoutes/usersRouter.js";
import followsRouter from "./apiRoutes/followsRouter.js";

const apiRouter = express.Router();

apiRouter.use(authMiddware);
apiRouter.use(postsRouter);
apiRouter.use(usersRouter);
apiRouter.use(followsRouter);

export default apiRouter;
