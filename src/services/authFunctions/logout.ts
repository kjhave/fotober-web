// file: src/services/authFunctions/logout.ts
export const logout = async () => {
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        throw new Error("SERVER_URL is not defined in the environment variables.");
    }

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    const res = await fetch(SERVER_URL+"/authentication/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Logout failed");
    }

    return { success: true };
}