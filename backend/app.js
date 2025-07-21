import "./config.js";
import express from "express";
import logger from "./util/logger.js";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import checkPostBody from "./middleware/checkPostBody.js";
import authRouter from "./routes/authRouter.js";
import apiRouter from "./routes/apiRouter.js";
import shutdown from "./util/shutdown.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);
app.use(express.json());
app.use(requestLogger);
app.use(checkPostBody);
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use((req, res) => {
  logger.error("Invalid endpoint");
  return res.status(404).json({ error: "Resource not found" });
});

const server = app.listen(3000, () => {
  logger.info("Server is running on port 3000");
});

process.on("SIGINT", () => shutdown(server));
process.on("SIGTERM", () => shutdown(server));
