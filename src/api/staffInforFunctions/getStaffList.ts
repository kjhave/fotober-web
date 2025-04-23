export const getStaffList = async () => {
    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
        throw new Error("SERVER_URL is not defined in the environment variables.");
    }

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    const response = await fetch(SERVER_URL+"/staff/list", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const res = await response.json();

    if (!res.data)  {
        throw new Error('No data found in the response');
    }

    return res.data;
}