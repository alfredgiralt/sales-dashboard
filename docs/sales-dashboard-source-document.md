# Sales Activity Dashboard Source Document

## 1. Purpose

We need to build a simple internal sales activity dashboard for a small startup.

The tool should help the team manage a limited number of commercial opportunities before adopting a full out-of-the-box CRM such as HubSpot, Pipedrive or Salesforce.

The objective is not to create a sophisticated CRM. The objective is to create a lightweight, intuitive and operational sales control tool that helps the team understand:

- Which accounts are active
- Which opportunities are open
- Which opportunities matter most
- Who owns the next step
- What is blocked or risky
- What should be reviewed this week
- What could realistically convert this quarter
- What the estimated and weighted pipeline value is

The tool should support weekly commercial discipline without creating operational complexity.

---

## 2. Product Definition

The tool is a lightweight internal sales dashboard / mini-CRM.

It should be built either as:

1. A simple custom web application; preferred option.
2. A Google Sheet only as a fallback; less preferable.

The tool should not depend on Airtable, Notion, HubSpot, Pipedrive, Salesforce or any other third-party CRM/productivity platform.

The preferred direction is a standalone custom web application that can be used internally by a small team.

---

## 3. Core Data Model

The tool must be structured around three levels:

### 3.1 Accounts

Accounts are the companies, institutions, groups or organizations being developed commercially.

Examples:

- Jakala
- Alkemy Iberia
- Making Science
- T2ó ONE
- Gobierno de España
- Netflix
- Amazon
- Fluzo
- Smartme
- L’Oréal
- IKI Media
- Apple Tree
- Influencia
- Keepers

### 3.2 Opportunities / Projects

Opportunities are the specific commercial opportunities or projects inside each account.

One account can have one or several opportunities.

Important example:

- Account: Gobierno de España
- Opportunities / Projects:
  - Turespaña
  - Loterías y Apuestas del Estado

Do not treat Turespaña and Loterías y Apuestas del Estado as separate accounts. They are potential projects within the same public-sector account: Gobierno de España.

### 3.3 Activities / Next Steps

Activities are the commercial interactions and follow-up actions linked to each opportunity.

Examples:

- Email
- Call
- Meeting
- Proposal sent
- Follow-up
- Internal review
- Client feedback
- Commercial decision
- Other

---

## 4. Account Categories

The initial account categories should be:

1. Digital Consultancies
2. Public Sector
3. Media / Platforms
4. Blue Sky / Strategic Opportunities

---

## 5. Initial Accounts

### Digital Consultancies

- Jakala
- Alkemy Iberia
- Making Science
- T2ó ONE

### Public Sector

- Gobierno de España

### Media / Platforms

- Netflix
- Amazon

### Blue Sky / Strategic Opportunities

- Fluzo
- Smartme
- L’Oréal
- IKI Media
- Apple Tree
- Influencia
- Keepers

---

## 6. Initial Opportunities

Create the following initial opportunities:

### Digital Consultancies

- Jakala opportunity
- Alkemy Iberia opportunity
- Making Science opportunity
- T2ó ONE opportunity

### Public Sector

- Gobierno de España / Turespaña
- Gobierno de España / Loterías y Apuestas del Estado

### Media / Platforms

- Netflix opportunity
- Amazon opportunity

### Blue Sky / Strategic Opportunities

- Fluzo opportunity
- Smartme opportunity
- L’Oréal opportunity
- IKI Media opportunity
- Apple Tree opportunity
- Influencia opportunity
- Keepers opportunity

---

## 7. Sales Status Options

Each opportunity should have one status.

Use the following status options:

- New lead
- Exploration
- Discovery
- Proposal
- Validation / First Project
- Negotiation
- Closed won
- Closed lost
- On hold

Important: do not use “Pilot” as a mandatory commercial stage. Use “Validation / First Project” instead.

---

## 8. Account Fields

Each account should include:

