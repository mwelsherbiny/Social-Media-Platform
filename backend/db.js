import { Pool } from "pg";
import logger from "./util/logger.js";
import { CronJob } from "cron";

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const ERROR_CODES = {
  UNIQUE_VIOLATION: "23505",
};

CronJob.from({
  cronTime: "0 0 6 * * *",
  onTick: async function () {
    let deletedRows = 0;

    try {
      do {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });

        let res = await pool.query(`
          DELETE FROM notifications
          WHERE id IN (
            SELECT id FROM notifications
            WHERE created_at < NOW() - INTERVAL '7 days'
            LIMIT 500
          )
          RETURNING id
        `);

        deletedRows = res.rowCount;
        logger.info(`Deleted ${deletedRows} notifications`);
      } while (deletedRows > 0);
    } catch (error) {
      logger.error("Error while deleting old notifications: " + error.message);
    }
  },
  start: true,
  timeZone: "America/Los_Angeles",
});

export { ERROR_CODES };
export default pool;
