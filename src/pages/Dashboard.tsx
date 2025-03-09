
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types';

const Dashboard: React.FC = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  
  const handleAddTask = () => {
    setTaskToEdit(undefined);
    setIsTaskFormOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };
  
  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
    setTaskToEdit(undefined);
  };
  
  return (
    <Layout onAddTask={handleAddTask}>
      <div className="w-full max-w-7xl mx-auto py-8">
        <div className="flex flex-col items-start mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-muted-foreground mt-2">
            Manage your tasks and stay organized
          </p>
        </div>
        
        <TaskList onEditTask={handleEditTask} />
        
        <TaskForm 
          isOpen={isTaskFormOpen} 
          onClose={handleCloseTaskForm} 
          editTask={taskToEdit} 
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