- Account name
- Category
- Main contact
- Contact role
- Contact email
- Contact phone
- Account owner
- Strategic relevance: Low / Medium / High
- Number of open opportunities
- Highest opportunity status
- Last interaction date
- Next step date
- Account notes

---

## 9. Opportunity Fields

Each opportunity should include:

- Opportunity / project name
- Parent account
- Category
- Owner
- Status
- Priority: Low / Medium / High
- Estimated potential value
- Probability of close
- Weighted value
- Expected close horizon
- Opportunity type
- Business model / collaboration model
- Strategic relevance: Low / Medium / High
- Main contact
- Notes
- Next step
- Next step due date
- Last interaction date
- Main risk
- Risk type
- Risk level: Low / Medium / High
- Risk description
- Mitigation action
- Blocked: Yes / No
- Blocker description

Weighted value formula:

```text
Estimated potential value x probability of close
```

---

## 10. Expected Close Horizon Options

Use the following options:

- This month
- This quarter
- Next quarter
- Later
- Unknown

---

## 11. Risk Type Options

Use the following risk types:

- Timing risk
- Partial client interest
- Internal technical resistance
- Collaboration model undefined
- Too many opportunities open
- Technical capacity constraint
- No clear decision-maker
- Data access dependency
- Procurement complexity
- Low urgency
- Other

---

## 12. Activity Fields

Each activity should include:

- Date
- Activity type
- Summary
- Outcome
- Next action
- Created by
- Linked opportunity
- Linked account

The latest activity should automatically update the opportunity’s last interaction date.

---

## 13. Main Product Sections

The app should include the following navigation:

1. Dashboard
2. Accounts
3. Opportunities
4. Kanban
5. This Week Focus
6. Risks
7. Settings

---

## 14. Dashboard Home

Create a clean executive dashboard with KPI cards.

The dashboard should show:

- Total active accounts
- Total active opportunities
- High-priority opportunities
- High-risk opportunities
- Opportunities with overdue next steps
- Opportunities expected to close this quarter
- Total estimated pipeline value
- Weighted pipeline value

The dashboard should also include simple visual summaries:

- Opportunities by status
- Opportunities by category
- Opportunities by owner
- Opportunities by risk level
- Opportunities by expected close horizon

Charts should be simple and readable.

---

## 15. Accounts View

Create a table of accounts.

The table should show:

- Account name
- Category
- Main contact
- Account owner
- Strategic relevance
- Number of open opportunities
- Highest opportunity status
- Last interaction date
- Next step date

The account table should allow:

- Add account
- Edit account
- Delete account
- Search by account name
- Filter by category
- Filter by owner
- Filter by strategic relevance

When clicking an account, open an Account Detail view.

---

## 16. Account Detail View

The Account Detail view should show:

- Account name
- Category
- Owner
- Main contact
- Contact details
- Strategic relevance
- General notes
- List of opportunities linked to the account
- Recent activity across all opportunities
- Open risks
- Next actions

The user should be able to add a new opportunity/project from the Account Detail view.

---

## 17. Opportunities View

Create a table with all opportunities across all accounts.

The table should show:

- Opportunity / project name
- Parent account
- Category
- Owner
- Status
- Priority
- Estimated potential value
- Probability of close
- Weighted value
- Expected close horizon
- Next step
- Next step due date
- Last interaction date
- Main risk
- Risk level
- Blocked: Yes / No

The opportunities table should allow:

- Add opportunity
- Edit opportunity
- Delete opportunity
- Filter by account
- Filter by category
- Filter by status
- Filter by owner
- Filter by priority
- Filter by risk level
- Filter by close horizon
- Sort by next step date
- Sort by weighted value
- Sort by priority

---

## 18. Kanban Pipeline View

Create a simple Kanban view grouped by opportunity status.

Columns:

- New lead
- Exploration
- Discovery
- Proposal
- Validation / First Project
- Negotiation
- Closed won
- Closed lost
- On hold

Each card should show:

