export const getStaffProfile = async () => {
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        throw new Error("SERVER_URL is not defined in the environment variables.");
    }

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    const response = await fetch(SERVER_URL+"/kpi/show?userId=", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers you need
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}