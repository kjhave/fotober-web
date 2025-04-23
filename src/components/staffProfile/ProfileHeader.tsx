'use client';

import React from 'react';
import Image from 'next/image';

type Props = {
    name: string;
    avatar: string;
};

export default function ProfileHeader({ name, avatar }: Props) {
    return (
        <div className="flex items-center space-x-4 mb-6">
            <Image
                src={avatar}
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full border"
            />
            <h1 className="text-2xl font-semibold">{name}</h1>
        </div>
    );
}
