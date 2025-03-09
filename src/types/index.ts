
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}
