# Overview

This document outlines the design and features of a social media application similar to Instagram. The application allows users to share photos, follow other users, like and comment on posts, and send messages.

# Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3 (for images)
- **Messaging**: Socket.io (for real-time chat)

# Features

## Home

- Displays stories, posts from users you follow, ordered from most to least recent
- Initially fetches 10 posts with pagination support

## Search

- Search for user by username
- Displays top 5 results
- Clicking on a user navigates to their profile page

## Explore

- Displays a grid of the most liked posts in the last week
- Clicking on a post opens up a more detailed view of the post

## Messages

- Shows list of chats from most to least recent
- Clicking on a chat navigates to the chat page (visible on the right side of the same page)

## Post Creation

- Requests an image and a caption

## Post

- When viewing a post:
  - Displays the post image
  - Displays the caption
  - Displays the number of likes and comments
  - Allows liking and commenting on the post
  - Allows sharing the post to other users
  - If the user is viewing their own post:
    - Allows deleting the post
    - Allows editing the post caption

## Stories

- Displays stories from users you follow at top of the home page
- Allows viewing stories by clicking on them
- Allows posting a new story with an image and optional text
- Allows deleting a story if it is your own

## Profile

- Displays user information:
  - Username
  - Bio
  - Number of posts
  - Number of followers
  - Number of following
- Follow/Unfollow button
- Message button
- Displays posts made by the user
- If the user is viewing their own profile:
  - Allows uploading a new profile picture
  - Allows changing the bio
  - Allows changing the username
  - Allows changing the password

# Database

## users

- `id`: Unique identifier for the user
- `username`: Unique username for the user
- `email`: Unique email address for the user
- `created_at`: Timestamp of when the user was created
- `name`: Full name of the user
- `password`: Hashed password for the user
- `bio`: Short biography of the user
- `profile_picture`: URL to the user's profile picture
  PRIMARY KEY (id)

## follows

- `follower_id`: Foreign key referencing the user who follows
- `followed_id`: Foreign key referencing the user being followed
- `followed_at`: Timestamp of when the follow relationship was created
  PRIMARY KEY (follower_id, followed_id)
  FOREIGN KEY (follower_id) REFERENCES users(id)
  FOREIGN KEY (followed_id) REFERENCES users(id)

## posts

- `id`: Unique identifier for the post
- `user_id`: Foreign key referencing the user who created the post
- `image_url`: URL to the post image
- `caption`: Caption for the post
- `created_at`: Timestamp of when the post was created
- `likes_count`: Number of likes on the post
- `comments_count`: Number of comments on the post
  PRIMARY KEY (id)
  FOREIGN KEY (user_id) REFERENCES users(id)

## comments

- `id`: Unique identifier for the comment
- `post_id`: Foreign key referencing the post the comment belongs to
- `user_id`: Foreign key referencing the user who made the comment
- `content`: Content of the comment
- `created_at`: Timestamp of when the comment was created
  PRIMARY KEY (id)
  FOREIGN KEY (post_id) REFERENCES posts(id)
  FOREIGN KEY (user_id) REFERENCES users(id)

## likes

- `post_id`: Foreign key referencing the post that was liked
- `user_id`: Foreign key referencing the user who liked the post
- `created_at`: Timestamp of when the like was made
  PRIMARY KEY (post_id, user_id)
  FOREIGN KEY (post_id) REFERENCES posts(id)
  FOREIGN KEY (user_id) REFERENCES users(id)

## hashtags

- `id`: Unique identifier for the hashtag
- `name`: Name of the hashtag
- `created_at`: Timestamp of when the hashtag was created
  PRIMARY KEY (id)

## post_hashtags

- `post_id`: Foreign key referencing the post that has the hashtag
- `hashtag_id`: Foreign key referencing the hashtag
- `created_at`: Timestamp of when the hashtag was added to the post
  PRIMARY KEY (post_id, hashtag_id)
  FOREIGN KEY (post_id) REFERENCES posts(id)
  FOREIGN KEY (hashtag_id) REFERENCES hashtags(id)

## stories

- `id`: Unique identifier for the story
- `user_id`: Foreign key referencing the user who created the story
- `image_url`: URL to the story image
- `name`: Optional text for the story
- `created_at`: Timestamp of when the story was created
  PRIMARY KEY (id)
  FOREIGN KEY (user_id) REFERENCES users(id)

## chats

- `id`: Unique identifier for the chat
- `user1_id`: Foreign key referencing the first user in the chat
- `user2_id`: Foreign key referencing the second user in the chat
- `created_at`: Timestamp of when the chat was created
  PRIMARY KEY (id)
  FOREIGN KEY (user1_id) REFERENCES users(id)
  FOREIGN KEY (user2_id) REFERENCES users(id)

## messages

- `id`: Unique identifier for the message
- `chat_id`: Foreign key referencing the chat the message belongs to
- `sender_id`: Foreign key referencing the user who sent the message
- `content`: Content of the message
- `content_type`: Type of content (text, image)
- `created_at`: Timestamp of when the message was sent
  PRIMARY KEY (id)
  FOREIGN KEY (chat_id) REFERENCES chats(id)
  FOREIGN KEY (sender_id) REFERENCES users(id)

# App Components

## Home / Feed

- **Purpose**: Displays a feed of posts and stories from followed users.
- **Data Source**:
  - `GET /api/posts/following` (paginated)
  - `GET /api/stories/following`
- **Behavior**:
  - Fetches 10 posts at a time (infinite scroll)
  - Stories displayed in a horizontal scrollable top bar
  - Posts display image, caption, likes, and comments preview
- **Notes**:
  - Requires auth token

## Explore

- **Purpose**: Displays a grid of most popular posts from the last week.
- **Data Source**:
  - `GET /api/posts/popular` (paginated)
- **Behavior**:
  - Fetches top posts based on likes
  - Only displays the images of the posts
  - Images can be clicked to view the post details
- **Notes**:

  - Requires auth token

## Search

- **Purpose**: Allows users to search for other users by username.
- **Data Source**:
  - `GET /api/users/search?username={username}`
- **Behavior**:
  - Displays top 5 users matching the search query
  - Clicking on a user navigates to their profile page
- **Notes**:
  - Requires auth token
  - Debounced search to reduce API calls

## Messages

TODO

## Profiles

- **Purpose**: Allows users to view their own profile or another user's profile.
- **Data Source**:
  - `GET /api/users/{username}`
  - `GET /api/posts/user/{username}` (paginated)
  - `GET /api/users/me`
  - `GET /api/posts/user/me` (paginated)
