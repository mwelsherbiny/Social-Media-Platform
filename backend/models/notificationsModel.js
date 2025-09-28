import pool from "../db.js";

const notificationsModel = {
  addNotification: async (notification) => {
    const result = await pool.query(
      `
        WITH inserted AS (
          INSERT INTO notifications(user_id, actor_id, type, post_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        )
        SELECT 
          inserted.*,
          u.username AS actor_username,
          u.profile_picture_url AS actor_profile_picture_url
        FROM inserted
        JOIN users u ON u.id = inserted.actor_id;
      `,
      [
        notification.userId,
        notification.actorId,
        notification.type,
        notification.postId,
      ]
    );

    return result.rows[0];
  },

  getUserNotifications: async (userId) => {
    const result = await pool.query(
      `
        SELECT 
          notifications.*,
          users.username AS actor_username,
          users.profile_picture_url AS actor_profile_picture_url
        FROM notifications 
        JOIN users ON users.id = notifications.actor_id
        WHERE notifications.user_id = $1
        ORDER BY created_at DESC
        LIMIT 20
      `,
      [userId]
    );

    return result.rows;
  },

  hasNotifications: async (userId) => {
    const result = await pool.query(
      `
        SELECT EXISTS(
          SELECT id FROM notifications
          WHERE user_id = $1
          AND is_read IS FALSE
        ) AS has_notification
      `,
      [userId]
    );

    return result.rows[0].has_notification;
  },

  readNotification: async (notificationId) => {
    await pool.query(
      `
        UPDATE notifications
        SET is_read = TRUE
        WHERE id = $1
      `,
      [notificationId]
    );
  },

  readNotifications: async (userId) => {
    const result = await pool.query(
      `
        UPDATE notifications
        SET is_read = TRUE
        WHERE user_id = $1
      `,
      [userId]
    );

    return result.rowCount;
  },
};

const notificationTypes = {
  POST_LIKE: "post_like",
  FOLLOW: "follow",
  POST_COMMENT: "post_comment",
};

export { notificationTypes };
export default notificationsModel;
