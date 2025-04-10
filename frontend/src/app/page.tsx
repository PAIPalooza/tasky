'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/Task';
import { fetchTasks, FetchResult } from '@/services/taskService';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { tasks: fetchedTasks, error } = await fetchTasks();
        
        if (error) {
          setError(error);
        } else {
          setTasks(fetchedTasks);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto p-4 flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading tasks...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-4 flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={() => window.location.reload()} 
            className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found. Create your first task!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li 
              key={task.taskId} 
              className={`
                p-3 border rounded transition-all 
                ${task.status === 'complete' ? 'bg-green-50 opacity-70' : 'bg-white'}
              `}
            >
              <div className="flex justify-between items-center">
                <h2 className={`
                  font-semibold 
                  ${task.status === 'complete' ? 'line-through text-gray-500' : ''}
                `}>
                  {task.title}
                </h2>
                <span 
                  className={`
                    px-2 py-1 rounded text-xs 
                    ${task.priority <= 1 ? 'bg-green-100 text-green-800' : 
                      task.priority <= 3 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}
                >
                  Priority: {task.priority}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Status: {task.status}</p>
                {task.dueDate && (
                  <p>
                    Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
