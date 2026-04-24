import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { fetchUsers } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import UsersTable from "../features/users/UsersTable";
import Pagination from "../components/Pagination";

const UserListPage: React.FC = () => {
        const dispatch = useAppDispatch();
        const { items, loading, error } = useAppSelector((s) => s.users);

        // Pagination state
        const [page, setPage] = useState<number>(1);
        const [pageSize, setPageSize] = useState<number>(10);

        // Load users once on component mount
        useEffect(() => {
            // dispatch the thunk that fetches users into the Redux slice
            dispatch(fetchUsers())

            return () => {
                // placeholder for any needed cleanup later (e.g. abort controllers)
            }
        }, [dispatch]);

    if(loading) return <p>Loading users...</p>;
    if(error) return <p role="alert">Error: {error}</p>;

    return (
        <main>
            <h1 className="title">Users</h1>
            

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "left", marginBottom: 8}}>
                <div>
                    <label style={{marginRight: 8}}>
                        Page size:
                    </label>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div style={{ marginRight: 10 }}>{items.length} users</div>
            </div>

            <UsersTable items={items} page={page} pageSize={pageSize} />

            <div style={{ marginTop: 12 }}>
                <Pagination
                    total={items.length}
                    page={page}
                    pageSize={pageSize}
                    onChange={(p) => setPage(p)}
                >

                </Pagination>
            </div>
        </main>
    )
    
}

export default UserListPage;