import pool from "./../db.js";

const commentsModel = {
  getCommentReplies: async (parentId, userId) => {
    const result = await pool.query(
      `
        SELECT
            comments.*,
            users.username,
            users.profile_picture_url,
            EXISTS 
              (
                SELECT 1 FROM comment_likes 
                WHERE user_id = $1
                AND comment_id = comments.id 
              )
            AS liked_by_user,
            COUNT(DISTINCT comment_likes.id) AS likes_count
        FROM
            comments
        JOIN
            users ON comments.user_id = users.id
        LEFT JOIN
            comment_likes ON comments.id = comment_likes.comment_id
        WHERE 
            comments.parent_id = $2
        GROUP BY
            comments.id,
            users.username,
            users.profile_picture_url
        ORDER BY
            likes_count DESC,
            comments.created_at DESC
        `,
      [userId, parentId]
    );

    return result.rows;
  },

  addCommentLike: async (likeData) => [
    await pool.query(
      `
            INSERT INTO comment_likes(comment_id, user_id)
            VALUES($1, $2)
        `,
      [likeData.commentId, likeData.userId]
    ),
  ],

  deleteCommentLike: async (likeData) => {
    await pool.query(
      `
            DELETE FROM comment_likes
            WHERE comment_id = $1
            AND user_id = $2
        `,
      [likeData.commentId, likeData.userId]
    );
  },

  deleteComment: async (commentId) => {
    await pool.query(
      `
            DELETE FROM comments
            WHERE id=$1
        `,
      [commentId]
    );
  },
};

export default commentsModel;
