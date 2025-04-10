import { Task } from '@/types/Task';

export interface FetchResult {
  tasks: Task[];
  error?: string;
}

// Define a type for the raw task data from API
type RawTask = {
  taskId?: string;
  userId?: string;
  title?: string;
  priority?: number;
  status?: 'incomplete' | 'complete';
  dueDate?: string;
  createdAt?: string;
};

export const fetchTasks = async (): Promise<FetchResult> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add authentication headers when available
      },
      // Add timeout and other fetch options
      signal: AbortSignal.timeout(10000), // 10-second timeout
    });

    if (!response.ok) {
      // Handle different HTTP error statuses
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
    }

    const data = await response.json();
    
    // Validate task data structure
    if (!Array.isArray(data.tasks)) {
      throw new Error('Invalid response format: tasks should be an array');
    }

    // Safely transform raw tasks to Task type
    const tasks: Task[] = data.tasks.map((rawTask: RawTask) => ({
      taskId: rawTask.taskId || crypto.randomUUID(),
      userId: rawTask.userId || 'unknown',
      title: rawTask.title || 'Untitled Task',
      priority: Math.max(0, Math.min(5, rawTask.priority || 0)),
      status: rawTask.status || 'incomplete',
      dueDate: rawTask.dueDate,
      createdAt: rawTask.createdAt || new Date().toISOString(),
    }));

    return { tasks };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    
    // Provide user-friendly error messages
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred while fetching tasks';

    return {
      tasks: [],
      error: errorMessage,
    };
  }
};
