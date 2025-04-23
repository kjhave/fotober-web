export const login = async (username: string, password: string) => {
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        throw new Error("SERVER_URL is not defined in the environment variables.");
    }

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(SERVER_URL+"/authentication/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    const data = await res.json();
    return data;
}