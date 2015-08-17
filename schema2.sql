DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
 comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
 comment_author_id TEXT,
 comment_avatar TEXT,
 content TEXT,
 img_url TEXT,
 thread_id INTEGER,
 FOREIGN KEY (thread_id) REFERENCES threads(id)
);

CREATE TABLE votes (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER,
 thread_id INTEGER,
 FOREIGN KEY (user_id) REFERENCES users(user_id),
 FOREIGN KEY (thread_id) REFERENCES threads(id)
);