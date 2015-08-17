DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS votes;
PRAGMA foreign_keys=ON;

CREATE TABLE threads (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT,
 author_id INTEGER,
 content TEXT,
 img_url TEXT,
 votes INTEGER,
 FOREIGN KEY (author_id) REFERENCES users(user_id)
);

CREATE TABLE users (
 user_id INTEGER PRIMARY KEY AUTOINCREMENT,
 username VARCHAR(16),
 user_avatar TEXT
);

CREATE TABLE comments (
 comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
 comment_author_id TEXT,
 comment_avatar TEXT,
 content TEXT,
 img_url TEXT,
 thread_id INTEGER,
 FOREIGN KEY (thread_id) REFERENCES threads(id)
);


