import { useState, useEffect } from "react";
import { CrudTable } from "@/components/CrudTable";
import { commentsService, postsService } from "@/services/supabase-api";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";

type Comment = Database["public"]["Tables"]["comments"]["Row"];
type Post = Database["public"]["Tables"]["posts"]["Row"];

const Comments = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await postsService.getAll();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const columns = [
    {
      key: 'id' as keyof Comment,
      label: 'ID',
      type: 'number' as const,
      hidden: true, // Hide ID in forms
    },
    {
      key: 'post_id' as keyof Comment,
      label: 'Post',
      type: 'select' as const,
      options: posts.map(post => ({ value: post.id, label: post.title })),
      render: (value: number) => {
        const post = posts.find(p => p.id === value);
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-purple-600">
                {post?.title?.charAt(0)?.toUpperCase() || 'P'}
              </span>
            </div>
            <span className="font-medium text-gray-900 max-w-[200px] truncate" title={post?.title}>
              {post?.title || `Post ${value}`}
            </span>
          </div>
        );
      },
    },
    {
      key: 'name' as keyof Comment,
      label: 'Author',
      type: 'text' as const,
      render: (value: string) => (
        <span className="font-medium text-gray-900" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: 'email' as keyof Comment,
      label: 'Email',
      type: 'email' as const,
      render: (value: string) => (
        <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800 text-sm">
          {value}
        </a>
      ),
    },
    {
      key: 'body' as keyof Comment,
      label: 'Comment',
      type: 'textarea' as const,
      render: (value: string) => (
        <span className="text-gray-600 max-w-[400px] truncate block" title={value}>
          {value}
        </span>
      ),
    },
  ];

  const defaultData = {
    post_id: posts[0]?.id || 1,
    name: '',
    email: '',
    body: '',
  };

  return (
    <CrudTable
      title="Comments"
      description="Manage comments on posts with author information"
      endpoint="comments"
      columns={columns}
      service={commentsService}
      defaultData={defaultData}
      searchFields={['name', 'email', 'body']}
      relatedData={{ posts }}
    />
  );
};

export default Comments;
