
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, ListTodo } from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      title: 'Task Management',
      description: 'Create, update, and organize your tasks in one place',
      icon: <ListTodo className="h-10 w-10 text-primary" />,
    },
    {
      title: 'Task Status Tracking',
      description: 'Keep track of pending, in-progress, and completed tasks',
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="font-medium text-xl">Taskify</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-16 px-4">
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Manage your tasks with ease
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Taskify helps you organize your work, track progress, and achieve your goals.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full px-8 hover-lift">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden glass-effect hover-lift animate-slide-in">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border/40 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Taskify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
