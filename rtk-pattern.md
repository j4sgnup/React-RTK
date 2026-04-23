# Redux Toolkit Feature Runbook

This document is a concise runbook for adding a new feature using Redux Toolkit (RTK) in this codebase. Follow these steps when introducing stateful features that interact with APIs or local UI state.

## Prerequisites

- TypeScript types for the data you will handle.
- A network endpoint (or mock) for server-driven data.
- Basic familiarity with `createSlice`, `createAsyncThunk`, and React-Redux hooks.

## How code is split (recommended)

- `src/types/...` — TypeScript interfaces and types.
- `src/features/<feature>/api.ts` — network helpers (one file per resource).
- `src/features/<feature>/<feature>Slice.ts` — RTK slice, thunks, reducers, selectors.
- `src/features/<feature>/<Feature>.tsx` — presentational components for the feature.
- `src/pages/*` — page-level containers using hooks and dispatch.
- `src/store.ts` — combine reducers and export `store`/types.
- `src/hooks.ts` — typed `useAppDispatch` and `useAppSelector` helpers.

## Step-by-step: Adding a new feature

1. Plan the feature surface

   - What data is required from the server? (endpoints, query params)
   - What local UI-only state is needed? (selected item, modal open)
   - What components will consume the state? (pages, lists, forms)

2. Add types

   - Create `src/types/<feature>.ts` with interfaces that match the API.

3. Create API helpers

   - Add `src/features/<feature>/api.ts` with raw `fetch`/`axios` functions.

   Example:

```ts
// src/features/users/usersAPI.ts
import type { User } from '../../types/user';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsersAPI(): Promise<User[]> {
  const res = await fetch(USERS_URL);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}
```

4. Create the RTK slice

   - Use `createSlice` and `createAsyncThunk` for async flows.
   - Keep network calls in the API helper; the thunk should call it.

Example:

```ts
// src/features/users/usersSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/user';
import { fetchUsersAPI } from './usersAPI';

interface UsersState { items: User[]; loading: boolean; error: string | null }

const initialState: UsersState = { items: [], loading: false, error: null };

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  return await fetchUsersAPI();
});

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchUsers.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchUsers.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'error'; });
  }
});

export default slice.reducer;
```

5. Add reducer to the store

   - Edit `src/store.ts` and add the new reducer under `reducer: { ... }`.

Example:

```ts
// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: { users: usersReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

6. Add typed hooks (already present)

   - Use `src/hooks.ts` to get `useAppDispatch` and `useAppSelector`:

```ts
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

7. Use the feature in components (dispatching)

   - In a component, `dispatch` the thunk or action and use `useAppSelector` to read state.

Example component:

```tsx
import React, { useEffect } from 'react';
import { fetchUsers } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function UsersList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.users);

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  if (loading) return <div>Loading…</div>;
  if (error) return <div role="alert">Error: {error}</div>;

  return (
    <ul>
      {items.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

8. What happens after `dispatch(fetchUsers())` (runtime flow)

   - The thunk `fetchUsers` runs and returns a Promise. RTK dispatches lifecycle actions:
     - `users/fetch/pending` — reducers set `loading = true`.
     - If successful, `users/fetch/fulfilled` with payload — reducers set `items` and `loading = false`.
     - If failed, `users/fetch/rejected` — reducers set `error` and `loading = false`.
   - Components subscribed with `useAppSelector` re-run and update UI when the relevant slice changes.

9. Selectors

   - For complex reads, export selectors from the slice file:

```ts
export const selectUsers = (s: RootState) => s.users.items;
```

10. Adding synchronous UI state

   - If the state is local to a component (e.g., modal open), prefer `useState`.
   - If shared, add fields to the slice (e.g., `selectedId`) and reducers + actions to update it.

11. Tests

   - Unit-test thunks by mocking `fetch`/API helpers.
   - Render components with a test store using `configureStore` with the slice reducer.

## Quick checklist

- [ ] Add types
- [ ] Add API helper
- [ ] Add RTK slice + thunks
- [ ] Add reducer to `store.ts`
- [ ] Add selectors and export them
- [ ] Use typed hooks in components
- [ ] Add tests for slice and UI

## Troubleshooting notes

- If components don't update, verify you use `useAppSelector((s) => s.featureName)` and that the reducer key matches the root state key.
- If TypeScript complains about `useDispatch.withTypes`, ensure `AppDispatch` is exported from `store.ts` and `hooks.ts` imports the correct path.

---

This runbook intentionally favors small, testable steps and a predictable folder layout. If you'd like, I can generate a template slice and API for a new feature name you provide.
