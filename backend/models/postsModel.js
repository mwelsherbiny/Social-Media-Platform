import pool from "../db.js";

const postsModel = {
  getPostComments: async (postId, userId, offset) => {
    const commentsCount = offset === 0 ? 10 : 5;

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
          COUNT(DISTINCT comment_likes.id) AS likes_count,
          COUNT(DISTINCT replies.id) AS replies_count
      FROM
          comments
      JOIN
          users ON comments.user_id = users.id
      LEFT JOIN
          comment_likes ON comments.id = comment_likes.comment_id
      LEFT JOIN
          comments AS replies ON comments.id = replies.parent_id
      WHERE
          comments.post_id = $2
          AND comments.parent_id IS NULL
      GROUP BY
          comments.id,
          users.username,
          users.profile_picture_url
      ORDER BY
          likes_count DESC,
          comments.created_at DESC
      LIMIT $3 OFFSET $4;
        `,
      [userId, postId, commentsCount, offset]
    );

    return result.rows;
  },

  addPostComment: async (commentData) => {
    const result = await pool.query(
      `
        INSERT INTO comments(post_id, user_id, parent_id, content)
        VALUES($1, $2, $3, $4)
        RETURNING id;
      `,
      [
        commentData.postId,
        commentData.userId,
        commentData.parentId,
        commentData.content,
      ]
    );

    return result.rows[0].id;
  },

  addPostLike: async (likeData) => [
    await pool.query(
      `
            INSERT INTO post_likes(post_id, user_id)
            VALUES($1, $2)
        `,
      [likeData.postId, likeData.userId]
    ),
  ],

  deletePostLike: async (likeData) => {
    await pool.query(
      `
            DELETE FROM post_likes
            WHERE post_id = $1
            AND user_id = $2
        `,
      [likeData.postId, likeData.userId]
    );
  },

  getPostLikesDetails: async (postId, userId) => {
    const result = await pool.query(
      `
        SELECT (
          SELECT COUNT(*) FROM post_likes
          WHERE post_id = $1
        ) AS likes_count, 
        (
          SELECT EXISTS 
          (
            SELECT 1 FROM post_likes 
            WHERE user_id = $2
            AND post_id = $1
          ) 
        ) AS liked_by_logged_user
      `,
      [postId, userId]
    );

    return result.rows[0];
  },
};

export default postsModel;
