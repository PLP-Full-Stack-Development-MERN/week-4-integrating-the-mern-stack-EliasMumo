
import axios from 'axios';
import { Task, TaskFormData } from '@/types';

// In a real app, this would come from environment variables
const API_URL = 'https://mockapi.io/tasks';

// Mock API implementation using local storage
const STORAGE_KEY = 'taskify-tasks';

// Helper to get initial data or return empty array
const getStoredTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return [];
};

// Helper to save tasks to storage
const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// API functions
export const api = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getStoredTasks();
  },

  // Get task by ID
  getTask: async (id: string): Promise<Task | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const tasks = getStoredTasks();
    return tasks.find(task => task.id === id) || null;
  },

  // Create new task
  createTask: async (taskData: TaskFormData): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      createdAt: new Date().toISOString(),
    };
    
    const tasks = getStoredTasks();
    const updatedTasks = [...tasks, newTask];
    saveTasksToStorage(updatedTasks);
    
    return newTask;
  },

  // Update task
  updateTask: async (id: string, taskData: Partial<TaskFormData>): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...taskData,
    };
    
    tasks[taskIndex] = updatedTask;
    saveTasksToStorage(tasks);
    
    return updatedTask;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    saveTasksToStorage(filteredTasks);
  }
};
