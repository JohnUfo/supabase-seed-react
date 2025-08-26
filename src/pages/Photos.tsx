import { useState, useEffect } from "react";
import { CrudTable } from "@/components/CrudTable";
import { photosService, albumsService } from "@/services/supabase-api";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";

type Photo = Database["public"]["Tables"]["photos"]["Row"];
type Album = Database["public"]["Tables"]["albums"]["Row"];

const Photos = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumsData = await albumsService.getAll();
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchAlbums();
  }, []);

  const columns = [
    {
      key: 'id' as keyof Photo,
      label: 'ID',
      type: 'number' as const,
      hidden: true, // Hide ID in forms
    },
    {
      key: 'album_id' as keyof Photo,
      label: 'Album',
      type: 'select' as const,
      options: albums.map(album => ({ value: album.id, label: album.title })),
      render: (value: number) => {
        const album = albums.find(a => a.id === value);
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-pink-600">
                {album?.title?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <span className="font-medium text-gray-900 max-w-[200px] truncate" title={album?.title}>
              {album?.title || `Album ${value}`}
            </span>
          </div>
        );
      },
    },
    {
      key: 'title' as keyof Photo,
      label: 'Title',
      type: 'text' as const,
      render: (value: string) => (
        <span className="font-medium text-gray-900 max-w-[300px] truncate block" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: 'url' as keyof Photo,
      label: 'Image',
      type: 'url' as const,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <img 
            src={value} 
            alt="Thumbnail" 
            className="w-12 h-12 object-cover rounded-xl border-2 border-gray-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View
          </a>
        </div>
      ),
    },
    {
      key: 'thumbnail_url' as keyof Photo,
      label: 'Thumbnail',
      type: 'url' as const,
      render: (value: string) => (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Thumbnail
        </a>
      ),
    },
  ];

  const defaultData = {
    album_id: albums[0]?.id || 1,
    title: '',
    url: '',
    thumbnail_url: '',
  };

  return (
    <CrudTable
      title="Photos"
      description="Manage individual photos with URLs and thumbnails"
      endpoint="photos"
      columns={columns}
      service={photosService}
      defaultData={defaultData}
      searchFields={['title']}
      relatedData={{ albums }}
    />
  );
};

export default Photos;
