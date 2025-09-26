import pool from "../db.js";

const notificationsModel = {
  addNotification: async (notification) => {
    await pool.query(
      `
        INSERT INTO notifications(user_id, actor_id, type, post_id)   
        VALUES($1, $2, $3, $4)    
      `,
      [
        notification.userId,
        notification.actorId,
        notification.type,
        notification.postId,
      ]
    );
  },

  getUserNotifications: async (userId) => {
    const result = await pool.query(
      `
        SELECT * FROM notifications 
        WHERE user_id = $1  
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
};

const notificationTypes = {
  POST_LIKE: "post_like",
  FOLLOW: "follow",
  POST_COMMENT: "post_comment",
};

export { notificationTypes };
export default notificationsModel;
