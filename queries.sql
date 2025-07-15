-- Reset Database
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


-- Feed Query
-- This query fetches the posts of the users that the logged in user follows,
-- ordered from most to least recent, with pagnition support using OFFSET
SELECT * FROM posts WHERE user_id IN (
    SELECT followed_id FROM follows
    WHERE follower_id = @logged_in_user_id
)
ORDER BY created_at DESC
LIMIT 10 OFFSET @current_offset;

-- Seach Query
-- This query fetches users id based on the username
SELECT id FROM users
WHERE username LIKE @search_username

-- Explore Query
-- This query fetched the details of most popular posts in the past month based on their popularity
-- The popularity is determined by like count
-- pagnition support using OFFSET
SELECT * FROM posts
WHERE created_at >= NOW() - INTERVAL '1 month'
ORDER BY likes_count DESC
LIMIT 10 OFFSET @current_offset;

-- Chats Query
-- This query fetches chats for current user
SELECT * FROM chats
WHERE user1_id = @user_id OR user2_id = @user_id;

-- Messages Query
-- This query fetches messages of a specific chat between 2 users
SELECT * FROM messages
WHERE chat_id = @chat_id
ORDER BY created_at ASC;

-- Create Post Query
-- This query stores a new post in the database
INSERT INTO posts(user_id, image_url, caption) VALUES(@user_id, @image_url, @caption);

-- Delete Post Query
DELETE FROM posts
WHERE id = @post_id;

-- Like Post Query
BEGIN;

INSERT INTO likes(post_id, user_id) VALUES(@post_id, @user_id);
UPDATE posts
SET likes_count = likes_count + 1
WHERE id = @post_id;

COMMIT;

-- Unlike Post Query
BEGIN;

WITH deleted AS (
    DELETE FROM likes
    WHERE post_id = @post_id
    AND user_id = @user_id
    RETURNING *
)
UPDATE posts
SET likes_count = likes_count - 1
WHERE id = @post_id AND EXISTS (SELECT 1 FROM deleted);

COMMIT;

-- Comment On Post Query
BEGIN;

INSERT INTO comments(post_id, user_id, content) VALUES(@post_id, @user_id, @content);
UPDATE posts
SET comments_count = comments_count + 1
WHERE id = @post_id;

COMMIT;

-- Delete Comment Query
BEGIN;

WITH deleted AS (
    DELETE FROM comments
    WHERE post_id = @post_id
    AND user_id = @user_id
    RETURNING *
)
UPDATE posts
SET comments_count = comments_count - 1
WHERE id = @post_id AND EXISTS (SELECT 1 FROM deleted);

COMMIT;

-- User Details Query
-- This data will be used for profiles
SELECT * FROM users
WHERE id = @user_id;

-- User Posts Query
-- This data will be used for profiles
SELECT * FROM posts
WHERE user_id = @user_id
ORDER BY created_at DESC
LIMIT 20 OFFSET @current_offset

-- User posts count
SELECT COUNT(*) FROM posts 
WHERE user_id = @user_id 

-- User followers count
SELECT COUNT(*) from follows 
WHERE followed_id = @user_id 

-- User following count
SELECT COUNT(*) from follows 
WHERE follower_id = @user_id 

-- Follow user
INSERT INTO follows(follower_id, followed_id)
VALUES(@user1_id, @user2_id);

-- Unfollow user
DELETE FROM follows 
WHERE follower_id = @user1_id 
AND followed_id = @user2_id 

