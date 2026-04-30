---
name: pride-frontend-development
description: Technical guidelines for building and maintaining the Pride Selfcare frontend.
---

# Pride Selfcare Frontend Development Skill

## 1. Tech Stack
- **Framework**: React (Vite-based)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI / Shadcn UI
- **Routing**: React Router DOM (v6) with `basename="/pride"`
- **Icons**: Lucide React

## 2. Component Architecture
- **Shadcn UI**: Use standard Shadcn patterns. Components are located in `src/components/ui`.
- **Reusable Patterns**:
  - Prefer functional components with hooks.
  - Use `clsx` and `tailwind-merge` (via `cn` utility) for conditional class names.
  - Implement responsive design using Tailwind's mobile-first breakpoints.

## 3. Global State & Data
- **React Query**: Use `@tanstack/react-query` for all asynchronous data fetching.
- **Zod**: Use Zod for schema validation (especially for forms and API responses).

## 4. Routing & Navigation
- **Subpath Hosting**: The app is hosted on `/pride`.
- **Router Configuration**: `BrowserRouter` must always have `basename="/pride"`.
- **Links**: Use `Link` from `react-router-dom` for internal navigation.

## 5. Coding Standards
- **Strict TypeScript**: Avoid `any`. Use interfaces and types for props and state.
- **Lucide Icons**: Standardize icon usage. Use consistent stroke width and sizing (usually `w-5 h-5`).
- **Performance**: Use dynamic imports for large feature sets to keep the initial bundle small.

## 6. Implementation Logic
When creating new features:
1.  **Check** `src/components/ui` for existing Radix/Shadcn components before building from scratch.
2.  **Verify** that any new route is added to `src/App.tsx` within the `AuthGuard` if it's protected content.
3.  **Ensure** all images have proper alt text and use modern formats (WebP).
4.  **Follow** the accessibility standards (WCAG 2.1) supported by Radix UI.
