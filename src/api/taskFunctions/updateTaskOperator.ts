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
