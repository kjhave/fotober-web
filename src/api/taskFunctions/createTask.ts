import { message } from "antd";

export const createTask = async (description: string, tasktype: number, request: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/task/create`, {
        method: 'POST',
        credentials: 'include', // Gửi cookie nếu cần xác thực
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

    return res.json(); // Trả về { message, taskid }

    // return {
    //     message: "Task created successfully",
    //     taskid: "12345",
    // }
};