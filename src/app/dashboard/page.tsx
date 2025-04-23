'use client';

import { cookies } from 'next/headers';
import React, { useState, useEffect } from 'react';
import StaffRanking from '../../components/dashboard/StaffRanking';
import { getStaffList } from '@/api/staffInforFunctions/getStaffList';
import Link from 'next/link';
import { Button } from 'antd';
import { TaskForm } from '@/components/taskFunctions/TaskForm';


type Staff = {
    id: string;
    name: string;
};

export default function DashboardPage() {
    // const cookieStore = await cookies();
    // const token = cookieStore.get('token')?.value;

    // if (!token) {
    //     return (
    //         <div className='flex items-center justify-center h-screen bg-white'>
    //             <p className='text-lg text-red-500'>Bạn chưa đăng nhập.</p>
    //         </div>
    //     );
    // }

    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [isVisible, setVisible] = useState(false);

    const [loading, setLoading] = useState(true);  // Trạng thái loading để hiển thị khi đang tải dữ liệu

    const openForm = () => {
        setVisible(true);
    }

    const closeForm = () => {
        setVisible(false);
    }

    useEffect(() => {
        // Hàm bất đồng bộ để fetch dữ liệu nhân viên
        const fetchStaffRanking = async (): Promise<void> => {
            try {
                const staffData = await getStaffList();
                setStaffs(staffData);
            } catch (error) {
                console.error('Error fetching staff ranking:', error);
            } finally {
                setLoading(false);  // Sau khi hoàn tất, cập nhật trạng thái loading
            }
        };
    
        fetchStaffRanking();  // Gọi hàm fetch dữ liệu
    }, []); // Chỉ gọi khi component mount

    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
            <p className="text-lg text-blue-500">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div>
            <TaskForm isVisible={isVisible} closeForm={closeForm} />
            <div className='flex flex-col md:flex-row gap-4 bg-white min-h-screen'>
                <div className='flex-1 flex-col bg-gray-800 text-white p-6'
                >
                    <h2 className='text-2xl font-bold mb-6'>Chức Năng</h2>
                    <nav>
                        <Button block>
                            <Link href="/dashboard">
                                Quản Lý Nhân Viên
                            </Link>
                        </Button>

                        <Button block>
                            <Link href="/tasklist">
                                Danh sách công việc
                            </Link>
                        </Button>

                        <Button block onClick={openForm}>
                            Tạo yêu cầu mới
                        </Button>

                        <Button block>
                            <Link href="/">
                                Đăng Xuất
                            </Link>
                        </Button>
                    </nav>
                </div>

                <div className='flex-4 min-h-screen bg-white flex items-center justify-center'>
                    <div className='w-full max-w-2xl bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden'>
                        <div className='bg-gray-100 px-6 py-4 rounded-t-2xl'>
                            <h1 className='text-3xl font-bold text-gray-800 text-center'>
                                🏆 Bảng Xếp Hạng Nhân Viên
                            </h1>
                        </div>
                        <div className='p-6'>
                            <StaffRanking staffs={staffs} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
