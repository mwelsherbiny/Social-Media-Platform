import pool from "../db.js";

const postsModel = {
  getPostComments: async (postId, startId) => {
    const commentsCount = startId === 0 ? 10 : 5;

    const result = await pool.query(
      `
        SELECT comments.*, 
        EXISTS (
            SELECT 1 FROM comment_replies
            WHERE comments.id = comment_replies.comment_id
        ) AS has_replies,
        (
            SELECT COUNT(*) FROM comment_likes
            WHERE comments.id = comment_likes.comment_id
        ) AS likes_count
        FROM comments
            WHERE post_id = $1 
            AND id > $2
            LIMIT $3;
        `,
      [postId, startId, commentsCount]
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

  deletePostComment: async (commentId) => {
    await pool.query(
      `
            DELETE FROM comments
            WHERE id=$1
        `,
      [commentId]
    );
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
};

export default postsModel;
