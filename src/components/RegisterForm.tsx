'use client';

import { register } from '@/api/authFunctions/register';
import { Form, Input, Button, Select, Typography } from 'antd';

type Props = {
    onSwitch: () => void;
};

export const RegisterForm = ({ onSwitch }: Props) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const res = await register(values.username, values.email, values.password, values.name, values.role);
            console.log("Registered:", res);
            // redirect or show success message
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className="space-y-6">
            <Typography.Title level={3} className="!mb-4 text-center">
                Register
            </Typography.Title>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input className="py-2" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password className="py-2" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ type: 'email', required: true }]}
                >
                    <Input className="py-2" />
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input className="py-2" />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Select a role">
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="manager">Manager</Select.Option>
                        <Select.Option value="staff">Staff</Select.Option>
                        <Select.Option value="user">User</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="mt-2"
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>

            <Button
                type="link"
                block
                className="text-center text-blue-600 hover:underline"
                onClick={onSwitch}
            >
                Have an account?
            </Button>
        </div>
    );
};
