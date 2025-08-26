import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

type User = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

type Comment = Database["public"]["Tables"]["comments"]["Row"];
type CommentInsert = Database["public"]["Tables"]["comments"]["Insert"];
type CommentUpdate = Database["public"]["Tables"]["comments"]["Update"];

type Album = Database["public"]["Tables"]["albums"]["Row"];
type AlbumInsert = Database["public"]["Tables"]["albums"]["Insert"];
type AlbumUpdate = Database["public"]["Tables"]["albums"]["Update"];

type Photo = Database["public"]["Tables"]["photos"]["Row"];
type PhotoInsert = Database["public"]["Tables"]["photos"]["Insert"];
type PhotoUpdate = Database["public"]["Tables"]["photos"]["Update"];

type Todo = Database["public"]["Tables"]["todos"]["Row"];
type TodoInsert = Database["public"]["Tables"]["todos"]["Insert"];
type TodoUpdate = Database["public"]["Tables"]["todos"]["Update"];

// Specific endpoint services
export const postsService = {
  getAll: async (): Promise<Post[]> => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return data || [];
  },
  getById: async (id: number): Promise<Post> => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (data: Omit<PostInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Post> => {
    const { data: result, error } = await supabase.from('posts').insert(data).select().single();
    if (error) throw error;
    return result;
  },
  update: async (id: number, data: Partial<PostUpdate>): Promise<Post> => {
    const { data: result, error } = await supabase.from('posts').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result;
  },
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;
  },
  getByUserId: async (userId: number): Promise<Post[]> => {
    const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId);
    if (error) throw error;
    return data || [];
  },
};

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data || [];
  },
  getById: async (id: number): Promise<User> => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (data: Omit<UserInsert, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const { data: result, error } = await supabase.from('users').insert(data).select().single();
    if (error) throw error;
    return result;
  },
  update: async (id: number, data: Partial<UserUpdate>): Promise<User> => {
    const { data: result, error } = await supabase.from('users').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result;
  },
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
  },
};

export const commentsService = {
  getAll: async (): Promise<Comment[]> => {
    const { data, error } = await supabase.from('comments').select('*');
    if (error) throw error;
    return data || [];
  },
  getById: async (id: number): Promise<Comment> => {
    const { data, error } = await supabase.from('comments').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (data: Omit<CommentInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Comment> => {
    const { data: result, error } = await supabase.from('comments').insert(data).select().single();
    if (error) throw error;
    return result;
  },
  update: async (id: number, data: Partial<CommentUpdate>): Promise<Comment> => {
    const { data: result, error } = await supabase.from('comments').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result;
  },
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) throw error;
  },
  getByPostId: async (postId: number): Promise<Comment[]> => {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
    if (error) throw error;
    return data || [];
  },
};

