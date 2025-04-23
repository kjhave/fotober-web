'use client';

import { useState, useEffect } from 'react';
import { Table, Modal, Button, Select, message } from 'antd';
import { getAllTasks } from '@/api/taskFunctions/getAllTasks'; // API lấy tất cả task
import { getStaffList } from '@/api/staffInforFunctions/getStaffList'; // API lấy danh sách staff
import { updateTaskOperator } from '@/api/taskFunctions/updateTaskOperator'; // API cập nhật operator task
import Link from 'next/link';

type Staff = {
    id: string;
    name: string;
};

const TaskList = () => {
    const [taskList, setTaskList] = useState<any[]>([]); // Danh sách task
    const [staffList, setStaffList] = useState<Staff[]>([]); // Danh sách staff
    const [isModalVisible, setIsModalVisible] = useState(false); // Điều kiện mở modal
    const [currentTask, setCurrentTask] = useState<any>(null); // Task hiện tại
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [msgApi, contextHolder] = message.useMessage(); // Để hiển thị thông báo

    // Lấy tất cả task và staff khi component load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasks = await getAllTasks(); // Lấy tất cả task
                setTaskList(tasks);
                const staff = await getStaffList(); // Lấy tất cả staff
                setStaffList(staff);
            } catch (error) {
                console.error('Error fetching task or staff data:', error);
            }
        };

        fetchData();
    }, []);

    // Mở popup hiển thị chi tiết task
    const showTaskDetails = (task: any) => {
        setCurrentTask(task);
        setIsModalVisible(true);
    };

    // Đóng popup
    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentTask(null);
    };

    // Cập nhật operator cho task hiện tại
    const handleOperatorChange = (value: string) => {
        if (currentTask) {
            // Cập nhật operator của task hiện tại
            const updatedTask = { ...currentTask, operator: value };

            // Cập nhật lại state taskList
            setTaskList((prevTasks) =>
                prevTasks.map((task) =>
                    task.taskid === currentTask.taskid ? updatedTask : task
                )
            );
            // Cập nhật task hiện tại
            setCurrentTask(updatedTask);
        }
    };

    // Phân giải task_request từ bitmask thành các công việc cần hiển thị
    const resolveTaskRequest = (request: number, tasktype: number) => {
        // Các công việc có thể có, tùy thuộc vào tasktype
        let taskcompounds = [{ value: 0, name: '', description: ''}];

        if (tasktype === 1) {
            taskcompounds = [
                { value: 1, name: 'Tăng cường hình ảnh', description: 'Làm sáng, chỉnh nét, cân bằng màu, loại phản xạ' },
                { value: 2, name: 'Chuyển ngày – đêm', description: 'Hiệu ứng chuyển đổi ảnh theo thời gian' },
                { value: 4, name: 'Xóa vật thể', description: 'Loại bỏ chi tiết không cần thiết (logo, người, xe...)' },
                { value: 8, name: 'Nâng cấp ảnh 360°', description: 'Tăng độ phân giải, chỉnh sửa góc nhìn 360°' },
                { value: 16, name: 'Kiểm tra & Phản hồi', description: 'Khách hàng hoặc quản lý kiểm tra và gửi phản hồi (qua comment, note)' }
            ];
        } else if (tasktype === 2) {
            taskcompounds = [
                { value: 1, name: 'Video bất động sản', description: 'Tạo video mượt, phối cảnh, nhạc nền chuyên nghiệp' },
                { value: 2, name: 'Video ô tô', description: 'Chèn hiệu ứng, cảnh quay, dựng nhạc đặc trưng' },
                { value: 4, name: 'Xây dựng thương hiệu cá nhân', description: 'Video giới thiệu doanh nghiệp, đội ngũ hoặc sản phẩm' },
                { value: 8, name: 'Tổng hợp sự kiện', description: 'Cắt ghép khoảnh khắc, thêm nhạc và hiệu ứng nhẹ' },
                { value: 16, name: 'Phê duyệt video', description: 'Kiểm tra – duyệt – export bản hoàn chỉnh' }
            ];
        } else if (tasktype === 3) {
            taskcompounds = [
                { value: 1, name: 'Dàn dựng ảo', description: 'Thiết kế nội thất trên mô hình 3D từ phòng trống' },
                { value: 2, name: 'Cải tạo ảo', description: 'Dựng mô phỏng cải tạo – nâng cấp không gian hiện trạng' },
                { value: 4, name: 'Thiết kế mặt bằng', description: 'Cung cấp sơ đồ bố trí 2D/3D chi tiết, đẹp mắt' },
                { value: 8, name: 'Dựng hình 3D ý tưởng', description: 'Dựng ảnh/phim 3D minh họa không gian chưa thi công từ ý tưởng' },
                { value: 16, name: 'Giao nộp mô hình', description: 'Xuất bản thiết kế / render / bản trình chiếu và gửi khách hàng' }
            ];
        }

        // Lọc các công việc theo bitmask request
        return taskcompounds.filter(feature => (request & feature.value) > 0);
    };

    // Cập nhật operator lên database
    const handleConfirmUpdate = async () => {
        if (!currentTask?.operator) {
            msgApi.error('Please select an operator!');
            return;
        }

        setLoading(true);
        try {
            // Gọi API để cập nhật operator cho task
            const res = await updateTaskOperator(currentTask.taskid, currentTask.operator);
            msgApi.success('Operator updated successfully!');
            
            // Cập nhật lại dữ liệu trong state
            setTaskList((prevTasks) =>
                prevTasks.map((task) =>
                    task.taskid === currentTask.taskid ? { ...task, operator: currentTask.operator } : task
                )
            );
        } catch (err) {
            msgApi.error('Failed to update operator!');
            console.error('Error updating operator:', err);
        } finally {
            setLoading(false);
        }
    };

    // Cột bảng task
    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskname',
            key: 'taskname',
            render: (text: string, record: any) => <a onClick={() => showTaskDetails(record)}>{text}</a>,
        },
        {
            title: 'Task ID',
            dataIndex: 'taskid',
            key: 'taskid',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Operator',
            dataIndex: 'operator',
            key: 'operator',
            render: (operatorId: string) => {
                const operator = staffList.find(staff => staff.id === operatorId);
                return operator ? operator.name : 'Unassigned'; // Nếu không có operator, hiển thị "Unassigned"
            },
        },
    ];

    return (
        <div>
            <Button block>
                <Link href="/dashboard">
                    về bảng rank
                </Link>
            </Button>
            {contextHolder}
            <Table columns={columns} dataSource={taskList} rowKey="taskid" />

            <Modal
                title={`Task Details: ${currentTask?.taskname}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        loading={loading}
                        onClick={handleConfirmUpdate}
                    >
                        Confirm
                    </Button>,
                ]}
            >
                {currentTask && (
                    <div>
                        <p><strong>Task Name:</strong> {currentTask.taskname}</p>
                        <p><strong>Task ID:</strong> {currentTask.taskid}</p>
                        <p><strong>Description:</strong> {currentTask.description}</p>
                        <p><strong>Operator:</strong> 
                            <Select 
                                value={currentTask.operator || undefined}  // Nếu không có operator, value sẽ là undefined
                                onChange={handleOperatorChange}
                                style={{ width: '100%' }}
                            >
                                {staffList.map(staff => (
                                    <Select.Option key={staff.id} value={staff.id}>
                                        {staff.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </p>
                        <p><strong>Task Compounds:</strong></p>
                        <ul>
                            {resolveTaskRequest(currentTask.request, currentTask.tasktype).map((compound, index) => (
                                <li key={index}>
                                    <strong>{compound.name}</strong>: {compound.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TaskList;