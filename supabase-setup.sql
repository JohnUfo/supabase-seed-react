-- Drop existing profiles table if it exists
DROP TABLE IF EXISTS profiles;

-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  address JSONB,
  company JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create albums table
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create photos table
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  album_id INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create todos table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_albums_user_id ON albums(user_id);
CREATE INDEX idx_photos_album_id ON photos(album_id);
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_completed ON todos(completed);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for demo purposes)
CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON comments FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON albums FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON photos FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON todos FOR SELECT USING (true);

-- Create policies for public write access (for demo purposes)
CREATE POLICY "Allow public insert access" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON albums FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON todos FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON posts FOR UPDATE USING (true);
CREATE POLICY "Allow public update access" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow public update access" ON comments FOR UPDATE USING (true);
CREATE POLICY "Allow public update access" ON albums FOR UPDATE USING (true);
CREATE POLICY "Allow public update access" ON photos FOR UPDATE USING (true);
CREATE POLICY "Allow public update access" ON todos FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON posts FOR DELETE USING (true);
CREATE POLICY "Allow public delete access" ON users FOR DELETE USING (true);
CREATE POLICY "Allow public delete access" ON comments FOR DELETE USING (true);
CREATE POLICY "Allow public delete access" ON albums FOR DELETE USING (true);
CREATE POLICY "Allow public delete access" ON photos FOR DELETE USING (true);
CREATE POLICY "Allow public delete access" ON todos FOR DELETE USING (true);
