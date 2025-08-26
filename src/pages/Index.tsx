import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Image, 
  Camera, 
  CheckSquare,
  Database,
  Plus,
  Search,
  Edit,
  Trash2,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import DataSeeder from "@/components/DataSeeder";
import DatabaseStatus from "@/components/DatabaseStatus";

const Index = () => {
  const endpoints = [
    {
      name: "Posts",
      description: "Blog posts with title and body content",
      icon: FileText,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      fields: ["user_id", "title", "body"],
      route: "/posts"
    },
    {
      name: "Users",
      description: "User profiles with contact and company information",
      icon: Users,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      fields: ["name", "username", "email", "phone"],
      route: "/users"
    },
    {
      name: "Comments",
      description: "Comments on posts with author information",
      icon: MessageSquare,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      fields: ["post_id", "name", "email", "body"],
      route: "/comments"
    },
    {
      name: "Albums",
      description: "Photo albums organized by users",
      icon: Image,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      fields: ["user_id", "title"],
      route: "/albums"
    },
    {
      name: "Photos",
      description: "Individual photos with URLs and thumbnails",
      icon: Camera,
      color: "bg-pink-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      fields: ["album_id", "title", "url"],
      route: "/photos"
    },
    {
      name: "Todos",
      description: "Todo items with completion status",
      icon: CheckSquare,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      fields: ["user_id", "title", "completed"],
      route: "/todos"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
              <Database className="h-12 w-12 text-white" />
            </div>
            <div className="ml-6 text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Supabase CRUD
              </h1>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <Badge variant="secondary" className="text-sm px-4 py-2 rounded-full bg-blue-100 text-blue-700">
              <Search className="h-4 w-4 mr-2" />
              GET
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2 rounded-full bg-green-100 text-green-700">
              <Plus className="h-4 w-4 mr-2" />
              POST
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2 rounded-full bg-orange-100 text-orange-700">
              <Edit className="h-4 w-4 mr-2" />
              PUT
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2 rounded-full bg-red-100 text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              DELETE
            </Badge>
          </div>
        </div>

        {/* Database Management */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <DatabaseStatus />
          <DataSeeder />
        </div>

        {/* Endpoints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {endpoints.map((endpoint) => {
            const IconComponent = endpoint.icon;
            return (
              <Card key={endpoint.name} className="group hover:shadow-xl transition-all duration-300 bg-white rounded-3xl border-0 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 ${endpoint.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${endpoint.textColor}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mt-4">{endpoint.name}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <Link to={endpoint.route}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Manage {endpoint.name}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
