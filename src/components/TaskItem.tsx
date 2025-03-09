
import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/context/TaskContext';
import { Check, Clock, Edit, Trash, RefreshCw } from 'lucide-react';
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
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { deleteTask, updateTask } = useTasks();
  
  const handleDelete = async () => {
    await deleteTask(task.id);
  };
  
  const handleStatusUpdate = async (newStatus: Task['status']) => {
    await updateTask(task.id, { status: newStatus });
  };
  
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
  };
  
  const statusIcons = {
    'pending': <Clock className="h-3.5 w-3.5" />,
    'in-progress': <RefreshCw className="h-3.5 w-3.5" />,
    'completed': <Check className="h-3.5 w-3.5" />,
  };

  // Format date for display
  const formattedDate = format(new Date(task.dueDate), 'MMM d, yyyy');
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md border border-border/60 animate-slide-in",
      task.status === 'completed' ? 'opacity-80' : ''
    )}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Badge 
              variant="outline" 
              className={cn(
                "px-2.5 py-0.5 text-xs font-medium flex items-center gap-1 w-fit capitalize",
                statusColors[task.status]
              )}
            >
              {statusIcons[task.status]}
              {task.status.replace('-', ' ')}
            </Badge>
            
            <h3 className={cn(
              "text-lg font-medium line-clamp-1",
              task.status === 'completed' ? 'line-through text-muted-foreground' : ''
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Due: {formattedDate}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => onEdit(task)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-destructive hover:text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{task.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        {task.status !== 'completed' && (
          <div className="mt-4 pt-4 border-t border-border/60 flex justify-end gap-2">
            {task.status === 'pending' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs"
                onClick={() => handleStatusUpdate('in-progress')}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Start
              </Button>
            )}
            
            {task.status === 'in-progress' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs"
                onClick={() => handleStatusUpdate('completed')}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Complete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;
