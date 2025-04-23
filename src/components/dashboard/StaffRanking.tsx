'use client';

import { Table } from 'antd';
import Link from 'next/link';
import React from 'react';

type Staff = {
    id: string;
    name: string;
};

export default function StaffRanking({ staffs }: { staffs: Staff[] }) {
    const columns = [
        {
            title: 'Tên Nhân Viên',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Staff) => (
                <Link href={`/profile/${record.id}`} className="text-blue-600 hover:underline">
                    {text}
                </Link>
            ),
        },
    ];

    return (
        <Table
            dataSource={staffs}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
        />
    );
}
