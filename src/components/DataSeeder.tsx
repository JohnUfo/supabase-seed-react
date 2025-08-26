import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, Download, CheckCircle } from "lucide-react";
import { seedData } from "@/services/supabase-api";
import { toast } from "sonner";

const DataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingResult, setSeedingResult] = useState<any>(null);

  const handleSeedData = async () => {
    setIsSeeding(true);
    setSeedingResult(null);
    try {
      const result = await seedData();
      setSeedingResult(result);
      toast.success(`Data seeded successfully! Inserted ${result.users} users, ${result.posts} posts, ${result.comments} comments, ${result.albums} albums, ${result.photos} photos, ${result.todos} todos.`);
    } catch (error) {
      console.error('Seeding error:', error);
      toast.error(`Failed to seed data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-blue-600" />
          <CardTitle>Database Seeder</CardTitle>
        </div>
        <CardDescription>
          Populate your Supabase database with sample data from JSONPlaceholder
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            This will create sample data for all endpoints:
          </p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline">Posts</Badge>
            <Badge variant="outline">Users</Badge>
            <Badge variant="outline">Comments</Badge>
            <Badge variant="outline">Albums</Badge>
            <Badge variant="outline">Photos</Badge>
            <Badge variant="outline">Todos</Badge>
          </div>
        </div>
        
        <Button 
          onClick={handleSeedData} 
          disabled={isSeeding}
          className="w-full"
        >
          {isSeeding ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Seeding Data...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Seed Database
            </>
          )}
        </Button>

        {seedingResult && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Seeding Complete!</span>
            </div>
            <div className="text-xs text-green-700 space-y-1">
              <div>Users: {seedingResult.users}</div>
              <div>Posts: {seedingResult.posts}</div>
              <div>Comments: {seedingResult.comments}</div>
              <div>Albums: {seedingResult.albums}</div>
              <div>Photos: {seedingResult.photos}</div>
              <div>Todos: {seedingResult.todos}</div>
            </div>
          </div>
        )}
        
        <p className="text-xs text-gray-500 text-center">
          This will clear existing data and populate with fresh sample data from JSONPlaceholder.
        </p>
      </CardContent>
    </Card>
  );
};

export default DataSeeder;
