import { useState, useEffect } from "react";
import { CrudTable } from "@/components/CrudTable";
import { todosService, usersService } from "@/services/supabase-api";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";

type Todo = Database["public"]["Tables"]["todos"]["Row"];
type User = Database["public"]["Tables"]["users"]["Row"];

const Todos = () => {
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
      key: 'id' as keyof Todo,
      label: 'ID',
      type: 'number' as const,
      hidden: true, // Hide ID in forms
    },
    {
      key: 'user_id' as keyof Todo,
      label: 'Assigned To',
      type: 'select' as const,
      options: users.map(user => ({ value: user.id, label: user.name })),
      render: (value: number) => {
        const user = users.find(u => u.id === value);
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <span className="font-medium text-gray-900">{user?.name || `User ${value}`}</span>
          </div>
        );
      },
    },
    {
      key: 'title' as keyof Todo,
      label: 'Task',
      type: 'text' as const,
      render: (value: string) => (
        <span className="font-medium text-gray-900 max-w-[400px] truncate block" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: 'completed' as keyof Todo,
      label: 'Status',
      type: 'boolean' as const,
      render: (value: boolean) => (
        <div className="flex items-center space-x-2">
          {value ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
          <Badge variant={value ? "default" : "secondary"} className="rounded-full">
            {value ? "Completed" : "Pending"}
          </Badge>
        </div>
      ),
    },
  ];

  const defaultData = {
    user_id: users[0]?.id || 1,
    title: '',
    completed: false,
  };

  return (
    <CrudTable
      title="Todos"
      description="Manage todo items with completion status"
      endpoint="todos"
      columns={columns}
      service={todosService}
      defaultData={defaultData}
      searchFields={['title']}
      relatedData={{ users }}
    />
  );
};

export default Todos;
