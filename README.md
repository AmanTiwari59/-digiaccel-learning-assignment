# Digiaccel Learning - SDE-1 (MERN Stack) Assignment

A mobile-first To-Do List Application built to exact Figma specifications for the Digiaccel SDE-1 Assignment. The application enables users to create, schedule, edit, delete, and search tasks, organized strictly by week (Monday to Sunday) with visual progress tracking and real-time completion analytics.

---

## 📱 Features & Figma Screen Mapping

| Screen / Feature | Figma Design | Implementation Details |
| :--- | :--- | :--- |
| **Screen 1: Onboarding** | Purple brand header with wave pattern, *"Manage What To Do"*, *"Get Started"* CTA | High-fidelity welcome screen. Tap *"Get Started"* to enter dashboard. Settings icon in dashboard header allows returning to onboarding at any time. |
| **Screen 2: Home Dashboard** | Search bar, 7-day strip (Mon–Sun), Completed & Pending summary cards, Weekly Progress bar, *"Tasks Today"* list, Floating `+` button | Shows Monday-to-Sunday weekly strip with active day pill. Cards show real-time "This Week" counts. Tasks support optimistic checkbox toggle with strikethrough. |
| **Swipe-to-Delete** | Mobile gesture: swipe left on any task item | Implemented with touch gesture detection (`useSwipeGesture`), translating the card left to reveal a red *"Delete"* action. Inline trash and edit buttons are also available. |
| **Screen 3: Add / Edit Task** | Slide-up Bottom Sheet Modal with Title, Time Range, Date Picker, Priority Chips, Description | Accessible bottom sheet modal with smooth slide-up animation and backdrop dismiss. Mandatory field validation for Title & Date. |
| **Screen 4: Search View** | Search input with back arrow, real-time filtered results | Debounced live search querying title and description with inline checkbox and edit/delete actions. |

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Custom color tokens matching Figma palette: Brand Purple `#5B36F4`, Lavender `#F0EEFF`, Soft Red `#FFEAEA`)
- **Icons:** Lucide React
- **Database / ORM:** MongoDB Atlas + Mongoose
- **API Architecture:** Serverless Next.js Route Handlers (`/api/tasks`, `/api/tasks/[id]`, `/api/metrics`, `/api/seed`)

---

## 📐 Coding Conventions & Standards (Referencing `fe-web-portal`)

- **Strict Type Prefixing:** All TypeScript interfaces are prefixed with `I` (e.g. `ITask`, `IWeeklySummary`, `IButtonProps`, `ICheckBoxProps`, `IInputProps`).
- **Enum Suffixing:** All TypeScript enums end with `Enum` (e.g. `TaskPriorityEnum`, `TaskStatusEnum`).
- **Decoupled Business Logic:** UI components only receive props and callbacks; network operations, filter states, and optimistic updates are managed in dedicated custom hooks (`useTasks`, `useWeeklyMetrics`, `useDebounce`, `useSwipeGesture`).
- **Atomic Reusable Components:** Reusable buttons, inputs, checkboxes, and bottom sheets are placed in `src/components/common/` with forwardRef support and JSDoc annotations.
- **Maintainable File Budget:** Clean modular separation keeping files concise (~100–250 lines).

---

## 📂 Project Structure

