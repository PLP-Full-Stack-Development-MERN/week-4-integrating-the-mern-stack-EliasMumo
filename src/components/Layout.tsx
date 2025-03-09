
import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  onAddTask?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAddTask }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onAddTask={onAddTask} />
      <main className="flex-1 pt-16 pb-10 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
