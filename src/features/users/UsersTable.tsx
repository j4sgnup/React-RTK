import { Link } from "react-router-dom";
import type { User } from "../../types/user";

interface UserTableProps {
  items: User[];
  page: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  columns?: Array<"name" | "username" | "email" | "albums">;
}

const defaultColumns: Array<"name" | "username" | "email" | "albums"> = ["name", "username", "email", "albums"];

export default function UsersTable({
  items,
  page,
  pageSize,
  columns = defaultColumns,
}: UserTableProps) {
  const start = Math.max(0, (page - 1) * pageSize);
  const paged = items.slice(start, start + pageSize);

  if (!items.length) {
    return <div className="notification is-warning">No users available</div>;
  }

  return (
    <table
      className="table is-fullwidth is-hoverable is-striped"
      aria-label="Users list"
    >
      <thead>
        <tr>
          {columns.includes("name") && <th>Name</th>}
          {columns.includes("username") && <th>Username</th>}
          {columns.includes("email") && <th>Email</th>}
          {columns.includes("albums") && <th>Albums</th>}
        </tr>
      </thead>
      <tbody style={{textAlign:"left"}}>
        {paged.map((u) => (
          <tr key={u.id}>
            {columns.includes("name") && (
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
            )}
            {columns.includes("username") && <td>{u.username}</td>}
            {columns.includes("email") && <td>{u.email}</td>}
            {columns.includes("albums") && (
                <td>
                  <Link to={`/users/${u.id}`}>View Albums</Link>
                </td>
              )
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
}
