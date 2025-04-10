## 🧱 **Backlog: SmartTaskly MVP**

### 🗂 EPICS
1. **User Task Management**
2. **Smart Suggestions**
3. **UI/UX Foundation**
4. **AWS Backend Setup**
5. **Vercel Frontend Integration**
6. **Data Model & Persistence**
7. **Deployment & DevOps**
8. **Future Enhancements (Stretch)**

---

### 🔁 **Epic 1: User Task Management**

> Core CRUD logic for user tasks.

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 1.1 | As a user, I want to create a task with a title, due date, and priority | POST to API creates task in DynamoDB with correct schema |
| 1.2 | As a user, I want to see a list of all my tasks | GET from API returns user’s tasks ordered by created date |
| 1.3 | As a user, I want to mark a task as complete | PATCH API updates `status` field to `complete` |
| 1.4 | As a user, I want to delete a task (optional MVP) | DELETE API removes task by taskId and userId |
| 1.5 | As a user, I want each task to have a status so I can track what’s done | Tasks have `incomplete` or `complete` status by default |

---

### 🤖 **Epic 2: Smart Suggestions**

> Basic “today’s top task” logic

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 2.1 | As a user, I want the system to suggest one task to focus on today | App selects highest priority + soonest due task |
| 2.2 | As a user, I want the suggestion to update in real-time as tasks change | When a task is marked complete, suggested task updates |
| 2.3 | As a user, I want to visually see the “Suggested Task” at the top of my list | Suggested task is rendered with a banner or highlight |

---

### 🧩 **Epic 3: UI/UX Foundation**

> Basic frontend structure with task interaction.

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 3.1 | As a user, I want to view my tasks in a card/list UI | All tasks are displayed with title, due date, priority |
| 3.2 | As a user, I want to add tasks via a simple form | Form inputs map to `title`, `dueDate`, and `priority` |
| 3.3 | As a user, I want to check off completed tasks visually | Checkbox or button updates status to `complete` |
| 3.4 | As a user, I want feedback when I add or complete a task | UI shows loading/spinner or toast messages |
| 3.5 | As a user, I want a responsive design on desktop and mobile | Tailwind layout works on all screen sizes |

---

### ☁️ **Epic 4: AWS Backend Setup**

> Task Lambda API and DynamoDB schema

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 4.1 | As a developer, I want to create Lambda functions for each task operation | Lambda functions: createTask, getTasks, updateTaskStatus |
| 4.2 | As a developer, I want the backend to log errors to CloudWatch | All Lambda handlers log errors and results |
| 4.3 | As a developer, I want to mock auth using a hardcoded userId | All API calls assume a static `userId` for testing MVP |
| 4.4 | As a developer, I want to deploy API Gateway endpoints mapped to each Lambda | REST API is public and returns valid JSON |

---

### 🗃 **Epic 5: Vercel Frontend Integration**

> Connect frontend to backend and deploy

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 5.1 | As a developer, I want to fetch data from the AWS API in Next.js | `fetch()` calls connect to API Gateway endpoints |
| 5.2 | As a developer, I want to deploy frontend to Vercel with a public URL | Project is live at a custom subdomain |
| 5.3 | As a developer, I want to use Tailwind and a UI Kit for quick dev | Tailwind is set up and shadcn/ui or Vercel kit is used |
| 5.4 | As a user, I want my session to persist while interacting with the app | State is preserved during session with localStorage or memory |

---

### 📐 **Epic 6: Data Model & Persistence**

> Implement and enforce data structure from DynamoDB

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 6.1 | As a developer, I want to store tasks in DynamoDB with userId and taskId as keys | PK = `userId`, SK = `taskId` |
| 6.2 | As a developer, I want to include priority, dueDate, and status fields | Items follow the agreed schema |
| 6.3 | As a developer, I want to support sorting by due date for suggestions | GSI on `dueDate` works for querying |

---

### 🚀 **Epic 7: Deployment & DevOps**

> Launch everything cleanly

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 7.1 | As a developer, I want to deploy my API to AWS using the CLI or Console | All endpoints are deployed and testable |
| 7.2 | As a developer, I want CI/CD from GitHub to Vercel | Push to main triggers frontend redeploy |
| 7.3 | As a developer, I want to test Lambda endpoints manually | Test cases run using Postman or curl |

---

### 🌱 **Epic 8: Future Enhancements (Stretch/Post-MVP)**

| # | User Story | Acceptance Criteria |
|--|-------------|---------------------|
| 8.1 | As a user, I want authentication so only I can access my tasks | Add Cognito or Supabase auth later |
| 8.2 | As a user, I want recurring tasks | Task object supports repeat rules |
| 8.3 | As a user, I want calendar sync with Google/Outlook | Calendar API integration |
| 8.4 | As a user, I want a chatbot to help plan my day | AI assistant handles natural language input |

---

## 🧩 Backlog Summary

| Epic | User Stories |
|------|--------------|
| 🧱 Task Management | 5 |
| 🤖 Smart Suggestions | 3 |
| 🧩 UI/UX | 5 |
| ☁️ AWS Backend | 4 |
| 🖥 Frontend Integration | 4 |
| 🗃 Data Model | 3 |
| 🚀 Deployment | 3 |
| 🌱 Stretch | 4 |

> 🎯 **Total: 31 stories** — 18 core MVP, 4 stretch, 9 supporting

---



Let me know how you're managing tasks and I can generate it instantly.
