'use client';

import { useState } from 'react';
import { createTask } from '@/api/taskFunctions/createTask';
import { Form, Input, Button, Select, Checkbox, message, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const taskInfor = [
    {
        'id': 1,
        'taskname': 'Chỉnh sửa hình ảnh',
        'taskcompound': [
          {
            'name': 'Tăng cường hình ảnh',
            'description': 'Làm sáng, chỉnh nét, cân bằng màu, loại phản xạ'
          },
          {
            'name': 'Chuyển ngày – đêm',
            'description': 'Hiệu ứng chuyển đổi ảnh theo thời gian'
          },
          {
            'name': 'Xóa vật thể',
            'description': 'Loại bỏ chi tiết không cần thiết (logo, người, xe...)'
          },
          {
            'name': 'Nâng cấp ảnh 360°',
            'description': 'Tăng độ phân giải, chỉnh sửa góc nhìn 360°'
          }
        ]
    },
    {
      'id': 2,
      'taskname': 'Chỉnh sửa video',
      'taskcompound': [
        {
          'name': 'Video bất động sản',
          'description': 'Tạo video mượt, phối cảnh, nhạc nền chuyên nghiệp'
        },
        {
          'name': 'Video ô tô',
          'description': 'Chèn hiệu ứng, cảnh quay, dựng nhạc đặc trưng'
        },
        {
          'name': 'Xây dựng thương hiệu cá nhân',
          'description': 'Video giới thiệu doanh nghiệp, đội ngũ hoặc sản phẩm'
        },
        {
          'name': 'Tổng hợp sự kiện',
          'description': 'Cắt ghép khoảnh khắc, thêm nhạc và hiệu ứng nhẹ'
        }
      ]
    },
    {
      'id': 3,
      'taskname': 'Thiết kế & Ảo hóa kiến trúc',
      'taskcompound': [
        {
          'name': 'Dàn dựng ảo',
          'description': 'Thiết kế nội thất trên mô hình 3D từ phòng trống'
        },
        {
          'name': 'Cải tạo ảo',
          'description': 'Dựng mô phỏng cải tạo – nâng cấp không gian hiện trạng'
        },
        {
          'name': 'Thiết kế mặt bằng',
          'description': 'Cung cấp sơ đồ bố trí 2D/3D chi tiết, đẹp mắt'
        },
        {
          'name': 'Dựng hình 3D ý tưởng',
          'description': 'Dựng ảnh/phim 3D minh họa không gian chưa thi công từ ý tưởng'
        },
      ]
    }
];

type TaskCompound = {
    label: string;
    value: number;
    description: string;
};

interface TaskFormProps {
    isVisible: boolean;
    closeForm: () => void;
}

export const TaskForm = ({ isVisible, closeForm }: TaskFormProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [msgApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        const { description, tasktype, features: selectedOptions } = values;

        // Dùng bitmask để tổng hợp request
        const request = selectedOptions.reduce((sum: number, bit: number) => sum | bit, 0);

        try {
            setLoading(true);
            const res = await createTask(description, tasktype, request);
            msgApi.success(`Task created!`);

            console.log(res.taskid); // { message, taskid }
            form.resetFields();
        } catch (err: any) {
            msgApi.error(err.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    const [currentFeatures, setCurrentFeatures] = useState<TaskCompound[]>([]);;
    const handleTaskTypeChange = (value: number) => {
        const selectedTask = taskInfor.find(task => task.id === value);
        if (selectedTask) {
            const taskCompound = selectedTask.taskcompound.map((compound: any, index: number) => ({
                label: compound.name,
                value: 1 << index,
                description: compound.description
            }));

            setCurrentFeatures(taskCompound);
            // form.setFieldsValue({ features: taskCompound.map(compound => compound.value) });
        }
    };

    return isVisible && (
        <div className='min-h-screen min-w-screen relative p-10'>
            <div className='px-6 py-8 bg-white rounded shadow-md max-w-xl mx-auto mt-10 relative z-20'>
                <Button className="absolute top-4 right-4" icon={<CloseOutlined />} onClick={closeForm} size="large" />
                <h1 className='text-2xl font-bold text-center mt-10 text-black'>Create New Task</h1>
                {contextHolder}
                <Form form={form}
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Form.Item name='description' label='Description' rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name='tasktype' label='Task Type' rules={[{ required: true }]}>
                        <Select
                            placeholder='Select task type'
                            onChange={handleTaskTypeChange}
                        >
                            {taskInfor.map((task, index) => (
                                <Select.Option key={task.id} value={index + 1}>
                                    {task.taskname}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name='features' label='Request Options' rules={[{ required: true }]}>
                        <Checkbox.Group options={currentFeatures.map((compound) => ({
                            label: (
                                <Tooltip title={compound.description} className='w-full'>
                                    <span className='w-full'>{compound.label}</span>
                                </Tooltip>
                            ),
                            value: compound.value
                        }))} className='flex flex-col' />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' loading={loading}>
                            Create Task
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='min-h-screen min-w-screen opacity-50 bg-black absolute top-0 left-0 z-10 hover:cursor-pointer' onClick={closeForm}></div>
        </div>
    );
};