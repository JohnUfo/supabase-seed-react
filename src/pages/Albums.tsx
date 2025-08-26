import { useState, useEffect } from "react";
import { CrudTable } from "@/components/CrudTable";
import { albumsService, usersService } from "@/services/supabase-api";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";

type Album = Database["public"]["Tables"]["albums"]["Row"];
type User = Database["public"]["Tables"]["users"]["Row"];

const Albums = () => {
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
      key: 'id' as keyof Album,
      label: 'ID',
      type: 'number' as const,
      hidden: true, // Hide ID in forms
    },
    {
      key: 'user_id' as keyof Album,
      label: 'Owner',
      type: 'select' as const,
      options: users.map(user => ({ value: user.id, label: user.name })),
      render: (value: number) => {
        const user = users.find(u => u.id === value);
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-orange-600">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <span className="font-medium text-gray-900">{user?.name || `User ${value}`}</span>
          </div>
        );
      },
    },
    {
      key: 'title' as keyof Album,
      label: 'Title',
      type: 'text' as const,
      render: (value: string) => (
        <span className="font-medium text-gray-900 max-w-[400px] truncate block" title={value}>
          {value}
        </span>
      ),
    },
  ];

  const defaultData = {
    user_id: users[0]?.id || 1,
    title: '',
  };

  return (
    <CrudTable
      title="Albums"
      description="Manage photo albums organized by users"
      endpoint="albums"
      columns={columns}
      service={albumsService}
      defaultData={defaultData}
      searchFields={['title']}
      relatedData={{ users }}
    />
  );
};

export default Albums;
