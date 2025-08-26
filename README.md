# JSONPlaceholder CRUD Application

A comprehensive React application that provides a full CRUD (Create, Read, Update, Delete) interface for the JSONPlaceholder API. Built with React, TypeScript, shadcn/ui components, and React Query.

## Features

- **Full CRUD Operations**: Create, read, update, and delete data for all JSONPlaceholder endpoints
- **Modern UI**: Beautiful interface built with shadcn/ui components and Tailwind CSS
- **Real-time Search**: Search functionality across all data types
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **Loading States**: Smooth loading indicators and optimistic updates

## Available Endpoints

The application supports all JSONPlaceholder API endpoints:

1. **Posts** (`/posts`) - Blog posts with title and body content
2. **Users** (`/users`) - User profiles with contact and company information
3. **Comments** (`/comments`) - Comments on posts with author information
4. **Albums** (`/albums`) - Photo albums organized by users
5. **Photos** (`/photos`) - Individual photos with URLs and thumbnails
6. **Todos** (`/todos`) - Todo items with completion status

## API Operations Supported

Each endpoint supports the following operations:

- **GET** `/endpoint` - Retrieve all items
- **GET** `/endpoint/:id` - Retrieve a specific item
- **POST** `/endpoint` - Create a new item
- **PUT** `/endpoint/:id` - Update an existing item
- **DELETE** `/endpoint/:id` - Delete an item
- **GET** `/endpoint?param=value` - Filter items by parameters

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd supabase-seed-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8081`

## Usage

### Dashboard
The main dashboard provides an overview of all available endpoints with:
- Visual cards for each data type
- Field count and descriptions
- Direct navigation to CRUD interfaces

### CRUD Operations
Each endpoint page provides:

1. **View Data**: Browse all items in a responsive table
2. **Search**: Filter items by relevant fields
3. **Create**: Add new items with form validation
4. **Edit**: Update existing items inline
5. **Delete**: Remove items with confirmation dialogs

### Features by Endpoint

#### Posts
- Manage blog posts with title and body content
- Search by title and body text
- Rich text editing for post content

#### Users
- Complete user profile management
- Contact information with clickable email and website links
- Company and address information

#### Comments
- Comment management with post associations
- Author information with email links
- Search by name, email, and comment body

#### Albums
- Photo album organization
- User association tracking
- Simple title-based management

#### Photos
- Photo management with image previews
- Album associations
- Direct links to full-size images and thumbnails

#### Todos
- Todo item management with completion status
- Visual status indicators
- User association tracking

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **HTTP Client**: Native fetch API
- **Build Tool**: Vite
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── CrudTable.tsx # Reusable CRUD table component
├── pages/
│   ├── Index.tsx     # Dashboard
│   ├── Posts.tsx     # Posts CRUD
│   ├── Users.tsx     # Users CRUD
│   ├── Comments.tsx  # Comments CRUD
│   ├── Albums.tsx    # Albums CRUD
│   ├── Photos.tsx    # Photos CRUD
│   └── Todos.tsx     # Todos CRUD
├── services/
│   └── api.ts        # API service layer
└── App.tsx           # Main application component
```

## API Service Layer

The application includes a comprehensive API service layer (`src/services/api.ts`) that provides:

- Type-safe interfaces for all data types
- Generic CRUD operations
- Specific service functions for each endpoint
- Error handling and response validation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Endpoints

To add support for a new endpoint:

1. Define the interface in `src/services/api.ts`
2. Create service functions for the endpoint
3. Create a new page component using the `CrudTable` component
4. Add the route to `src/App.tsx`

## Important Notes

- **Fake API**: JSONPlaceholder is a fake API - data won't be permanently saved, but the API will respond as if it was real
- **Perfect for Learning**: This makes it ideal for learning and testing CRUD operations
- **No Authentication**: The API doesn't require authentication
- **Rate Limiting**: Be mindful of API rate limits in production use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the free fake API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TanStack Query](https://tanstack.com/query) for the excellent data fetching library
