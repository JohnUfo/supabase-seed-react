import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye,
  ArrowLeft,
  Loader2,
  User,
  FileText,
  MessageSquare,
  Image,
  Camera,
  CheckSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CrudTableProps<T> {
  title: string;
  description: string;
  endpoint: string;
  columns: {
    key: keyof T;
    label: string;
    type?: 'text' | 'textarea' | 'number' | 'boolean' | 'email' | 'url' | 'select';
    render?: (value: any) => React.ReactNode;
    options?: { value: any; label: string }[];
    hidden?: boolean;
  }[];
  service: {
    getAll: () => Promise<T[]>;
    create: (data: Omit<T, 'id'>) => Promise<T>;
    update: (id: number, data: T) => Promise<T>;
    delete: (id: number) => Promise<void>;
  };
  defaultData: Omit<T, 'id'>;
  searchFields?: (keyof T)[];
  relatedData?: {
    users?: { id: number; name: string }[];
    posts?: { id: number; title: string }[];
    albums?: { id: number; title: string }[];
  };
}

export function CrudTable<T extends { id?: number }>({
  title,
  description,
  endpoint,
  columns,
  service,
  defaultData,
  searchFields = [],
  relatedData
}: CrudTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Omit<T, 'id'>>(defaultData);
  const [editFormData, setEditFormData] = useState<T>({} as T);

  const queryClient = useQueryClient();

  // Queries
  const { data: items = [], isLoading, error } = useQuery({
    queryKey: [endpoint],
    queryFn: service.getAll,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      setIsCreateOpen(false);
      setFormData(defaultData);
      toast.success(`${title} created successfully!`);
    },
    onError: (error) => {
      toast.error(`Failed to create ${title.toLowerCase()}: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: T }) => service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      setIsEditOpen(false);
      setEditingItem(null);
      toast.success(`${title} updated successfully!`);
    },
    onError: (error) => {
      toast.error(`Failed to update ${title.toLowerCase()}: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: service.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      toast.success(`${title} deleted successfully!`);
    },
    onError: (error) => {
      toast.error(`Failed to delete ${title.toLowerCase()}: ${error.message}`);
    },
  });

  // Filter items based on search term
  const filteredItems = items.filter((item) => {
    if (!searchTerm) return true;
    return searchFields.some((field) => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Handle form submission
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem?.id) {
      updateMutation.mutate({ id: editingItem.id, data: editFormData });
    }
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setEditFormData(item);
    setIsEditOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // Get icon for endpoint
  const getEndpointIcon = () => {
    switch (endpoint) {
      case 'posts': return FileText;
      case 'users': return User;
      case 'comments': return MessageSquare;
      case 'albums': return Image;
      case 'photos': return Camera;
      case 'todos': return CheckSquare;
      default: return FileText;
    }
  };

  // Render form field
  const renderFormField = (
    column: typeof columns[0],
    value: any,
    onChange: (value: any) => void,
    isEdit = false
  ) => {
    const fieldValue = isEdit ? editFormData[column.key] : value[column.key];
    
    if (column.hidden) return null;
    
    switch (column.type) {
      case 'textarea':
        return (
          <Textarea
            value={fieldValue || ''}
            onChange={(e) => {
              if (isEdit) {
                setEditFormData({ ...editFormData, [column.key]: e.target.value });
              } else {
                setFormData({ ...formData, [column.key]: e.target.value });
              }
            }}
            placeholder={`Enter ${column.label.toLowerCase()}`}
            className="min-h-[100px] resize-none"
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={fieldValue || ''}
            onChange={(e) => {
              const val = e.target.value === '' ? undefined : Number(e.target.value);
              if (isEdit) {
                setEditFormData({ ...editFormData, [column.key]: val });
              } else {
                setFormData({ ...formData, [column.key]: val });
              }
            }}
            placeholder={`Enter ${column.label.toLowerCase()}`}
          />
        );
      case 'boolean':
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={fieldValue || false}
              onChange={(e) => {
                if (isEdit) {
                  setEditFormData({ ...editFormData, [column.key]: e.target.checked });
                } else {
                  setFormData({ ...formData, [column.key]: e.target.checked });
                }
              }}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label className="text-sm font-medium">{column.label}</Label>
          </div>
        );
      case 'select':
        return (
          <Select
            value={fieldValue?.toString() || ''}
            onValueChange={(val) => {
              if (isEdit) {
                setEditFormData({ ...editFormData, [column.key]: val });
              } else {
                setFormData({ ...formData, [column.key]: val });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${column.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type={column.type || 'text'}
            value={fieldValue || ''}
            onChange={(e) => {
              if (isEdit) {
                setEditFormData({ ...editFormData, [column.key]: e.target.value });
              } else {
                setFormData({ ...formData, [column.key]: e.target.value });
              }
            }}
            placeholder={`Enter ${column.label.toLowerCase()}`}
          />
        );
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading {title.toLowerCase()}: {error.message}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const EndpointIcon = getEndpointIcon();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <EndpointIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-1">{description}</p>
              </div>
            </div>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add {title.slice(0, -1)}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Create New {title.slice(0, -1)}</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new {title.slice(0, -1).toLowerCase()}.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-6">
                {columns.filter(col => !col.hidden).map((column) => (
                  <div key={String(column.key)} className="space-y-2">
                    <Label htmlFor={String(column.key)} className="text-sm font-medium text-gray-700">
                      {column.label}
                    </Label>
                    {renderFormField(column, formData, () => {})}
                  </div>
                ))}
                <DialogFooter className="pt-6">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-full">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} className="bg-blue-600 hover:bg-blue-700 rounded-full">
                    {createMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        {searchFields.length > 0 && (
          <Card className="mb-6 bg-white rounded-2xl shadow-sm border-0">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm border-0 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table */}
        <Card className="bg-white rounded-2xl shadow-sm border-0 overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>{title} ({filteredItems.length})</span>
              {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      {columns.filter(col => !col.hidden).map((column) => (
                        <TableHead key={String(column.key)} className="font-semibold text-gray-700">
                          {column.label}
                        </TableHead>
                      ))}
                      <TableHead className="w-[120px] text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={columns.filter(col => !col.hidden).length + 1} className="text-center py-12 text-gray-500">
                          <div className="flex flex-col items-center space-y-2">
                            <EndpointIcon className="h-12 w-12 text-gray-300" />
                            <p>No {title.toLowerCase()} found.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredItems.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                          {columns.filter(col => !col.hidden).map((column) => (
                            <TableCell key={String(column.key)}>
                              {column.render ? column.render(item[column.key]) : (
                                <span className="truncate max-w-[200px] block">
                                  {item[column.key]?.toString() || '-'}
                                </span>
                              )}
                            </TableCell>
                          ))}
                          <TableCell>
                            <div className="flex items-center justify-center space-x-2">
                              <Dialog open={isEditOpen && editingItem?.id === item.id} onOpenChange={setIsEditOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(item)}
                                    className="rounded-full h-8 w-8 p-0"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold">Edit {title.slice(0, -1)}</DialogTitle>
                                    <DialogDescription>
                                      Update the details of this {title.slice(0, -1).toLowerCase()}.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form onSubmit={handleUpdate} className="space-y-6">
                                    {columns.filter(col => !col.hidden).map((column) => (
                                      <div key={String(column.key)} className="space-y-2">
                                        <Label htmlFor={String(column.key)} className="text-sm font-medium text-gray-700">
                                          {column.label}
                                        </Label>
                                        {renderFormField(column, editFormData, () => {}, true)}
                                      </div>
                                    ))}
                                    <DialogFooter className="pt-6">
                                      <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-full">
                                        Cancel
                                      </Button>
                                      <Button type="submit" disabled={updateMutation.isPending} className="bg-blue-600 hover:bg-blue-700 rounded-full">
                                        {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        Update
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white rounded-2xl">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete {title.slice(0, -1)}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this {title.slice(0, -1).toLowerCase()}? 
                                      This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => item.id && handleDelete(item.id)}
                                      className="bg-red-600 hover:bg-red-700 rounded-full"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
