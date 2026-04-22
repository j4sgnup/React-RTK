import { useEffect } from "react";
import {Link} from 'react-router-dom'
import { fetchUsers } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const UserListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((s) => s.users);

    useEffect(() => {
      dispatch(fetchUsers())
    
      return () => {
        // will cleanup later
      }
    }, [dispatch]);

    if(loading) return <p>Loading users...</p>;
    if(error) return <p role="alert">Error: {error}</p>;

    return (
        <main>
            <h1>Users</h1>
            <ul>
                {items.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}&nbsp;[{user.username}]</Link>
                    </li>
                ))}
            </ul>
        </main>
    )
    
}

export default UserListPage;