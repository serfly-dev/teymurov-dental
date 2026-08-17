# Commercial Dentistry Website

## Project

Commercial dentistry website.

Priorities (highest → lowest):

1. Correctness
2. Performance
3. SEO
4. Maintainability
5. UX/UI
6. Accessibility

Always think about the whole project, not only the current task.

---

# Stack

Frontend

- Next.js 16 App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React

Backend

- Server Actions
- Route Handlers
- Prisma ORM
- PostgreSQL

Validation

- Zod

Forms

- React Hook Form

---

# General Rules

Before writing code:

- analyze the task;
- look for a better architectural solution;
- consider SEO;
- consider performance;
- consider scalability.

If there is a significantly better solution, explain it first.

Never intentionally reduce maintainability.

Never introduce unnecessary complexity.

---

# Code

Use:

- strict TypeScript;
- readable names;
- reusable code;
- early returns;
- small functions;
- small components.

Avoid:

- any
- ts-ignore
- duplicated logic
- dead code
- magic numbers
- unnecessary comments

Only change code related to the requested task.

Do not remove existing functionality unless explicitly requested.

---

# React

Prefer Server Components.

Use Client Components only when necessary:

- useState
- useEffect
- browser APIs
- event handlers

Keep client bundles as small as possible.

---

# Next.js

Use modern Next.js features:

- App Router
- Metadata API
- generateMetadata
- Server Actions
- Route Handlers
- Suspense
- streaming when useful
- next/image
- next/link

Do not use deprecated APIs.

---

# Database

Use Prisma.

Prefer:

- relations
- transactions
- type safety

Validate data before writing to the database.

---

# Validation

Validate all external input using Zod.

Never trust client input.

---

# UI

Design principles:

- clean
- modern
- minimal
- consistent
- responsive

Avoid visual clutter.

Animations should improve UX, not distract.

---

# Tailwind

Keep class lists readable.

Extract repeated UI into reusable components.

---

# Components

Components should:

- have one responsibility;
- be reusable when appropriate;
- avoid unnecessary props;
- avoid deeply nested JSX.

---

# Accessibility

Prefer semantic HTML.

Support:

- keyboard navigation;
- focus visibility;
- aria attributes where necessary.

---

# SEO

Every public page should have:

- title
- description
- canonical
- Open Graph
- Twitter Cards

Use:

- semantic headings;
- structured data when appropriate;
- internal linking;
- descriptive alt text.

Protect Core Web Vitals.

---

# Images

Use next/image whenever possible.

Always provide meaningful alt text.

Optimize image sizes.

---

# Performance

Prefer:

- Server Components
- lazy loading
- code splitting
- caching
- ISR where appropriate

Avoid unnecessary JavaScript.

---

# Security

Never expose secrets.

Use environment variables.

Validate every external input.

Escape user-generated content when necessary.

---

# Project Structure

Respect the existing architecture.

Do not introduce new folders or patterns unless they provide a clear benefit.

Keep naming consistent.

---

# While Coding

Modify only what is necessary.

Preserve existing behavior.

Follow the project's coding style.

---

# Before Finishing

Verify:

- TypeScript
- ESLint
- imports
- performance
- duplicated code
- SEO impact
- accessibility impact

Mention any important architectural improvements separately from the implementation.
All answers on Russian language.