import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DatabaseStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableCounts, setTableCounts] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const checkDatabaseStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tables = ['users', 'posts', 'comments', 'albums', 'photos', 'todos'];
      const counts: any = {};

      for (const table of tables) {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.error(`Error checking ${table}:`, error);
          counts[table] = 'Error';
        } else {
          counts[table] = count || 0;
        }
      }

      setTableCounts(counts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-600" />
            <CardTitle>Database Status</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkDatabaseStatus}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription>
          Current record counts in your Supabase database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-600 text-sm">{error}</div>
        ) : tableCounts ? (
          <div className="space-y-2">
            {Object.entries(tableCounts).map(([table, count]) => (
              <div key={table} className="flex justify-between items-center">
                <span className="text-sm font-medium capitalize">{table}</span>
                <Badge variant={count === 'Error' ? 'destructive' : count === 0 ? 'secondary' : 'default'}>
                  {count === 'Error' ? 'Error' : count}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No data available</div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseStatus;
