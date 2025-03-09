
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListTodo } from 'lucide-react';

interface HeaderProps {
  onAddTask?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-sm fixed top-0 z-10">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ListTodo className="h-6 w-6 text-primary" />
          <span className="font-medium text-xl">Taskify</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {onAddTask && (
          <Button 
            onClick={onAddTask} 
            variant="default" 
            size="sm" 
            className="flex items-center gap-2 rounded-full px-4 h-9 hover-lift"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Task</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
