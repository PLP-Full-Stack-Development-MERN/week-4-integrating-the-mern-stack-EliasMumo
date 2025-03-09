
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { Task, TaskStatus } from '@/types';
import { useTasks } from '@/context/TaskContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from '@/components/ui/skeleton';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const { getFilteredTasks, isLoading, tasks } = useTasks();
  const [currentTab, setCurrentTab] = useState<TaskStatus | 'all'>('all');
  
  const getTasksByStatus = (status?: TaskStatus) => {
    return status ? getFilteredTasks(status) : tasks;
  };

  const taskCounts = {
    all: tasks.length,
    pending: getFilteredTasks('pending').length,
    'in-progress': getFilteredTasks('in-progress').length,
    completed: getFilteredTasks('completed').length,
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} className="w-full h-[160px] rounded-lg" />
        ))}
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
        <p className="text-muted-foreground">
          Create your first task to get started
        </p>
      </div>
    );
  }
  
  const displayTasks = currentTab === 'all' ? tasks : getFilteredTasks(currentTab as TaskStatus);
  
  return (
    <div className="mt-4 space-y-6">
      <Tabs defaultValue="all" onValueChange={(value) => setCurrentTab(value as TaskStatus | 'all')}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="relative">
            All
            <span className="absolute top-1 right-1 text-xs bg-primary/10 text-primary px-1.5 rounded-full">
              {taskCounts.all}
            </span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending
            <span className="absolute top-1 right-1 text-xs bg-yellow-100 text-yellow-800 px-1.5 rounded-full">
              {taskCounts.pending}
            </span>
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="relative">
            In Progress
            <span className="absolute top-1 right-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
              {taskCounts['in-progress']}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="relative">
            Completed
            <span className="absolute top-1 right-1 text-xs bg-green-100 text-green-800 px-1.5 rounded-full">
              {taskCounts.completed}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
