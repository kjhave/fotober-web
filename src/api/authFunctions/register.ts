export const register = async (username: string, email: string, password: string, name: string, role: string) => {
	try {
		if (!process.env.NEXT_PUBLIC_SERVER_URL) {
			throw new Error("SERVER_URL is not defined in the environment variables.");
		}

		const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    	const res = await fetch(SERVER_URL+"/authentication/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				name,
				role,
			}),
      	});
  
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data.message || "Registration failed");
		}

      	return data;
    } catch (error) {
		console.error("Error registering:", error);
		throw error;
    }
  };