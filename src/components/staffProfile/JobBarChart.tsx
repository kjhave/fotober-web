'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

type Props = {
    title: string;
    data: { label: string; value: number }[];
    color?: string;
};

export default function JobBarChart({ title, data, color = '#4f46e5' }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full md:w-1/2">
            <h2 className="text-lg font-medium mb-2">{title}</h2>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={color} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