- Opportunity name
- Parent account
- Category
- Owner
- Priority
- Risk level
- Next step
- Next step due date
- Estimated value
- Probability
- Weighted value

Drag and drop is nice to have but not mandatory.

If drag and drop is complex, each card should have a status dropdown so the user can quickly move the opportunity to another stage.

---

## 19. This Week Focus View

Create a practical view called “This Week Focus”.

This section should automatically show:

- Opportunities with overdue next steps
- Opportunities with next steps due in the next 7 days
- High-priority opportunities
- High-value opportunities
- High-risk opportunities
- Blocked opportunities
- Opportunities with no recent activity

Each item should show:

- Opportunity name
- Parent account
- Owner
- Current status
- Next step
- Due date
- Risk level
- Suggested attention reason

Suggested attention reasons:

- Overdue next step
- High priority
- High risk
- High weighted value
- No recent activity
- Blocked

---

## 20. Risk Dashboard

Create a risk dashboard to monitor commercial and operational risks.

Show:

- Number of high-risk opportunities
- Number of blocked opportunities
- Number of opportunities without clear next step
- Number of opportunities with undefined collaboration model
- Number of opportunities with overdue next step

Each risk item should include:

- Opportunity name
- Parent account
- Main risk
- Risk type
- Risk level
- Risk description
- Mitigation action
- Blocker status

---

## 21. Opportunity Detail View

When clicking an opportunity, open a detailed opportunity page or side panel.

It should show:

- Opportunity name
- Parent account
- Category
- Owner
- Status
- Priority
- Estimated value
- Probability of close
- Weighted value
- Expected close horizon
- Business model / collaboration model
- Strategic relevance
- Main contact
- Notes
- Main risk
- Risk level
- Mitigation action
- Blocker status
- Activity history
- Next step

The user should be able to edit all fields.

---

## 22. Activity Log

Each opportunity should have an activity log.

Each activity should include:

- Date
- Activity type
- Summary
- Outcome
- Next action
- Created by

Activity type options:

- Email
- Call
- Meeting
- Proposal sent
- Follow-up
- Internal review
- Client feedback
- Commercial decision
- Other

The latest activity should automatically update the opportunity’s last interaction date.

---

## 23. Simple Alerts / Visual Flags

Add simple visual flags:

- Red flag when next step is overdue
- Yellow flag when next step is due within 7 days
- Red flag when risk level is high
- Red flag when opportunity is blocked
- Grey flag when there has been no activity for more than 30 days

No complex notification system is required for version 1.

---

## 24. Data Storage

Build the app as a lightweight standalone web application.

Preferred technical approach:

- Frontend: React or Next.js
- Backend: lightweight API
- Database: SQLite or another simple self-contained database
- ORM: Prisma or equivalent
- Styling: Tailwind CSS
- Authentication: optional simple password protection
- Hosting: simple internal deployment

Do not require Airtable, Notion, HubSpot, Pipedrive, Salesforce or any external CRM.

---

## 25. Export / Import

The data should be exportable.

Required export options:

- Export accounts to CSV
- Export opportunities to CSV
- Export activities to CSV
- Export full pipeline to CSV or JSON

Optional import options:

- Import accounts from CSV
- Import opportunities from CSV

---

## 26. Design Requirements

The interface should be clean, modern and extremely easy to use.

Design principles:

- Desktop-first
- Clear visual hierarchy
- Simple navigation
- Minimal clicks
- Large readable tables
- KPI cards at the top
- Filters always visible
- No unnecessary complexity
- Professional but lightweight startup feel
- Subtle color coding for status, priority and risk level

---

## 27. Suggested Version 1 Scope

Version 1 should include only the core product:

1. Dashboard page with KPI cards
2. Accounts table
3. Opportunities table
4. Add/edit opportunity form
5. This Week Focus view
6. Basic risk indicators
7. Sample data based on this source document

Do not build advanced features first.

Do not build complex authentication first unless it is very simple.

Focus on getting a working local version.

