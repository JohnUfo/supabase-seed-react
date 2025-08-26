import { useState, useEffect } from "react";
import { CrudTable } from "@/components/CrudTable";
import { postsService, usersService } from "@/services/supabase-api";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type User = Database["public"]["Tables"]["users"]["Row"];

const Posts = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await usersService.getAll();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      key: 'id' as keyof Post,
      label: 'ID',
      type: 'number' as const,
      hidden: true, // Hide ID in forms
    },
    {
      key: 'user_id' as keyof Post,
      label: 'User',
      type: 'select' as const,
      options: users.map(user => ({ value: user.id, label: user.name })),
      render: (value: number) => {
        const user = users.find(u => u.id === value);
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <span className="font-medium text-gray-900">{user?.name || `User ${value}`}</span>
          </div>
        );
      },
    },
    {
      key: 'title' as keyof Post,
      label: 'Title',
      type: 'text' as const,
      render: (value: string) => (
        <span className="font-medium text-gray-900 max-w-[300px] truncate block" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: 'body' as keyof Post,
      label: 'Content',
      type: 'textarea' as const,
      render: (value: string) => (
        <span className="text-gray-600 max-w-[400px] truncate block" title={value}>
          {value}
        </span>
      ),
    },
  ];

  const defaultData = {
    user_id: users[0]?.id || 1,
    title: '',
    body: '',
  };

  return (
    <CrudTable
      title="Posts"
      description="Manage blog posts with title and body content"
      endpoint="posts"
      columns={columns}
      service={postsService}
      defaultData={defaultData}
      searchFields={['title', 'body']}
      relatedData={{ users }}
    />
  );
};

export default Posts;
