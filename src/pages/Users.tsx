import { CrudTable } from "@/components/CrudTable";
import { usersService } from "@/services/supabase-api";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";

type User = Database["public"]["Tables"]["users"]["Row"];

const Users = () => {
  const columns = [
    {
      key: 'id' as keyof User,
      label: 'ID',
      type: 'number' as const,
      hidden: true, // Hide ID in forms
    },
    {
      key: 'name' as keyof User,
      label: 'Full Name',
      type: 'text' as const,
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-green-600">
              {value?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <span className="font-medium text-gray-900" title={value}>
            {value}
          </span>
        </div>
      ),
    },
    {
      key: 'username' as keyof User,
      label: 'Username',
      type: 'text' as const,
      render: (value: string) => (
        <Badge variant="secondary" className="rounded-full">
          @{value}
        </Badge>
      ),
    },
    {
      key: 'email' as keyof User,
      label: 'Email',
      type: 'email' as const,
      render: (value: string) => (
        <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800 font-medium">
          {value}
        </a>
      ),
    },
    {
      key: 'phone' as keyof User,
      label: 'Phone',
      type: 'text' as const,
      render: (value: string) => (
        <a href={`tel:${value}`} className="text-gray-600 hover:text-gray-800">
          {value}
        </a>
      ),
    },
    {
      key: 'website' as keyof User,
      label: 'Website',
      type: 'text' as const, // Changed from 'url' to 'text' to allow domain names
      render: (value: string) => {
        // Ensure the URL has a protocol
        const url = value.startsWith('http://') || value.startsWith('https://') 
          ? value 
          : `https://${value}`;
        
        return (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {value}
          </a>
        );
      },
    },
  ];

  const defaultData = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: null,
    company: null,
  };

  return (
    <CrudTable
      title="Users"
      description="Manage user profiles with contact and company information"
      endpoint="users"
      columns={columns}
      service={usersService}
      defaultData={defaultData}
      searchFields={['name', 'username', 'email']}
    />
  );
};

export default Users;
