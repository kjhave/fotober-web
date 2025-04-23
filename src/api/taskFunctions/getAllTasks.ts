export const getAllTasks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/task/list`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
    if (!res.ok) {
        throw new Error('Failed to fetch tasks - 00');
    }
  
    const response = await res.json();
    
    if (!response.data){
        throw new Error('Failed to fetch tasks - 01');
    }

    const data = response.data;
    console.log(data);
    return data;
};