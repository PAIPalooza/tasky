import { fetchTasks } from '../taskService';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Mock server setup
const server = setupServer(
  // Define mock API responses
  http.get('https://mock-api.example.com/tasks', () => {
    return HttpResponse.json({
      tasks: [
        {
          taskId: '1',
          userId: 'user123',
          title: 'Test Task',
          priority: 2,
          status: 'incomplete',
          dueDate: '2025-04-15T00:00:00Z',
          createdAt: '2025-04-10T00:00:00Z',
        },
      ],
    });
  })
);

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that are added during the tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());

describe('fetchTasks', () => {
  it('should fetch tasks successfully', async () => {
    const result = await fetchTasks();

    expect(result.error).toBeUndefined();
    expect(result.tasks).toHaveLength(1);
    
    const task = result.tasks[0];
    expect(task).toEqual({
      taskId: '1',
      userId: 'user123',
      title: 'Test Task',
      priority: 2,
      status: 'incomplete',
      dueDate: '2025-04-15T00:00:00Z',
      createdAt: '2025-04-10T00:00:00Z',
    });
  });

  it('should handle incomplete task data', async () => {
    // Mock server with incomplete task data
    server.use(
      http.get('https://mock-api.example.com/tasks', () => {
        return HttpResponse.json({
          tasks: [
            {
              // Missing some fields
              title: 'Incomplete Task',
            },
          ],
        });
      })
    );

    const result = await fetchTasks();

    expect(result.error).toBeUndefined();
    expect(result.tasks).toHaveLength(1);
    
    const task = result.tasks[0];
    expect(task.title).toBe('Incomplete Task');
    expect(task.taskId).toBeTruthy(); // Should generate a UUID
    expect(task.userId).toBe('unknown');
    expect(task.priority).toBe(0);
    expect(task.status).toBe('incomplete');
  });

  it('should handle API error', async () => {
    // Mock server error
    server.use(
      http.get('https://mock-api.example.com/tasks', () => {
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    const result = await fetchTasks();

    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('Failed to fetch tasks');
    expect(result.error?.status).toBe(500);
    expect(result.tasks).toHaveLength(0);
  });

  it('should handle network error', async () => {
    // Mock network failure
    server.use(
      http.get('https://mock-api.example.com/tasks', () => {
        throw new Error('Failed to fetch');
      })
    );

    const result = await fetchTasks();

    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('Failed to fetch tasks');
    expect(result.tasks).toHaveLength(0);
  });

  it('should handle invalid response format', async () => {
    // Mock server with invalid response format
    server.use(
      http.get('https://mock-api.example.com/tasks', () => {
        return HttpResponse.json({
          // Missing 'tasks' array
          message: 'Invalid data',
        });
      })
    );

    const result = await fetchTasks();

    expect(result.tasks).toHaveLength(0);
    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('Invalid response format');
  });
});
