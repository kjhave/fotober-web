import { cookies } from 'next/headers';
import React from 'react';
import StaffRanking from '../../components/dashboard/StaffRanking';
import { getStaffList } from '@/api/staffInforFunctions/getStaffList';

type Staff = {
    id: string;
    name: string;
};

async function fetchStaffRanking(): Promise<Staff[]> {
    try{
        const staffs = await getStaffList();

        return staffs;
    } catch (error) {
        console.error("Error fetching staff ranking:", error);
        return [];
    }
}

export default async function DashboardPage() {
    // const cookieStore = await cookies();
    // const token = cookieStore.get('token')?.value;

    // if (!token) {
    //     return (
    //         <div className="flex items-center justify-center h-screen bg-white">
    //             <p className="text-lg text-red-500">Bạn chưa đăng nhập.</p>
    //         </div>
    //     );
    // }

    const staffs = await fetchStaffRanking();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 rounded-t-2xl">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        🏆 Bảng Xếp Hạng Nhân Viên
                    </h1>
                </div>
                <div className="p-6">
                    <StaffRanking staffs={staffs} />
                </div>
            </div>
        </div>
    );
}
