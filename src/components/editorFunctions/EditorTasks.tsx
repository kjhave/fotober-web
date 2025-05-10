'use client';

import React, { useState, useRef } from 'react';

export type Task = {
    id: string;
    name: string;
    date: string;
    deadline: string;
    instruction: string;
    inputUrl: string;
    status: 'pending' | 'in_progress' | 'completed';
};

interface Props {
    tasks: Task[];
}

const statusStyles: Record<Task['status'], string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
};

export default function EditorTasks({ tasks: initialTasks }: Props) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const fileInputRefs = useRef<Record<string, HTMLInputElement>>({} as Record<string, HTMLInputElement>);

    const handleStatusChange = (taskId: string, status: string) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status } as Task : t));
    };

    const handleFileSelect = (taskId: string, file: File) => {
        console.log(`Uploading file for task ${taskId}:`, file.name);
    };

    const triggerFileSelect = (taskId: string) => {
        fileInputRefs.current[taskId]?.click();
    };

    return (
        <div className="space-y-8">
            {tasks.map(task => (
                <div key={task.id} className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">{task.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[task.status]}`}>{task.status.replace('_', ' ')}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm mb-4">
                        <p><strong>Date:</strong> {task.date}</p>
                        <p><strong>Deadline:</strong> {task.deadline}</p>
                    </div>
                    <p className="text-gray-700 mb-4">{task.instruction}</p>
                    <button
                        onClick={() => window.open(task.inputUrl, '_blank')}
                        className="inline-block text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium mb-6"
                    >
                        View Input
                    </button>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={task.status}
                                onChange={e => handleStatusChange(task.id, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Work</label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => triggerFileSelect(task.id)}
                                    className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium"
                                >
                                    Choose File
                                </button>
                                <span className="ml-4 text-gray-700">No file chosen</span>
                                <input
                                    type="file"
                                    ref={el => { if (el) fileInputRefs.current[task.id] = el; }}
                                    onChange={e => e.target.files && handleFileSelect(task.id, e.target.files[0])}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
