import { Task } from '@/types/Task';

export interface FetchError {
  message: string;
  status?: number;
}

export interface FetchResult {
  tasks: Task[];
  error?: FetchError;
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
      },
    });

    // Check for HTTP errors
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
    }

    const data = await response.json();

    // Validate response format
    if (!Array.isArray(data.tasks)) {
      throw new Error('Invalid response format: tasks should be an array');
    }

    // Process and validate tasks
    const tasks: Task[] = data.tasks.map((rawTask: RawTask) => ({
      taskId: rawTask.taskId || crypto.randomUUID(),
      userId: rawTask.userId || 'unknown',
      title: rawTask.title || 'Untitled Task',
      priority: rawTask.priority || 0,
      status: rawTask.status || 'incomplete',
      dueDate: rawTask.dueDate || new Date().toISOString(),
      createdAt: rawTask.createdAt || new Date().toISOString(),
    }));

    return { tasks };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    
    // Provide user-friendly error messages
    let errorMessage = 'An unknown error occurred while fetching tasks';
    let errorStatus: number | undefined;

    if (error instanceof Error) {
      if (error.message.includes('HTTP error')) {
        errorMessage = 'Failed to fetch tasks';
        // Extract status from error message
        const statusMatch = error.message.match(/status: (\d+)/);
        errorStatus = statusMatch ? parseInt(statusMatch[1]) : undefined;
      } else if (error.message === 'Failed to fetch') {
        errorMessage = 'Network error';
      } else if (error.message.includes('Invalid response format')) {
        errorMessage = 'Invalid response format';
      }
    }

    return {
      tasks: [],
      error: { message: errorMessage, status: errorStatus },
    };
  }
};
