
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskFormData, TaskStatus } from '@/types';
import { api } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  createTask: (taskData: TaskFormData) => Promise<void>;
  updateTask: (id: string, taskData: Partial<TaskFormData>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getFilteredTasks: (status?: TaskStatus) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch tasks on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await api.getTasks();
        setTasks(fetchedTasks);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks');
        toast({
          title: 'Error',
          description: 'Failed to load tasks. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Create a new task
  const createTask = async (taskData: TaskFormData) => {
    try {
      setIsLoading(true);
      const newTask = await api.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
    } catch (err) {
      setError('Failed to create task');
      toast({
        title: 'Error',
        description: 'Failed to create task. Please try again.',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async (id: string, taskData: Partial<TaskFormData>) => {
    try {
      setIsLoading(true);
      const updatedTask = await api.updateTask(id, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
    } catch (err) {
      setError('Failed to update task');
      toast({
        title: 'Error',
        description: 'Failed to update task. Please try again.',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      await api.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (err) {
      setError('Failed to delete task');
      toast({
        title: 'Error',
        description: 'Failed to delete task. Please try again.',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get filtered tasks based on status
  const getFilteredTasks = (status?: TaskStatus) => {
    if (!status) return tasks;
    return tasks.filter(task => task.status === status);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        createTask,
        updateTask,
        deleteTask,
        getFilteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Hook to use the task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
