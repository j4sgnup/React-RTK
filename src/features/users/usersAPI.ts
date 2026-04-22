import type { User } from "../../types/user";

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

export async function fetchUserAPI(): Promise<User[]> {
    const res = await fetch(USERS_URL);

    if (!res.ok) {
        throw new Error("Failed to fetch users.");
    }
    const users: User[] = await res.json();
    return users;
}

