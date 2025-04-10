📦 DynamoDB Table Design
Table Name: Tasks
⚙️ Primary Keys
Key Type	Attribute	Purpose
Partition Key (PK)	userId	Group tasks per user
Sort Key (SK)	taskId	Uniquely identify each task
🧱 Attributes
Attribute	Type	Description
userId	string	The ID of the user who owns the task
taskId	string	UUID or timestamp-based unique task identifier
title	string	Title of the task
description	string	Optional longer description
priority	string	`"High"
dueDate	string	ISO date string: "2025-04-11"
status	string	"incomplete" or "complete"
createdAt	string	ISO timestamp string
updatedAt	string	ISO timestamp string
suggested	boolean	Flag set to true if it's today's top task
✅ Sample Item
json
Copy
Edit
{
  "userId": "user_abc123",
  "taskId": "task_001",
  "title": "Submit pitch deck",
  "description": "Due by 3PM today",
  "priority": "High",
  "dueDate": "2025-04-11",
  "status": "incomplete",
  "createdAt": "2025-04-10T10:02:00Z",
  "updatedAt": "2025-04-10T10:02:00Z",
  "suggested": true
}
📊 Secondary Index (Optional but Powerful)
GSI1 — Tasks by Due Date
Index Name: GSI1
Partition Key: userId
Sort Key: dueDate
Use Cases:

Get all tasks for a user sorted by due date

Easily identify "today's most important task"

🔍 Access Patterns
Operation	Access Pattern
Get all tasks for user	Query userId
Get task by ID	GetItem (userId, taskId)
List tasks by due date	Query GSI1 with userId, sorted by dueDate
Mark task complete	Update status on item
Show today's suggested task	Query GSI1, filter by status = incomplete, sort by priority then dueDate
⏱ Future Enhancements
Add a timeOfDayPreference to track user behavior

Add a effortLevel (e.g. "light", "deep focus") for better smart suggestions

Track completionTime to analyze habits

