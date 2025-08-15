import pool from "../db.js";

const userModel = {
  register: async (user) => {
    const result = await pool.query(
      "INSERT INTO users(username, name, email, password_hash) VALUES($1, $2, $3, $4) RETURNING *",
      [user.username, user.name, user.email, user.hashedPassword]
    );
    return result.rows[0];
  },

  login: async (user) => {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      user.email,
    ]);

    if (result.rowCount === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  },

  searchByUsername: async (username) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE username ILIKE $1 LIMIT 5",
      [`%${username}%`]
    );

    return result.rows;
  },

  getUserIdByUsername: async (username) => {
    const result = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    return result.rows[0].id;
  },

  getUserById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    return result.rows[0];
  },

  getUserPosts: async (id, startId) => {
    const result = await pool.query(
      `
      SELECT posts.*, 
      (
        SELECT COUNT(*) FROM comments
        WHERE posts.id = comments.post_id
        AND comments.parent_id IS NULL
      ) AS comments_count
      FROM posts 
      WHERE user_id = $1
      AND id > $2
      LIMIT 20;
      `,
      [id, startId]
    );

    return result.rows;
  },

  getUserPostsCount: async (id) => {
    const result = await pool.query(
      "SELECT COUNT(*) FROM posts WHERE user_id = $1",
      [id]
    );

    return parseInt(result.rows[0].count);
  },

  getUserFollowersCount: async (id) => {
    const result = await pool.query(
      "SELECT COUNT(*) from follows WHERE followed_id = $1",
      [id]
    );

    return parseInt(result.rows[0].count);
  },

  getUserFollowingCount: async (id) => {
    const result = await pool.query(
      "SELECT COUNT(*) from follows WHERE follower_id = $1",
      [id]
    );

    return parseInt(result.rows[0].count);
  },

  addUserPost: async (userId, post) => {
    const result = await pool.query(
      `
        INSERT INTO posts(user_id, image_url, caption) 
        VALUES($1, $2, $3)
        RETURNING id;
      `,
      [userId, post.imageUrl, post.caption]
    );

    return result.rows[0].id;
  },

  isFollowing: async (followerUserId, followedUserId) => {
    const result = await pool.query(
      `
        SELECT 1 FROM follows 
        WHERE follower_id = $1
        AND followed_id = $2
      `,
      [followerUserId, followedUserId]
    );

    return result.rows.length > 0;
  },
};

export default userModel;
