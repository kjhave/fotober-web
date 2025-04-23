'use client';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

type Staff = {
    id: string;
    name: string;
};

export default function StaffRanking({ staffs }: { staffs: Staff[] }) {
    const router = useRouter();

    const columns: ColumnsType<Staff> = [
        {
            title: 'Rank',
            key: 'rank',
            dataIndex: 'rank',
            align: 'center',
            width: 70,
            render: (_: any, __: Staff, index: number) => index + 1,
        },
        {
            title: 'Tên Nhân Viên',
            dataIndex: 'name',
            key: 'id',
            render: (text: string) => (
                <span className="text-blue-600 hover:underline cursor-pointer">
                    {text}
                </span>
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
            onRow={(record) => ({
                onClick: () => router.push(`/profile/${record.id}`),
                style: { cursor: 'pointer' },
            })}
        />
    );
}
