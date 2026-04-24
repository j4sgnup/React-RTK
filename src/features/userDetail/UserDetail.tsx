import React from "react";
import type { User } from "../../types/user";
import UserDetailCard from "./UserDetailCard";

interface Props {
  user: User;
}

const UserDetail: React.FC<Props> = ({ user }) => {
  return <UserDetailCard user={user} />;
};

export default UserDetail;
