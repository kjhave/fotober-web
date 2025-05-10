export const createTask = async (description: string, tasktype: number, request: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/task/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description,
            tasktype,
            request,
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create task');
    }

    return res.json();
};

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

export const updateTaskOperator = async (taskId: string, operatorId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/task/update/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operator: operatorId }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update task operator');
    }

    return res.json();
};

// export async function updateTaskStatus(taskId: string, status: string, token: string) {
//     const res = await fetch(`${process.env.API_URL}/tasks/${taskId}/status`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ status }),
//     });
//     return res.json();
// }

// export async function uploadTaskWork(taskId: string, file: File, token: string) {
//     const formData = new FormData();
//     formData.append('file', file);
//     const res = await fetch(`${process.env.API_URL}/tasks/${taskId}/upload`, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//     });
//     return res.json();
// }