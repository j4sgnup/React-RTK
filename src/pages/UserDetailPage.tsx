import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUsers } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import UserDetail from "../features/userDetail/UserDetail";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.users);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchUsers());
  }, [dispatch, items.length]);

  const user = items.find((u) => String(u.id) === id);
  if (!user) return <p>Loading user…</p>;

  return (
    <main>
      <Link to="/">← Back</Link>
      <UserDetail user={user} />
    </main>
  );
};

export default UserDetailPage;
