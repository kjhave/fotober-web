export const login = async (username: string, password: string) => {
    const res = await fetch("192.168.1.71:3000/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    const data = await res.json();
    return data;
}