⚡️ MVP PRD: SmartTaskly (1-Hour Build Version)
🚀 Mission
Build a personalized task manager MVP in under an hour that lets users:

Create & view tasks

Assign due dates and priorities

Get a simple “today's suggested task” using a basic rule-based logic

🛠 Tech Stack
🔙 Backend (AWS)
AWS Lambda + API Gateway: Task CRUD endpoints

DynamoDB: Store user tasks (userId, taskId, title, dueDate, priority, status)

CloudWatch Logs: For quick debug/monitoring

Optional: Cognito or Magic Link (mock auth to save time)

🖥 Frontend (Vercel + UI Kit)
Next.js App Router (app dir)

Tailwind CSS + shadcn/ui (or Vercel’s Prebuilt UI templates)

REST fetch to call AWS endpoints

Quick-loading, mobile-friendly interface

🎯 Feature Scope (What You’ll Actually Build)
1. 📝 Task Creation
Input: Task name, priority (High/Med/Low), due date

Call POST /api/tasks → AWS Lambda → DynamoDB

2. 📋 Task List View
Fetch tasks from GET /api/tasks

Render cards with title, due date, priority

3. 📅 “Suggested Task for Today”
Simple logic: pick the task with the closest due date and highest priority

Display one suggested task at the top

4. ✅ Mark Complete
PATCH /api/tasks/{id} → toggle status to “done”

🧱 DynamoDB Schema
json
Copy
Edit
{
  "userId": "abc123",
  "taskId": "uuid",
  "title": "Submit deck",
  "dueDate": "2025-04-11",
  "priority": "High",
  "status": "incomplete"
}
⏱ 60-Minute Sprint Plan
Time	Task
0-10 min	Set up Next.js on Vercel + AWS credentials
10-25 min	Build Lambda functions for CRUD
25-40 min	Create basic UI with Tailwind & UI Kit
40-50 min	Connect frontend to AWS endpoints
50-60 min	Deploy, test flows, polish “Today’s Task”
🧪 MVP Demo Goals
Add 3 tasks

View sorted list

See "Suggested Task"

Complete a task

🧠 Future (Post-MVP)
User auth (Cognito)

Habit learning logic

AI-powered prioritization

Calendar integration
