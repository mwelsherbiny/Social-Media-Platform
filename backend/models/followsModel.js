import pool from "../db.js";

const followsModel = {
  followUser: async (followerId, followedId) => {
    await pool.query(
      `INSERT INTO follows(follower_id, followed_id) 
      VALUES($1, $2)`,
      [followerId, followedId]
    );
  },

  unfollowUser: async (followerId, followedId) => {
    await pool.query(
      `DELETE FROM follows 
      WHERE follower_id = $1 
      AND followed_id = $2`,
      [followerId, followedId]
    );
  },
};

export default followsModel;
