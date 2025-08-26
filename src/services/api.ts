const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  id?: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Album {
  id?: number;
  userId: number;
  title: string;
}

export interface Photo {
  id?: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Todo {
  id?: number;
  userId: number;
  title: string;
  completed: boolean;
}

// Generic CRUD functions
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Generic CRUD operations
export const apiService = {
  // GET all items
  getAll: <T>(endpoint: string): Promise<T[]> => 
    fetchApi<T[]>(`/${endpoint}`),
  
  // GET single item
  getById: <T>(endpoint: string, id: number): Promise<T> => 
    fetchApi<T>(`/${endpoint}/${id}`),
  
  // POST new item
  create: <T>(endpoint: string, data: Omit<T, 'id'>): Promise<T> => 
    fetchApi<T>(`/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // PUT update item
  update: <T>(endpoint: string, id: number, data: T): Promise<T> => 
    fetchApi<T>(`/${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  // DELETE item
  delete: (endpoint: string, id: number): Promise<void> => 
    fetchApi<void>(`/${endpoint}/${id}`, {
      method: 'DELETE',
    }),
  
  // GET filtered items
  getFiltered: <T>(endpoint: string, params: Record<string, string>): Promise<T[]> => {
    const searchParams = new URLSearchParams(params);
    return fetchApi<T[]>(`/${endpoint}?${searchParams.toString()}`);
  },
};

// Specific endpoint services
export const postsService = {
  getAll: () => apiService.getAll<Post>('posts'),
  getById: (id: number) => apiService.getById<Post>('posts', id),
  create: (data: Omit<Post, 'id'>) => apiService.create<Post>('posts', data),
  update: (id: number, data: Post) => apiService.update<Post>('posts', id, data),
  delete: (id: number) => apiService.delete('posts', id),
  getByUserId: (userId: number) => apiService.getFiltered<Post>('posts', { userId: userId.toString() }),
};

export const usersService = {
  getAll: () => apiService.getAll<User>('users'),
  getById: (id: number) => apiService.getById<User>('users', id),
  create: (data: Omit<User, 'id'>) => apiService.create<User>('users', data),
  update: (id: number, data: User) => apiService.update<User>('users', id, data),
  delete: (id: number) => apiService.delete('users', id),
};

export const commentsService = {
  getAll: () => apiService.getAll<Comment>('comments'),
  getById: (id: number) => apiService.getById<Comment>('comments', id),
  create: (data: Omit<Comment, 'id'>) => apiService.create<Comment>('comments', data),
  update: (id: number, data: Comment) => apiService.update<Comment>('comments', id, data),
  delete: (id: number) => apiService.delete('comments', id),
  getByPostId: (postId: number) => apiService.getFiltered<Comment>('comments', { postId: postId.toString() }),
};

export const albumsService = {
  getAll: () => apiService.getAll<Album>('albums'),
  getById: (id: number) => apiService.getById<Album>('albums', id),
  create: (data: Omit<Album, 'id'>) => apiService.create<Album>('albums', data),
  update: (id: number, data: Album) => apiService.update<Album>('albums', id, data),
  delete: (id: number) => apiService.delete('albums', id),
  getByUserId: (userId: number) => apiService.getFiltered<Album>('albums', { userId: userId.toString() }),
};

export const photosService = {
  getAll: () => apiService.getAll<Photo>('photos'),
  getById: (id: number) => apiService.getById<Photo>('photos', id),
  create: (data: Omit<Photo, 'id'>) => apiService.create<Photo>('photos', data),
  update: (id: number, data: Photo) => apiService.update<Photo>('photos', id, data),
  delete: (id: number) => apiService.delete('photos', id),
  getByAlbumId: (albumId: number) => apiService.getFiltered<Photo>('photos', { albumId: albumId.toString() }),
};

export const todosService = {
  getAll: () => apiService.getAll<Todo>('todos'),
  getById: (id: number) => apiService.getById<Todo>('todos', id),
  create: (data: Omit<Todo, 'id'>) => apiService.create<Todo>('todos', data),
  update: (id: number, data: Todo) => apiService.update<Todo>('todos', id, data),
  delete: (id: number) => apiService.delete('todos', id),
  getByUserId: (userId: number) => apiService.getFiltered<Todo>('todos', { userId: userId.toString() }),
  getCompleted: (completed: boolean) => apiService.getFiltered<Todo>('todos', { completed: completed.toString() }),
};
