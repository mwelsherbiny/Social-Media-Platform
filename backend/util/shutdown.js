import pool from "../db.js";
import logger from "./logger.js";

const shutdown = async (server) => {
  logger.info("Shutting down...");
  await pool.end();
  server.close();
  process.exit(0);
};

export default shutdown;
