# **Tasky Project - Semantic Seed Coding Standards**

## **Core Principles**
- Test-Driven Development (TDD) for all features
- Behavior-Driven Development (BDD) for user stories
- Security-first approach for data handling
- Clean code with modern TypeScript/JavaScript practices

## **Backlog Management (Shortcut)**
### **Branch Naming**
- `feature/task-{id}` for new task features
- `bug/task-{id}` for bug fixes
- `chore/task-{id}` for maintenance

### **Story Workflow**
1. Start with test (RED)
2. Implement feature (GREEN)
3. Refactor
4. Create PR
5. Review & Merge

## **Code Standards**

### **Frontend (Next.js)**
```typescript
// Component naming: PascalCase
export const TaskCard = ({ task }: TaskCardProps) => {
  // State hooks at the top
  const [isLoading, setIsLoading] = useState(false);
  
  // Event handlers use handle prefix
  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // API calls in try-catch
    } catch (error) {
      // Error handling
    }
  };
};
```

### **Backend (AWS Lambda)**
```typescript
// Function naming: camelCase
export const createTask = async (event: APIGatewayEvent) => {
  // Validation first
  const task = validateTaskInput(event.body);
  
  // Early returns for errors
  if (!task) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid input' })
    };
  }
  
  // Business logic
  const result = await saveTask(task);
};
```

### **Testing (Jest/React Testing Library)**
```typescript
describe('TaskList', () => {
  it('should display tasks in priority order', async () => {
    // Given
    render(<TaskList tasks={mockTasks} />);
    
    // When
    await screen.findByRole('list');
    
    // Then
    expect(screen.getByText('High Priority Task')).toBeInTheDocument();
  });
});
```

## **Database Standards**
### **DynamoDB**
- Use strong consistency for task reads
- GSI for date-based queries
- TTL for completed tasks (optional)
- Consistent attribute naming:
  - `userId` (PK)
  - `taskId` (SK)
  - `createdAt`
  - `updatedAt`

## **API Standards**
### **REST Endpoints**
- GET /tasks - List tasks
- POST /tasks - Create task
- PATCH /tasks/{id} - Update task
- DELETE /tasks/{id} - Delete task

### **Response Format**
```json
{
  "data": {
    "taskId": "123",
    "title": "Example"
  },
  "error": null,
  "metadata": {
    "timestamp": "2025-04-10T..."
  }
}
```

## **Security Standards**
- No hardcoded credentials
- Environment variables for all secrets
- Input validation on all API endpoints
- CORS configuration for frontend domain only
- Rate limiting on API Gateway

## **CI/CD Requirements**
- All PRs require:
  - Passing tests
  - No ESLint errors
  - Type checking passes
  - Security scan passes
- Automated deployment to:
  - Vercel for frontend
  - AWS Lambda for backend