```
-digiaccel-learning-assignment/
├── README.md                          # Documentation & guide
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # Strict TypeScript settings with @/* alias
├── tailwind.config.ts                 # Custom theme & color extensions
├── postcss.config.mjs
├── .env.example                       # Environment template
├── .env.local                         # Local environment with MongoDB Atlas URI
└── src/
    ├── types/                         # Interfaces prefixed with I
    │   ├── ITask.ts                   # Task entity & input interfaces
    │   ├── IWeeklySummary.ts          # Weekly aggregate metrics interface
    │   ├── ITaskFilter.ts             # Query filter parameters
    │   └── props/                     # Reusable component prop interfaces
    │       ├── IButtonProps.ts
    │       ├── IInputProps.ts
    │       ├── ICheckBoxProps.ts
    │       └── IBottomSheetProps.ts
    │
    ├── enums/                         # Enums suffixed with Enum
    │   ├── TaskPriorityEnum.ts        # LOW, MEDIUM, HIGH
    │   └── TaskStatusEnum.ts          # PENDING, IN_PROGRESS, COMPLETED
    │
    ├── constants/                     # Centralized design tokens & defaults
    │   ├── theme.ts                   # Color palette & hex values
    │   ├── dateConstants.ts           # Weekday & month names
    │   └── taskDefaults.ts            # Form initial values
    │
    ├── utils/                         # Reusable pure utilities
    │   ├── classNames.ts              # cn() Tailwind class merger
    │   ├── calculateWeeklyStats.ts    # Aggregator for completed vs pending tasks
    │   └── date/
    │       ├── getWeekRange.ts        # Monday-to-Sunday ISO week calculator
    │       └── formatTaskDate.ts      # Human-readable date & time formatter
    │
    ├── apis/                          # Typed API Client layer
    │   ├── configs/
    │   │   ├── request.ts             # Centralized fetch wrapper with error handling
    │   │   └── getApiBaseUrl.ts       # Base URL resolver
    │   └── tasksApi.ts                # Typed CRUD methods
    │
    ├── hooks/                         # Custom React hooks
    │   ├── useTasks.ts                # Main task state with optimistic updates
    │   ├── useWeeklyMetrics.ts        # Aggregated metrics state
    │   ├── useDebounce.ts             # Search debounce utility
    │   └── useSwipeGesture.ts         # Touch swipe-left detector for swipe-to-delete
    │
    ├── components/
    │   ├── common/                    # Atomic reusable UI components
    │   │   ├── Button/                # Styled button with variants & loading state
    │   │   ├── Input/                 # Text & time/date inputs with icon slots
    │   │   ├── CheckBox/              # Custom checkbox with checkmark animation
    │   │   └── BottomSheet/           # Slide-up modal with backdrop
    │   │
    │   ├── onboarding/                # Screen 1: Onboarding View
    │   │   └── OnboardingView.tsx
    │   ├── home/                      # Screen 2: Home Dashboard
    │   │   ├── WeekCalendarStrip.tsx  # Monday to Sunday day selector
    │   │   ├── MetricCards.tsx        # Completed & Pending cards
    │   │   ├── WeeklyProgressBar.tsx  # Progress fill bar
    │   │   ├── TaskItem.tsx           # Individual task row with swipe gesture
    │   │   ├── TaskList.tsx           # Grouped task list with "View All"
    │   │   └── FloatingAddButton.tsx  # Floating circular "+" button
    │   │
    │   ├── taskModal/                 # Screen 3: Add / Edit Modal
    │   │   ├── TaskForm.tsx           # Form with Title, Time, Date, Priority chips, Description
    │   │   └── TaskModalContainer.tsx # Modal state container
    │   │
    │   └── search/                    # Screen 4: Search Mode
    │       ├── SearchBar.tsx          # Back navigation + input
    │       └── SearchResultsList.tsx  # Search results list
    │
    ├── lib/
    │   └── mongodb.ts                 # Cached Mongoose connection helper
    ├── models/
    │   └── Task.ts                    # Mongoose Task Schema with ISO week pre-save hook
    └── app/
        ├── globals.css                # Tailwind base styles
        ├── layout.tsx                 # Root layout & centered mobile frame
        ├── page.tsx                   # Main controller coordinating views
        └── api/                       # REST API route handlers
            ├── tasks/route.ts         # GET (filter) & POST (create)
            ├── tasks/[id]/route.ts    # GET, PUT, DELETE by ID
            ├── metrics/route.ts       # GET weekly summary metrics
            └── seed/route.ts          # POST demo tasks matching Figma
```

---

## 📡 REST API Documentation

### 1. `GET /api/tasks`
Retrieve tasks with optional filters.
- **Query Params:**
  - `date`: `YYYY-MM-DD` (e.g. `2026-11-10`)
  - `weekNumber`: `1-53`
  - `year`: `2026`
  - `status`: `pending` | `completed` | `in_progress`
  - `search`: Keyword search in title and description

### 2. `POST /api/tasks`
Create a new task.
- **Body:**
  ```json
  {
    "title": "Doing Homework",
    "description": "Optional details",
    "date": "2026-11-14",
    "startTime": "09:00",
    "endTime": "10:30",
    "priority": "medium"
  }
  ```

### 3. `PUT /api/tasks/[id]`
Update attributes or status of a task.
- **Body:** Partial task fields (e.g. `{"status": "completed"}`).

### 4. `DELETE /api/tasks/[id]`
Deletes a task by ID.

### 5. `GET /api/metrics`
Returns computed weekly stats for the current or specified week.
- **Response:**
  ```json
  {
    "weekNumber": 46,
    "year": 2026,
    "startDate": "2026-11-09",
    "endDate": "2026-11-15",
    "totalTasks": 4,
    "completedTasks": 2,
    "pendingTasks": 2,
    "completionPercentage": 50
  }
  ```

### 6. `POST /api/seed`
Clears and re-populates the database with demo tasks matching the Figma mockups.

---

## 🚀 Getting Started

### 1. Environment Setup
The project uses MongoDB Atlas. Ensure `.env.local` contains:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.cxpzjsn.mongodb.net/todo_app?retryWrites=true&w=majority"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
