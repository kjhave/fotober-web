'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'antd';

const mockProfile = {
    id: 'staff123',
    name: 'Nguyễn Văn A',
    avatar: '/avatar.png',
    job_done: 120,
    job_received: 150,
    job_done_daily: [
        { date: '01/04', value: 5 },
        { date: '02/04', value: 8 },
        { date: '03/04', value: 6 },
        { date: '04/04', value: 10 },
        { date: '05/04', value: 4 },
    ],
    job_received_daily: [
        { date: '01/04', value: 7 },
        { date: '02/04', value: 9 },
        { date: '03/04', value: 10 },
        { date: '04/04', value: 11 },
        { date: '05/04', value: 6 },
    ],
};

const combinedData = mockProfile.job_done_daily.map((item, index) => ({
    date: item.date,
    done: item.value,
    received: mockProfile.job_received_daily[index]?.value || 0,
}));

export default function ProfilePage() {
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white min-h-screen">
            {/* Left Card */}
            <div className="w-full md:w-1/3 px-6 py-8 flex flex-col items-center gap-4 rounded-2xl text-gray-800 bg-white" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
                <Image src={mockProfile.avatar} alt="avatar" width={100} height={100} className="rounded-full" />
                <div className="text-xl font-semibold">{mockProfile.name}</div>
                <div className="text-sm text-gray-600">ID: {mockProfile.id}</div>
                <div className="text-sm">Công việc đã hoàn thành: {mockProfile.job_done}</div>
                <div className="text-sm">Công việc được giao: {mockProfile.job_received}</div>
                <Button block>
                    <Link href="/dashboard">
                        Về bảng rank
                    </Link>
                </Button>
            </div>

            {/* Right Charts Card */}
            <div className="w-full md:w-2/3 px-6 py-8 flex flex-col gap-6 rounded-2xl text-gray-800 bg-white" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Line Chart - Job Done */}
                    <div className="h-56">
                        <div className="text-sm mb-2 font-medium">Số công việc đã hoàn thành theo ngày</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockProfile.job_done_daily}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Line Chart - Job Received */}
                    <div className="h-56">
                        <div className="text-sm mb-2 font-medium">Số công việc được giao theo ngày</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockProfile.job_received_daily}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Combined Bar Chart */}
                <div className="h-64">
                    <div className="text-sm mb-2 font-medium">Công việc đã hoàn thành & được giao mỗi ngày</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={combinedData} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="done" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={28} />
                            <Bar dataKey="received" fill="#60a5fa" radius={[4, 4, 0, 0]} barSize={28} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}