export const albumsService = {
  getAll: async (): Promise<Album[]> => {
    const { data, error } = await supabase.from('albums').select('*');
    if (error) throw error;
    return data || [];
  },
  getById: async (id: number): Promise<Album> => {
    const { data, error } = await supabase.from('albums').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (data: Omit<AlbumInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Album> => {
    const { data: result, error } = await supabase.from('albums').insert(data).select().single();
    if (error) throw error;
    return result;
  },
  update: async (id: number, data: Partial<AlbumUpdate>): Promise<Album> => {
    const { data: result, error } = await supabase.from('albums').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result;
  },
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('albums').delete().eq('id', id);
    if (error) throw error;
  },
  getByUserId: async (userId: number): Promise<Album[]> => {
    const { data, error } = await supabase.from('albums').select('*').eq('user_id', userId);
    if (error) throw error;
    return data || [];
  },
};

export const photosService = {
  getAll: async (): Promise<Photo[]> => {
    const { data, error } = await supabase.from('photos').select('*');
    if (error) throw error;
    return data || [];
  },
  getById: async (id: number): Promise<Photo> => {
    const { data, error } = await supabase.from('photos').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (data: Omit<PhotoInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Photo> => {
    const { data: result, error } = await supabase.from('photos').insert(data).select().single();
    if (error) throw error;
    return result;
  },
  update: async (id: number, data: Partial<PhotoUpdate>): Promise<Photo> => {
    const { data: result, error } = await supabase.from('photos').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result;
  },
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('photos').delete().eq('id', id);
    if (error) throw error;
  },
  getByAlbumId: async (albumId: number): Promise<Photo[]> => {
    const { data, error } = await supabase.from('photos').select('*').eq('album_id', albumId);
    if (error) throw error;
    return data || [];
  },
};

export const todosService = {
  getAll: async (): Promise<Todo[]> => {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) throw error;
    return data || [];
  },
  getById: async (id: number): Promise<Todo> => {
    const { data, error } = await supabase.from('todos').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  create: async (data: Omit<TodoInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Todo> => {
    const { data: result, error } = await supabase.from('todos').insert(data).select().single();
    if (error) throw error;
    return result;
  },
  update: async (id: number, data: Partial<TodoUpdate>): Promise<Todo> => {
    const { data: result, error } = await supabase.from('todos').update(data).eq('id', id).select().single();
    if (error) throw error;
    return result;
  },
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) throw error;
  },
  getByUserId: async (userId: number): Promise<Todo[]> => {
    const { data, error } = await supabase.from('todos').select('*').eq('user_id', userId);
    if (error) throw error;
    return data || [];
  },
  getCompleted: async (completed: boolean): Promise<Todo[]> => {
    const { data, error } = await supabase.from('todos').select('*').eq('completed', completed);
    if (error) throw error;
    return data || [];
  },
};

// Data seeding function to populate tables with JSONPlaceholder data
export const seedData = async () => {
  try {
    console.log('Starting data seeding process...');

    // Fetch data from JSONPlaceholder
    console.log('Fetching data from JSONPlaceholder...');
    const [usersRes, postsRes, commentsRes, albumsRes, photosRes, todosRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
      fetch('https://jsonplaceholder.typicode.com/albums'),
      fetch('https://jsonplaceholder.typicode.com/photos'),
      fetch('https://jsonplaceholder.typicode.com/todos')
    ]);

    const [users, posts, comments, albums, photos, todos] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
      commentsRes.json(),
      albumsRes.json(),
      photosRes.json(),
      todosRes.json()
    ]);

    console.log(`Fetched data: ${users.length} users, ${posts.length} posts, ${comments.length} comments, ${albums.length} albums, ${photos.length} photos, ${todos.length} todos`);

    // Clear existing data first (for demo purposes) - in reverse order to respect foreign keys
    console.log('Clearing existing data...');
    
    // Clear in reverse dependency order
    const { error: clearTodosError } = await supabase.from('todos').delete().neq('id', 0);
    if (clearTodosError) console.error('Error clearing todos:', clearTodosError);
    
    const { error: clearPhotosError } = await supabase.from('photos').delete().neq('id', 0);
    if (clearPhotosError) console.error('Error clearing photos:', clearPhotosError);
    
    const { error: clearCommentsError } = await supabase.from('comments').delete().neq('id', 0);
    if (clearCommentsError) console.error('Error clearing comments:', clearCommentsError);
    
    const { error: clearAlbumsError } = await supabase.from('albums').delete().neq('id', 0);
    if (clearAlbumsError) console.error('Error clearing albums:', clearAlbumsError);
    
    const { error: clearPostsError } = await supabase.from('posts').delete().neq('id', 0);
    if (clearPostsError) console.error('Error clearing posts:', clearPostsError);
    
    const { error: clearUsersError } = await supabase.from('users').delete().neq('id', 0);
    if (clearUsersError) console.error('Error clearing users:', clearUsersError);

    // Insert data into Supabase in order (respecting foreign keys)
    console.log('Inserting users...');
    const { data: insertedUsers, error: usersError } = await supabase.from('users').insert(users.map((user: any) => ({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: user.address,
      company: user.company
    }))).select();
    if (usersError) {
      console.error('Error inserting users:', usersError);
      throw usersError;
    }
    console.log(`Inserted ${insertedUsers?.length || 0} users`);

    // Create a mapping of original user IDs to new user IDs
    const userIdMapping = new Map();
    if (insertedUsers) {
      insertedUsers.forEach((insertedUser, index) => {
        userIdMapping.set(users[index].id, insertedUser.id);
      });
    }

    console.log('Inserting posts...');
    const { data: insertedPosts, error: postsError } = await supabase.from('posts').insert(posts.map((post: any) => ({
      user_id: userIdMapping.get(post.userId) || post.userId, // Use mapped ID
      title: post.title,
      body: post.body
    }))).select();
    if (postsError) {
      console.error('Error inserting posts:', postsError);
      console.error('Posts data sample:', posts.slice(0, 2));
      throw postsError;
    }
    console.log(`Inserted ${insertedPosts?.length || 0} posts`);

    // Create a mapping of original post IDs to new post IDs
    const postIdMapping = new Map();
    if (insertedPosts) {
      insertedPosts.forEach((insertedPost, index) => {
        postIdMapping.set(posts[index].id, insertedPost.id);
      });
    }

    console.log('Inserting comments...');
    const { data: insertedComments, error: commentsError } = await supabase.from('comments').insert(comments.map((comment: any) => ({
      post_id: postIdMapping.get(comment.postId) || comment.postId, // Use mapped ID
      name: comment.name,
      email: comment.email,
      body: comment.body
    }))).select();
    if (commentsError) {
      console.error('Error inserting comments:', commentsError);
      console.error('Comments data sample:', comments.slice(0, 2));
      throw commentsError;
    }
    console.log(`Inserted ${insertedComments?.length || 0} comments`);

    console.log('Inserting albums...');
    const { data: insertedAlbums, error: albumsError } = await supabase.from('albums').insert(albums.map((album: any) => ({
      user_id: userIdMapping.get(album.userId) || album.userId, // Use mapped ID
      title: album.title
    }))).select();
    if (albumsError) {
      console.error('Error inserting albums:', albumsError);
      console.error('Albums data sample:', albums.slice(0, 2));
      throw albumsError;
    }
    console.log(`Inserted ${insertedAlbums?.length || 0} albums`);

    // Create a mapping of original album IDs to new album IDs
    const albumIdMapping = new Map();
    if (insertedAlbums) {
      insertedAlbums.forEach((insertedAlbum, index) => {
        albumIdMapping.set(albums[index].id, insertedAlbum.id);
      });
    }

    console.log('Inserting photos...');
    const { data: insertedPhotos, error: photosError } = await supabase.from('photos').insert(photos.map((photo: any) => ({
      album_id: albumIdMapping.get(photo.albumId) || photo.albumId, // Use mapped ID
      title: photo.title,
      url: photo.url,
      thumbnail_url: photo.thumbnailUrl
    }))).select();
    if (photosError) {
      console.error('Error inserting photos:', photosError);
      console.error('Photos data sample:', photos.slice(0, 2));
      throw photosError;
    }
    console.log(`Inserted ${insertedPhotos?.length || 0} photos`);

    console.log('Inserting todos...');
    const { data: insertedTodos, error: todosError } = await supabase.from('todos').insert(todos.map((todo: any) => ({
      user_id: userIdMapping.get(todo.userId) || todo.userId, // Use mapped ID
      title: todo.title,
      completed: todo.completed
    }))).select();
    if (todosError) {
      console.error('Error inserting todos:', todosError);
      console.error('Todos data sample:', todos.slice(0, 2));
      throw todosError;
    }
    console.log(`Inserted ${insertedTodos?.length || 0} todos`);

    console.log('Data seeded successfully!');
    return {
      users: insertedUsers?.length || 0,
      posts: insertedPosts?.length || 0,
      comments: insertedComments?.length || 0,
      albums: insertedAlbums?.length || 0,
      photos: insertedPhotos?.length || 0,
      todos: insertedTodos?.length || 0,
    };
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
};
