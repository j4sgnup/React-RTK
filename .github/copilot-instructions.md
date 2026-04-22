# React-RTK Project Instructions

## Project Purpose

This repository is a simple learning-oriented React + Redux Toolkit application built by hand.
The app should stay intentionally small and easy to reason about:

- Fetch a list of users from JSONPlaceholder.
- Show a users list page.
- Show a user details page.
- Use TypeScript throughout.
- Use Vite for tooling.
- Use React Testing Library and Vitest for tests.

The user wants guidance and implementation help in small steps, but does not want the project generated wholesale for them unless they explicitly ask for code to be written.

## Collaboration Style

When helping in this repository:

- Prefer coaching, step-by-step guidance, and explanation over large unsolicited code generation.
- Answer the exact next step the user asks about.
- Keep solutions simple and beginner-friendly.
- Do not over-engineer the architecture.
- When suggesting code, prefer the smallest complete example for the current step.
- If a change spans multiple files, explain the order the user should build them.

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Testing Library
- Vitest

## App Scope

Keep the first version limited to:

- A typed `User` model for JSONPlaceholder users.
- A Redux slice that loads users.
- A simple API layer for fetching users.
- A users list page.
- A user details page.
- Basic routing.
- Basic tests for core UI and state behavior.

Defer extras until later unless the user explicitly asks for them, including:

- advanced styling systems
- normalization libraries
- RTK Query
- pagination
- form handling
- caching strategies beyond basic Redux state
- feature-heavy architecture patterns

## Expected Architecture

Use a straightforward feature-oriented structure.

Current intended structure:

```text
src/
  features/
    users/
      usersAPI.ts
      usersSlice.ts
      Users.test.tsx
    userDetail/
      UserDetail.tsx
      UserDetail.test.tsx
  pages/
    UserListPage.tsx
    UserDetailPage.tsx
  types/
    user.ts
  hooks.ts
  store.ts
  App.tsx
  App.test.tsx
  main.tsx
```

Responsibilities:

- `types/user.ts`: shared TypeScript interfaces for JSONPlaceholder user data.
- `features/users/usersAPI.ts`: network request helpers.
- `features/users/usersSlice.ts`: async thunk and Redux state.
- `pages/UserListPage.tsx`: page that loads and renders the user list.
- `pages/UserDetailPage.tsx`: page wrapper for details route.
- `features/userDetail/UserDetail.tsx`: presentational detail component.
- `store.ts`: Redux store configuration and exported types.
- `hooks.ts`: typed Redux hooks.
- `main.tsx`: app entry point, including `Provider`.

## State Management Guidelines

Use Redux Toolkit with minimal state.

Recommended users state shape:

```ts
{
  items: User[];
  loading: boolean;
  error: string | null;
}
```

Guidelines:

- Use `createAsyncThunk` for the initial fetch flow.
- Keep network logic in `usersAPI.ts`.
- Keep the slice focused on state transitions.
- Export and use `RootState` and `AppDispatch` from `store.ts`.
- Prefer typed hooks from `hooks.ts` instead of raw `useDispatch` and `useSelector` in components.

## TypeScript Guidelines

Prefer clear explicit interfaces over clever abstractions.

For JSONPlaceholder users, keep nested interfaces separated:

- `Geo`
- `Address`
- `Company`
- `User`

Notes:

- Match JSONPlaceholder field names exactly.
- Use `username`, not `userName`.
- Keep interfaces in `types/user.ts` unless there is a clear reason to split them.

## Routing Guidelines

Use simple routing only.

Expected routes:

- `/` for the users list
- `/users/:id` for the user details page

If routing is not yet installed, prefer `react-router-dom` for this project.

## Testing Guidelines

Use Vitest with React Testing Library.

Testing priorities:

- Render the users list page states: loading, success, error.
- Verify a user row or link is shown after data loads.
- Verify the detail component renders the selected user's information.
- Keep tests focused on user-visible behavior.

Avoid:

- brittle implementation-detail tests
- over-mocking Redux internals when simple rendering tests are enough

## Development Workflow

When continuing work on this repository, prefer this build order:

1. Define shared types in `src/types/user.ts`.
2. Create `src/features/users/usersAPI.ts`.
3. Create `src/features/users/usersSlice.ts`.
4. Configure `src/store.ts`.
5. Add `src/hooks.ts`.
6. Wrap the app with Redux `Provider` in `src/main.tsx`.
7. Build `src/pages/UserListPage.tsx`.
8. Build `src/features/userDetail/UserDetail.tsx`.
9. Build `src/pages/UserDetailPage.tsx`.
10. Add routing in `src/App.tsx`.
11. Add tests.

When helping the user, keep guidance aligned to the current step instead of jumping ahead.

## Current Repository Status

The repository already contains:

- Vite + React + TypeScript project setup
- Redux Toolkit and React Redux installed
- testing dependencies installed
- starter files created for the feature structure

Current known in-progress files include:

- `src/types/user.ts`
- `src/store.ts`
- `src/features/users/usersAPI.ts`
- `src/features/users/usersSlice.ts`

Some files may be partially implemented while the user is building the app step by step. Read existing code before suggesting the next change.

## Code Quality Expectations

- Favor simple, readable code.
- Keep file responsibilities narrow.
- Preserve the existing project structure unless the user asks to refactor it.
- Avoid introducing new libraries unless they solve a clear need.
- Explain tradeoffs when there is more than one reasonable path.
- If code is incomplete or inconsistent, point out the exact local fix rather than proposing a rewrite.

## Commands

Primary commands:

- `npm run dev`
- `npm run build`
- `npm run lint`

If test scripts are missing, add Vitest wiring only when the user asks to set up tests fully.

## Default Assistant Behavior For Future Chats

Assume the user wants:

- help continuing this exact project
- concise explanations
- step-by-step implementation guidance
- TypeScript-first answers
- Redux Toolkit best practices without unnecessary complexity

Do not assume the user wants the entire application generated at once.