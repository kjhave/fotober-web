export const register = async (username: string, email: string, password: string, name: string, role: string) => {
    try {
      const res = await fetch("http://192.168.1.71:3000/authentication/register", {
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
        throw new Error(data.message || 'Something went wrong');
      }
      return data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  };