# API Endpoints & Authentication

## Authentication

- **Signup:**  
  `POST /auth/signup/`

- **Login:**  
  `POST /auth/login/`

- **Profile:**  
  `GET /auth/user-profile/`  
  `PATCH /auth/user-profile/`

**Protected routes require JWT token in header:**
```
Authorization: Bearer <access_token>
```

---

## Frontend Page Flows & API Mapping

- **[Landing Page]**  
  --CTA--> [Onboarding]

- **[Onboarding]**  
  --POST--> `/user-profile`

- **[Onboarding Diagnostic Quiz]**  
  --GET--> `/quiz/start`  
  --POST--> `/quiz/submit`  
  (Updates UserConceptProgress & DailyTarget)

- **[User Dashboard]**  
  --GET--> `/user-progress` (today)  
  --GET--> `/user-progress/full_progress`  
  --GET--> `/daily-target/`  
  --GET--> `/check_achievements`  

  --POST--> `/quiz/start`  
  --POST--> `/quiz/submit`

- **[Daily Targets Page]**  
  --GET--> `/daily-target/`  


- **[Quiz / AI Quiz]**  
  --GET--> `/quiz/start`  
  --POST--> `/quiz/submit` (update mastery, achievements)

- **[Progress Tracker]**  
  --GET--> `/user-progress/full_progress`

- **[Weak Areas Page]**  
  --GET--> `/user-progress/weak_concepts`  
  --POST--> `/daily-target/bulk-add`

- **[Achievements Page]**  
  --GET--> `/check_achievements`

- **[Profile & Settings]**  
  --GET/PUT--> `/user-profile`



Core Principles to Keep UX Intuitive

One thing at a time: Every screen has a single clear action.

Immediate gratification: Show value instantly after diagnostic or task completion.

Gamification drives return: Streaks, badges, leaderboard rank.

Visual clarity: Clean charts, simple color coding (weak vs strong topics).

Minimal friction: No unnecessary forms, clicks, or distractions.





Streamlined UX Flow (Candidate-Focused)
1. Landing Page (Hook)

Headline: “Your AI-Powered JEE Partner Knows Exactly What You Should Study Today.”

Hero Visual: Animation showing a student stressed → dashboard opens → daily target completed → “Mastered” badge appears.

CTA: One prominent button: “Create My Personalized Plan” (scrolls directly to signup).

Quick Value Proposition Blocks (3 slides/carousel):

Personalized Daily Targets → “No more wasting time on topics you already know.”

Track Your Mastery → “See your progress grow every day.”

Gamified Motivation → “Compete with others at your level on the leaderboard.”

Social Proof: Testimonials from early users or stats: “500+ students improved their prep efficiency by 30%.”

2. Onboarding (Magic Trick)

Micro-Steps:

Name, Email, Password.

Exam target & preferred subjects.

Quick diagnostic challenge (5–10 questions).

Progress Feedback: Show percentage completion at the top.

First Mini-Report: Immediately after diagnostic:

Weakest topics highlighted

Suggested Daily Target ready to go → “Start Today” button.

Gamification: Small achievements after each step:

“Step 1 Complete ✅ You’re on your way!”

“Diagnostic Complete 🎯 Your first personalized target is ready.”

3. Dashboard (Command Center)

Central Daily Target Card:

Task title, estimated time, start button.

Countdown or “time left” for motivation.

Progress Visualization:

Line chart → mastery over time.

Donut chart → topic-wise mastery.

Streak counter → keeps users coming back.

AI Companion (Motivator + Guide):

Short personalized messages:

“You nailed Vectors yesterday, ready to level up?”

“Your Physics mastery is 65%. Let’s push it to 75% today!”

Leaderboard:

Shows student’s rank relative to others at similar preparation level.

Optional toggle: student can choose to hide from leaderboard.

True Picture Section:

Chapters left, predicted completion date, days until exam.

JEE Readiness Score dynamically updates daily.

Quick Navigation Buttons:

Take Test, Review Topic, Adjust Plan → single click to action.

4. Engagement Loops

Daily Target Completion → Reward:

Streak badge, XP points, “Mastered” badge.

Leaderboard Motivation:

Weekly leaderboard resets or updates, encouraging healthy competition.

Snackable Micro-Masterclasses:

Short videos or interactive slides for each weak topic.






Frontend Plan (React)

We can structure it as 4 main modules:

1. Dashboard (Command Center)

Goal: Immediate clarity — “What I need to do today, how I’m progressing, and how close I am to the exam.”

Components:

DailyTargetCard

Show today’s concepts/subtopics with checkboxes or “Start Learning” buttons.

Time estimate for each concept.

Color-coded status: “Not started / In progress / Mastered.”

ProgressOverview

Line chart: mastery over time (daily/weekly).

Donut chart: topics mastered vs remaining.

Streak counter.

TruePicturePanel

Total chapters left, days to exam, predicted completion date.

Dynamic JEE Readiness Score.

Leaderboard

Optional toggle.

Shows rank based on cumulative mastery/points.

QuickActions

Buttons to start tests, review weak topics, or redo concepts.

AI Companion / Motivation Panel

Personalized encouragement:

“You mastered Mechanics yesterday, ready for Vectors today?”

Include daily tip or small challenge.

Frontend Hooks:

Fetch /dailytarget/generate/ → populate today’s tasks.

Fetch /progress/full_progress/ → for charts and readiness score.

2. Syllabus Explorer

Goal: Let the student see the big picture and navigate to concepts easily.

Components:

ExamCard → SubjectList → TopicList → Subtopic → ConceptList

Tree-style navigation with expandable/collapsible nodes.

Show mastery % next to each node.

ConceptDetailPanel

Shows short description, micro-video or text snippet.

Mark “Understood” or score manually (calls /progress/update_mastery/).

UX Improvement:

Use breadcrumb navigation: Exam → Subject → Topic → Concept.

Highlight weak areas automatically.

3. Progress & Analytics

Goal: Let the student feel where they are and where they need to improve.

Components:

Topic-wise Mastery Grid

Table or cards showing % mastery per topic.

Concept Completion Timeline

Timeline chart: when each concept was completed.

Daily Target Tracker

Show streaks, points earned, missed targets.

UX Improvement:

Color coding: Red = weak, Yellow = moderate, Green = mastered.

Include “What to focus on next” panel based on AI analysis.

4. Micro-Mastery & Gamification

Goal: Keep the student engaged and motivated.

Components:

Mini Quizzes per topic → calls /progress/update_mastery_bulk/.

Achievement badges → visual reward on dashboard.

Leaderboard → shows student rank relative to peers.