---

## 28. Suggested Version 2 Scope

Version 2 can include:

1. Opportunity detail page or side panel
2. Activity log per opportunity
3. Kanban view by status
4. CSV export for accounts, opportunities and activities
5. Better filters in the opportunities table
6. Simple authentication
7. Basic deployment setup

---

## 29. Success Criteria

The final tool should help us run a weekly sales review in less than 30 minutes.

At any moment, we should be able to answer:

- What are our active accounts?
- What are our active opportunities?
- What should we focus on this week?
- Which opportunities are stuck?
- Which opportunities have no clear next step?
- Which opportunities are high risk?
- Which opportunities could close this quarter?
- What is the estimated pipeline value?
- What is the weighted pipeline value?
- Who owns each next step?

---

## 30. Recommended Technical Stack

Preferred stack:

- Next.js
- TypeScript
- Tailwind CSS
- SQLite
- Prisma
- Optional: simple password authentication

Rationale:

- Next.js allows frontend and backend in one project.
- SQLite is simple and self-contained.
- Prisma makes the database easier to manage.
- Tailwind helps build a clean dashboard quickly.
- The stack is easy to evolve later if the tool grows.

---

## 31. Project Instructions for Claude Code or Codex

Create an `AGENTS.md` file in the root of the project with the following content:

```md
# Project instructions

We are building a simple internal sales activity dashboard for a small startup.

The product should be simple, intuitive and operational. Avoid unnecessary complexity.

The app should be structured around:

- Accounts
- Opportunities / Projects
- Activities
- Risks
- Dashboard KPIs
- This Week Focus

Do not build a sophisticated CRM.
Do not depend on Airtable, Notion, HubSpot, Pipedrive or Salesforce.

Preferred approach:

- Simple standalone web app
- Desktop-first interface
- Clean tables
- KPI cards
- Filters
- Kanban view
- CSV export
- Simple authentication if easy to implement

Before coding major features, explain the plan and wait for approval.

Prioritize clarity, maintainability and simplicity over advanced functionality.
```

---

## 32. First Prompt to Use in Claude Code or Codex

Paste this into Claude Code or Codex first:

```text
Read docs/sales-dashboard-source-document.md carefully.

Do not start coding yet.

First, give me:

1. A proposed technical architecture
2. The recommended stack
3. The database structure
4. The main pages/components
5. A phased implementation plan
6. Any simplifications you recommend for version 1

Important:
This is for a small startup with a limited number of leads. Keep it simple and avoid over-engineering.
```

---

## 33. Second Prompt After Approving the Plan

After reviewing and approving the plan, paste this:

```text
Proceed with version 1.

Build only the core product first:

1. Dashboard page with KPI cards
2. Accounts table
3. Opportunities table
4. Add/edit opportunity form
5. This Week Focus view
6. Basic risk indicators
7. Sample data based on the source document

Do not build advanced features yet.
Do not build complex authentication yet unless it is very simple.
Focus on getting a working local version.
```

---

## 34. Third Prompt for Phase 2

Once version 1 works, paste this:

```text
Now implement phase 2:

1. Opportunity detail page or side panel
2. Activity log per opportunity
3. Kanban view by status
4. CSV export for accounts, opportunities and activities
5. Better filters in the opportunities table

Keep the interface simple.
```

---

## 35. Local Project Setup

Suggested folder structure:

```text
sales-dashboard/
  docs/
    sales-dashboard-source-document.md
  AGENTS.md
  package.json
  prisma/
  src/
```

Open the folder in Claude Code or Codex and use this document as the source of truth.

---

## 36. Important Product Constraint

Keep the tool operational and practical.

Do not over-engineer.

Do not turn the tool into a complex enterprise CRM.

The main value is not the software sophistication. The main value is creating a simple commercial discipline around:

- Account
- Opportunity
- Status
- Owner
- Next step
- Due date
- Risk
- Estimated value
- Probability of close
- Weekly focus
