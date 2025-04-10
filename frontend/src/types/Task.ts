export interface Task {
  taskId: string;
  userId: string;
  title: string;
  description?: string;
  priority: number;
  status: 'incomplete' | 'complete';
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}
